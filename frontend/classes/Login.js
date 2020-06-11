


// ------------------------------------------- EXTRA -------------------------------------------------------


//tela de login
function telaAutenticacao() {

    var codigoHTML;

    codigoHTML = '<h3 class="text-center">Acesso</h3>'
    codigoHTML += '<form class="text-center" style="margin-top:30px;">'
    codigoHTML += '<h1><span class="fas fa-user-circle"></span></h1>'
    codigoHTML += '<div class="form-row col-5 rounded mx-auto d-block">'
    codigoHTML += '<input id="login" type="text" class="form-control mb-2 mousetrap" placeholder="Login">'
    codigoHTML += '<input id="senha" type="password" class="form-control mb-2 mousetrap" placeholder="Senha">'
    codigoHTML += '<button onclick="if(validaDadosCampo([\'#login\',\'#senha\'])){autenticacaoLogin();}else{mensagemDeErro(\'Preencha todos os campos!\')}" type="button" class="btn btn-primary border border-dark col-md-3">'
    codigoHTML += '<span class="fas fa-key"></span> Acessar'
    codigoHTML += '</button>'
    codigoHTML += '<a href="#" onclick="if(validaDadosCampo([\'#login\'])){telaRecuperarSenha();}else{mensagemDeErro(\'Digite o nome de usuario!\');}" style="margin-left:20px;" class="col-md-3">Esqueceu a senha?</a>'
    codigoHTML += '</div>'
    codigoHTML += '</form>'
    codigoHTML += '<div id="areaRecuperarSenha"></div>'

    document.getElementById('janela2').innerHTML = codigoHTML;

    atalhosTeclaLogin();

}



//funcao responsavel por gerar a tela de recuperacao de senha
async function telaRecuperarSenha() {
    var codigoHTML = '';

    codigoHTML += '<h4 class="text-center" style="margin-top:30px;">Recuperar conta</h4>'
    codigoHTML += '<div class="text-center" style="margin-top:10px;">'
    codigoHTML += '<div class="form-row col-5 rounded mx-auto d-block">'
    codigoHTML += '<label for="pergunta">Responda a pergunta de segurança: </label>'
    codigoHTML += '<input id="pegunta" type="text" class="form-control mb-2 mousetrap" placeholder="Resposta">'
    codigoHTML += '<input id="novaSenha" type="password" class="form-control mb-2 mousetrap" placeholder="Digite uma nova senha">'
    codigoHTML += '<button onclick="if(validaDadosCampo([\'#login\',\'#pergunta\',\'#novaSenha\'])){recuperarSenha();}else{mensagemDeErro(\'Preencha os campos login, pergunta e nova senha!\')}" type="button" class="btn btn-success border border-dark">'
    codigoHTML += '<span class="fas fa-user-lock"></span> Recuperar'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    document.getElementById('areaRecuperarSenha').innerHTML = codigoHTML;
}



//funcao responsavel por recuperar a senha
async function recuperarSenha() {

}


//funcao para fazer logout
function logout() {
    sessionStorage.removeItem("login");
    mensagemDeAviso("Logout com sucesso!");
}



//funcao para autenticacao e liberacao de sessao
async function autenticacaoLogin() {

    logout();
    var cont = 0, json = await requisicaoGET("login/");

    if (json.data[cont] == null) {
        sessionStorage.setItem("login", true);
        window.location.href = "home.html";
    }

    while (json.data[cont]) {
        if (document.getElementById('login').value == json.data[cont].login) {
            if (document.getElementById('senha').value == json.data[cont].password) {
                sessionStorage.setItem("login", JSON.stringify({ "_id": json.data[cont]._id, "login": json.data[cont].login, "password": json.data[cont].password }));
                mensagemDeAviso("Usuário autenticado!");
                window.location.href = "home.html";
            }
        }
        cont++;
    }

    if (sessionStorage.getItem('login') == null) {
        telaAutenticacao();
        mensagemDeErro("Usuário não autenticado!");
    }

}



//inicializações basicas login
$(document).ready(function () {
    if (sessionStorage.getItem("login")) {
        document.getElementById('statusLogin').innerHTML = '<a onclick="logout();" class="nav-link text-light" href="home.html"><span class="fas fa-user-slash iconsTam"></span> Sair</a>';
    } else {
        document.getElementById('statusLogin').innerHTML = '<a onclick="telaAutenticacao();" class="nav-link text-light" href="#"><span class="fas fa-user-shield iconsTam"></span> Entrar</a>';
    }
});