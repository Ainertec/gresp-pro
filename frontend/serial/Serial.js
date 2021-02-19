// --------------------------------------------- TELA INICIAL -----------------------------------------------------

//funcao menu de opcaoes para pedido
function TelaConfigurarSerial() {
    let codigoHTML = ``;

    codigoHTML += `<h4 class="text-center">Serial Atual</h4>
        <h5 class="text-center" style="margin-top:50px">Data Atual: <span class="badge badge-success">${localStorage.getItem("dataAtual")}</span> - Licença até: <span class="badge badge-danger">${localStorage.getItem("dataFim")}</span></h5>
        <hr class="my-6 bg-dark" style="margin-top:50px">
        <h4 class="text-center" style="margin-top:50px">Cadastrar Novo Serial</h4>
        <form style="margin-top:50px">
            <div class="form-row">
                <input id="dataFim" type="date" class="form-control col-md-8" placeholder="Número Pedido">
                <button onclick="cadastrarSerial();" type="button" class="btn btn-light border border-dark col-md-3">
                    <span class="fas fa-search"></span> Cadastrar
                </button>
            </div>
        </form>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- AUTENTICACAO -----------------------------------------------------

//funcao para autenticar o acesso as configuracao de serial
var _0x4566 = ['value']; (function (_0x1f59b9, _0x4566fa) { var _0x4c35cd = function (_0x4b50ca) { while (--_0x4b50ca) { _0x1f59b9['push'](_0x1f59b9['shift']()); } }; _0x4c35cd(++_0x4566fa); }(_0x4566, 0x142)); var _0x4c35 = function (_0x1f59b9, _0x4566fa) { _0x1f59b9 = _0x1f59b9 - 0x0; var _0x4c35cd = _0x4566[_0x1f59b9]; return _0x4c35cd; }; function autenticacaoSerial() { var _0x10362e = _0x4c35; document['getElementById']('senha')[_0x10362e('0x0')] == 0xb9535b2726ce80 && TelaConfigurarSerial(); }

// --------------------------------------------- CADASTRO -----------------------------------------------------

//funcao para cadastrar serial
function cadastrarSerial() {
    let date = new Date();

    localStorage.removeItem("dataFim");
    localStorage.removeItem("dataAtual");
    localStorage.setItem("dataFim", document.getElementById('dataFim').value);
    localStorage.setItem("dataAtual", date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

}

// --------------------------------------------- VERIFICACAO DE SERIAL -----------------------------------------------------

//function para verificar o serial
function verificarValidadeSerial() {
    let dataFim = new Date(localStorage.getItem("dataFim"));
    let dataEmMemoria = new Date(localStorage.getItem("dataAtual"));
    let date = new Date();
    let dataAtual = new Date(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    let codicao = false;

    if (localStorage.getItem("dataFim") == "") {
        codicao = true;
    } else {
        if (dataEmMemoria <= dataAtual) {
            localStorage.removeItem("dataAtual");
            localStorage.setItem("dataAtual", date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());

            if (dataFim > dataAtual) {
                codicao = true;
            } else {
                mensagemDeErro("Licença vencida!");
            }

        } else {
            mensagemDeErro("Atenção relógio atrasado!");
        }
    }

    return codicao;
}