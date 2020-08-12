//---------------------------------- Classe funcionalidades-----------------------------------------

//funcao de incializacao basica funcionalidade
$(document).ready(function () {
    limparTelaDeMensagem();
})

//funcao para gerar mensagem de erro
function mensagemDeErro(mensagem) {
    document.getElementById('mensagemDeErro').innerHTML = `<span class="badge badge-danger h5">${mensagem}</span>`
    $('#mensagemDeErro').animate({ width: 'show' })
    limparTelaDeMensagem();
}

//funcao para gerar mensagem de aviso
function mensagemDeAviso(mensagem) {
    document.getElementById('mensagemDeErro').innerHTML = `<span class="badge badge-success h5">${mensagem}</span>`
    $('#mensagemDeErro').animate({ width: 'show' })
    limparTelaDeMensagem();
}

//funcao para limpar tela de mensagens
function limparTelaDeMensagem() {
    setTimeout(function () {
        $('#mensagemDeErro').animate({ width: 'hide' })
    }, 3000)
}

//funcao responsavel por imprimir na impressora
function imprimirImpressora(idReferencia) {
    $(idReferencia).printThis({
        debug: false,               // show the iframe for debugging
        importCSS: true,            // import parent page css
        importStyle: false,         // import style tags
        printContainer: true,       // print outer container/$.selector
        loadCSS: "./../bootstrap/css/escopo-css-impressao.css",                // path to additional css file - use an array [] for multiple
        pageTitle: "",              // add title to print page
        removeInline: false,        // remove inline styles from print elements
        removeInlineSelector: "*",  // custom selectors to filter inline styles. removeInline must be true
        printDelay: 222,            // variable print delay
        header: false,               // prefix to html
        footer: null,               // postfix to html
        base: false,                // preserve the BASE tag or accept a string for the URL
        formValues: true,           // preserve input/form values
        canvas: false,              // copy canvas content
        doctypeString: false,       // enter a different doctype for older markup
        removeScripts: false,       // remove script tags from print content
        copyTagClasses: false,      // copy classes from the html & body tag
        beforePrintEvent: null,     // function for printEvent in iframe
        beforePrint: null,          // function called before iframe is filled
        afterPrint: null            // function called before iframe is removed
    });
}

//funcao responsavel por limpar o modal de impressao
function limparModal() {
    document.getElementById('modal').innerHTML = '';
}

//funcao de animacao da janela2
function animacaoJanela2() {
    $('#janela2').fadeOut(100);
    $('#janela2').fadeIn(100);
}

//funcao responsavel por validar os dados preenchidos nos campos
function validaDadosCampo(campo) {
    var validacao = true;
    campo.forEach(function (item) {
        if ($(item).val() == '' || $(item).val() == null) {
            validacao = false;
        }
    });
    return validacao;
}

//funcao responsavel por validar valores invalidos nos campos(valores negativos)
function validaValoresCampo(campo) {
    var validacao = true;
    campo.forEach(function (item) {
        if (parseFloat($(item).val()) < 0.0 || parseFloat($(item).val()) == 0.0) {
            validacao = false;
        }
    });
    return validacao;
}

// funcao responsavel por buscar a sessao do usuario
function buscarSessionUser() {
    return JSON.parse(sessionStorage.getItem('login'))
}

//funcao reponsavel por alertar o usuario sobre executar determinada acao
function confirmarAcao(mensagem, funcao, value) {
    var codigoHTML = '';
    codigoHTML += '<div class="modal fade" id="modalAviso" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">'
    codigoHTML += '<div class="modal-dialog" role="document">'
    codigoHTML += '<div class="modal-content">'
    codigoHTML += '<div class="modal-header">'
    codigoHTML += '<h5 class="modal-title">Atenção</h5>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="modal-body">'
    codigoHTML += `<p>${mensagem} Deseja continuar?</p>`
    codigoHTML += '</div>'
    codigoHTML += '<div class="modal-footer">'
    codigoHTML += '<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Não</button>'
    if (value != null) {
        codigoHTML += `<button onclick="${funcao}; document.getElementById('modal').innerHTML='';" value="${value}" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>`
    } else {
        codigoHTML += `<button onclick=${funcao}; document.getElementById('modal').innerHTML='';" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>`
    }
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalAviso').modal('show');
}

//funcao resopnsavel por gerenciar o tamanho da janela
function janelaTamanho() {
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||
        (!document.mozFullScreen && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

//funcao responsavel por manipular o tamanho da string de exibição(caso seja muito grande)
function corrigirTamanhoString(tamMax, texto) {
    if (texto.toString().length > tamMax) {
        texto = texto.substr(0, tamMax)
        texto += '...'
    }
    return texto
}

//funcao resopnsavel por exibir cor defente no campo incorreto
function mostrarCamposIncorrreto(campo) {
    campo.forEach(function (item) {
        document.getElementById(item).classList.add('border');
        document.getElementById(item).classList.add('border-danger');
        setTimeout(function () {
            document.getElementById(item).classList.remove('border');
            document.getElementById(item).classList.remove('border-danger');
        }, 2000)
    });
}

//funcao de animacao slideUp
function animacaoSlideUp(idReferencia) {
    idReferencia.forEach(function (item) {
        $(item).slideUp(300)
    });
}

//funcao animacao slideDown
function animacaoSlideDown(idReferencia) {
    idReferencia.forEach(function (item) {
        $(item).slideDown(300)
    });
}

//funcao responsavel por controlar a ativação e desativação de um botão
function ativaDesativaBotao(campo, tempo) {
    campo.forEach(function (item) {
        document.getElementById(item).disabled = true;
        setTimeout(function () {
            document.getElementById(item).disabled = false;
        }, tempo)
    });
}

//funcao responsavel por gerar a tela de aguarde o carregamento
let timerCarregador;
function aguardeCarregamento(tipo) {
    let contCarregador = 0, codigoHTML = `<div style="background-color: rgba(0, 0, 0, 0.8); position: absolute; height: 99.2vh; width: 100vw; z-index:1055; border-radius:10px;">
      <h5 class="text-center text-light">
        <img src="./img/loading.gif" class="rounded mx-auto d-block" style="height: 40px; width: 40px; margin-top: 48vh;">
        Aguarde...
      </h5>
    <div>`

    if (tipo) {
        document.getElementById('carregamento').innerHTML = codigoHTML;
        clearInterval(timerCarregador);
        timerCarregador = setInterval(function () {
            contCarregador++;

            if (contCarregador > 3) {
                codigoHTML = `<div style="background-color: rgba(0, 0, 0, 0.8); position: absolute; height: 99.2vh; width: 100vw; z-index:1055; border-radius:10px;">
            <h5 class="text-center text-light" style="margin-top: 48vh;">
              Ops... Ouve algum problema! Tente novamente.
            </h5>
            <h6 class="text-center text-light">
              Aguarde 10 segundos para tentar novemante.
            </h6>
          <div>`

                document.getElementById('carregamento').innerHTML = codigoHTML;
                clearInterval(timerCarregador);

                setTimeout(function () { document.getElementById('carregamento').innerHTML = '' }, 10000)
            }

        }, 1000)
    } else {
        clearInterval(timerCarregador);
        setTimeout(function () { document.getElementById('carregamento').innerHTML = ''; }, 300)
    }
}