function api(tipo,url,dado){
    var xhttp = new XMLHttpRequest();
    xhttp.open(tipo, url, false);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    if(dado){
        xhttp.send(JSON.stringify(dado));
    }else{
        xhttp.send();
    }
        

    return JSON.parse(xhttp.responseText)
}


function ServeRoutes(param){
    return {
        licenseKey:`http://localhost:3334/license`,
        registrationLicenseOnline:`https://airnetec.000webhostapp.com/back/licenseKeys/license.php?servico=registrationLicense&licenseKey=${param}`,
        validationLicenseOnline:`https://airnetec.000webhostapp.com/back/licenseKeys/license.php?servico=validaLicense&licenseKey=${param}`
    }
}

async function guardarLicense(code){
    const result = await api("GET",ServeRoutes(code).registrationLicenseOnline);
    if(result.device < result.deviceLimit){
        await api("POST",ServeRoutes().licenseKey,{key:code,validation:0,checkDate:0});
        return {msg:'Chave salva com sucesso!',validation:1};
    }else{
        return {msg:'Está chave já está em uso!',validation:0};
    }
}

async function validationLicense(){
    try{
        const code = await api("GET",ServeRoutes().licenseKey);
        const validation = await api("GET",ServeRoutes(code.key).validationLicenseOnline);
        if(validation[0].status){
            await api("POST",ServeRoutes().licenseKey,{key:code.key,validation:parseInt(validation[0].status),checkDate:code.checkDate});
        }
    }catch(error){
        return {msg: 'Não foi possivel verificar, verificaremos na proxima!'};
    }
}
    
async function acesso(){
    let validation = await api("GET",ServeRoutes().licenseKey);
    if(validation.validation === 1){
        return {validation:1, msg:'Sua licença está ativa!'};
    }else{
        return {validation:0, msg:'Sua licença está bloqueada!'};
    }
}

async function verificarExitenciaChave(){
    let code = await api("GET",ServeRoutes().licenseKey);
    if(code.key){
        return true;
    }else{
        return false;
    }
}

async function Init(){
    let code = await api("GET",ServeRoutes().licenseKey);
    let newCheckValidation = String(new Date().getDate());
    if(parseInt(newCheckValidation) > parseInt(code.checkDate)+7 || parseInt(newCheckValidation) < parseInt(code.checkDate)){
        await api("POST",ServeRoutes().licenseKey,{key:code.key,validation:code.validation,checkDate:newCheckValidation});
        await validationLicense();
    }
    return acesso();
}