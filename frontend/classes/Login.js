// ------------------------------------------- Classe Login -------------------------------------------------------

//tela de login
function telaAutenticacao() {

    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modaltelalogin">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"><span class="fas fa-user-shield"></span> Login</h5>
                        <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="shadow-lg p-3 mb-3 bg-white rounded">
                            <h3 class="text-center">Acesso</h3>
                            <form class="text-center">
                                <h1><span class="fas fa-user-circle"></span></h1>
                                <div class="form-row col-7 rounded mx-auto d-block">
                                    <input id="login" type="text" class="form-control mb-2 mousetrap" placeholder="Login">
                                    <input id="senha" type="password" class="form-control mb-2 mousetrap" placeholder="Senha">
                                    <button onclick="if(validaDadosCampo(['#login','#senha'])){ativaDesativaBotao(['botaoefetuarlogin'],1000); efetuarLogin();}else{mensagemDeErro('Preencha todos os campos!'); mostrarCamposIncorrreto(['login','senha']);}" id="botaoefetuarlogin" type="button" class="btn btn-primary border border-dark col-md-3">
                                        <span class="fas fa-key"></span> Acessar
                                    </button>
                                    <a href="#" onclick="if(validaDadosCampo(['#login'])){telaRecuperarSenha();}else{mensagemDeErro('Digite o nome de usuario!'); mostrarCamposIncorrreto(['login']);}" style="margin-left:20px;" class="col-md-3">Esqueceu a senha?</a>
                                </div>
                            </form>
                        </div>
                        <div id="areaRecuperarSenha"></div>
                    </div>
                </div>
            </div>
        </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modaltelalogin').modal('show')

    atalhosTeclaLogin();

}

//funcao responsavel por gerar a tela de recuperacao de senha
async function telaRecuperarSenha() {
    let codigoHTML = ``;

    try {
        await aguardeCarregamento(true)
        const questao = await requisicaoGET(
            `forgot?name=${document.getElementById('login').value}`,
            null
        )
        await aguardeCarregamento(false)

        codigoHTML += `<div class="shadow-lg p-3 mb-3 bg-white rounded">
            <h4 class="text-center">Recuperar conta</h4>
            <div class="text-center" style="margin-top:10px;">
                <div class="form-row col-5 rounded mx-auto d-block">
                    <label for="pergunta">Responda a pergunta de segurança: ${questao.data.question}</label>
                    <input id="pergunta" type="text" class="form-control mb-2 mousetrap" placeholder="Resposta">
                    <input id="novaSenha" type="password" class="form-control mb-2 mousetrap" placeholder="Digite uma nova senha">
                    <button onclick="if(validaDadosCampo(['#login','#pergunta','#novaSenha'])){recuperarSenha();}else{mensagemDeErro('Preencha os campos login, pergunta e nova senha!'); mostrarCamposIncorrreto(['login','pergunta','novaSenha']);}" type="button" class="btn btn-success border border-dark">
                        <span class="fas fa-user-lock"></span> Recuperar
                    </button>
                </div>
            </div>
        </div>`

        document.getElementById('areaRecuperarSenha').innerHTML = codigoHTML;

    } catch (error) {
        mensagemDeErro('Usuário não existente!')
    }
}

//funcao responsavel por recuperar a senha
async function recuperarSenha() {
    if (validaDadosCampo(['#login', '#pergunta', '#novaSenha'])) {
        await aguardeCarregamento(true)
        const result = await requisicaoPOST(
            'forgot',
            JSON.parse(
                `{"name":"${document.getElementById('login').value}","response":"${document.getElementById('pergunta').value
                }","password":"${document.getElementById('novaSenha').value}"}`
            ),
            null
        )
        await aguardeCarregamento(false)
        if (result) {
            mensagemDeAviso('Atualizado com sucesso!')
        }
    } else {
        mensagemDeErro('Preencha todos os dados!')
    }
}

//funcao para fazer logout
function logout() {
    if (sessionStorage.getItem('login')) {
        sessionStorage.removeItem('login')
        mensagemDeAviso('Logout com sucesso!')
    }
}

//funcao responsavel por efetuar o login
async function efetuarLogin() {
    logout()

    setTimeout(async function () {
        await aguardeCarregamento(true)
        const json = await requisicaoPOST(
            'sessions',
            JSON.parse(
                `{"name":"${document.getElementById('login').value}","password":"${document.getElementById('senha').value
                }"}`
            ),
            null
        )
        await aguardeCarregamento(false)

        if (!json.data) {
            mensagemDeErro('Login/senha incorretos ou usuario inexistente!')
            telaAutenticacao()
        } else if (json.data.user._id) {
            if (json.data.user.admin) {
                sessionStorage.setItem(
                    'login',
                    JSON.stringify({
                        _id: json.data.user._id.toString(),
                        nome: json.data.user.name.toString(),
                        tipo: 'Administrador',
                        token: json.data.token.toString(),
                        question: json.data.user.question.toString(),
                    })
                )
            } else {
                sessionStorage.setItem(
                    'login',
                    JSON.stringify({
                        _id: json.data.user._id.toString(),
                        nome: json.data.user.name.toString(),
                        tipo: 'Comum',
                        token: json.data.token.toString(),
                        question: json.data.user.question.toString(),
                    })
                )
            }
            mensagemDeAviso('Usuário autenticado!')
            setTimeout(function () {
                window.location.href = 'home.html'
            }, 1000)
        }
    }, 1000)
}

//funcao para autenticacao e liberacao de sessao
function autenticacaoLogin() {
    if (sessionStorage.getItem('login') == null) {
        mensagemDeErro('Usuário não autenticado!')
        return telaAutenticacao()
    }
    return sessionStorage.getItem('login')
}

//inicializações basicas login
$(document).ready(function () {
    if (sessionStorage.getItem('login')) {
        const nome = JSON.parse(sessionStorage.getItem('login')).nome.toString()
        document.getElementById(
            'statusLogin'
        ).innerHTML = `<a onclick="logout(); setTimeout(function(){window.location.href='home.html';},1000);" class="nav-link text-light" href="#"><span class="fas fa-user-slash iconsTam"></span> Sair (${corrigirTamanhoString(
            7,
            nome
        )})</a>`
    } else {
        document.getElementById('statusLogin').innerHTML =
            '<a onclick="telaAutenticacao();" class="nav-link text-light" href="#"><span class="fas fa-user-shield iconsTam"></span> Entrar</a>'
    }
});