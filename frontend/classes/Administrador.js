//-------------------------------------------- Classe Administrador -----------------------------------------------


//funcao responsavel por fazer as ligações internas da classe administrador
function ligacaoAdministradorFacede(tipoRequisicao) {

    if (sessionStorage.getItem("login")) {
        if (tipoRequisicao == 'cadastrar') {
            telaAdministrador(tipoRequisicao, null);
        } else {
            let json = JSON.parse(sessionStorage.getItem("login"));
            telaAdministrador(tipoRequisicao, json._id)
            setTimeout(function () { carregarDadosAdministrador(json) }, 300)
        }
    } else {
        telaAutenticacao();
    }
}



//funcao responsavel por gerar a tela de administrador
function telaAdministrador(tipoRequisicao, id) {

    let codigoHTML = '';

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML = '<h3 class="text-center">Cadastrar</h3>'
    } else {
        codigoHTML = '<h3 class="text-center">Atualizar</h3>'
    }
    codigoHTML += '<div class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col">'
    codigoHTML += '<label>Login: </label><input id="login" type="text" class="form-control mousetrap" placeholder="Login">'
    codigoHTML += '</div>'
    codigoHTML += '<div class="col">'
    codigoHTML += '<label>Senha: </label><input id="password" type="password" class="form-control mousetrap" placeholder="Senha">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += '<button onclick="cadastrarAdmin();" type="button" class="btn btn-primary" style="margin-top: 20px"><span class="fas fa-save"></span> Salvar</button>'
    } else {
        codigoHTML += '<button onclick="atualizarAdmin(\'' + id + '\');" type="button" class="btn btn-success" style="margin-top: 20px"><span class="fas fa-save"></span> Salvar</button>'
        codigoHTML += '<button onclick="deletarAdmin(\'' + id + '\');" type="button" class="btn btn-outline-danger" style="margin-top: 20px; margin-left: 10px"><span class="fas fa-save"></span> Excluir</button>'
    }
    codigoHTML += '</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;

}



//funcao responsavel por adicionar os dados para atualizacao
function carregarDadosAdministrador(json) {
    document.getElementById('login').value = json.login;
    document.getElementById('password').value = json.password;
}



//chamada de funcao de requisicao create enviando dados em formato JSON para gravura
async function cadastrarAdmin() {
    try {
        let json = `{"login" : "${$('#login').val()}" ,`
        json += `"password" : "${$('#password').val()}" }`

        await requisicaoPOST("login/", JSON.parse(json));
        mensagemDeAviso("Cadastrado com sucesso!");
    } catch (error) {
        mensagemDeErro('Não foi possivel cadastar!')
    }
}



//chamada de funcao de requisicao update enviando dados em formato JSON para gravura
async function atualizarAdmin(id) {
    try {
        await requisicaoPUT("login/" + id, { "login": $('#login').val(), "password": $('#password').val() });
        mensagemDeAviso("Cadastrado com sucesso!");
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}



//funcao para chamar metodo delete para deletar Admin
async function deletarAdmin(id) {
    await requisicaoDELETE("login/" + id);
    sessionStorage.removeItem("login");
    mensagemDeAviso("Excluido com sucesso!");
    setTimeout(function () { window.location.href = "home.html"; }, 2000);
}