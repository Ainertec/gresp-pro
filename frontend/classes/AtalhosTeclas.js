//------------------------------------- teclas de atalho principal software --------------------------------

//variavel de estado de execucao do atalhos globais
let ATIVACAODEATALHOGERAL = true;

//funcao responsavel por ativar os atalhos gerais do software
function ativarAtalhosPrincipais() {
    Mousetrap.bind('ctrl+1', function () { if (ATIVACAODEATALHOGERAL) { animacaoJanela2(); setTimeout(function () { menuPedido(); liberarMouseTrap(); }, 100) } else { liberarSubMenu(); } })
    Mousetrap.bind('ctrl+2', function () { if (ATIVACAODEATALHOGERAL) { animacaoJanela2(); setTimeout(function () { menuPagamentoPedido(); liberarMouseTrap(); }, 100) } else { liberarSubMenu(); } })
    Mousetrap.bind('ctrl+3', function () { if (ATIVACAODEATALHOGERAL) { animacaoJanela2(); setTimeout(function () { menuImpressao(); liberarMouseTrap(); }, 100) } else { liberarSubMenu(); } })
    Mousetrap.bind('ctrl+4', function () { if (ATIVACAODEATALHOGERAL) { animacaoJanela2(); setTimeout(function () { ligacaoRelatorioCaixaFacede(); }, 100) } else { liberarSubMenu(); } })
    Mousetrap.bind('ctrl+5', function () { if (ATIVACAODEATALHOGERAL) { animacaoJanela2(); setTimeout(function () { menuProdutoeBebida(); liberarMouseTrap(); }, 100) } else { liberarSubMenu(); } })
    Mousetrap.bind('ctrl+6', function () { if (ATIVACAODEATALHOGERAL) { animacaoJanela2(); setTimeout(function () { ligacaoEstoqueFacede(); }, 100) } else { liberarSubMenu(); } })
    Mousetrap.bind('ctrl+7', function () { if (ATIVACAODEATALHOGERAL) { animacaoJanela2(); setTimeout(function () { menuConfiguracaoAdmin(); liberarMouseTrap(); }, 100) } else { liberarSubMenu(); } })
    Mousetrap.bind('ctrl+8', function () { if (ATIVACAODEATALHOGERAL) { telaDeConfiguracaoDispositivo(); } else { liberarSubMenu(); } })
    Mousetrap.bind('esc', function () { if (ATIVACAODEATALHOGERAL) { logout(); window.location.href = "home.html"; } else { liberarSubMenu(); } })
}

//funcao responsavel por pausar os atalhos
function pausarAtalhos() {
    ATIVACAODEATALHOGERAL = false;
}

//funcao responsavel por retirar a pausa dos atalhos
function retirarPausaAtalho() {
    ATIVACAODEATALHOGERAL = true;
}

//funcao responsavel por gerar as teclas de atalho da tela de pedido
function atalhoTeclaPedido() {
    liberarMouseTrap();

    Mousetrap.bind('b b', function () { liberarSubMenu(); })
    Mousetrap.bind('right', function () { document.getElementById('identificacao').focus(); })
}

//funcao responsavel por gerar as teclas de atalho da tela de login
function atalhosTeclaLogin() {
    liberarMouseTrap();

    Mousetrap.bind('enter', function () { autenticacaoLogin(); });
    Mousetrap.bind('left', function () { document.getElementById('login').focus(); })
    Mousetrap.bind('right', function () { document.getElementById('senha').focus(); });
}

//funcao responsavel por limpar ultimas mousetraps utilizadas
function liberarMouseTrap() {
    Mousetrap.reset();
    ativarAtalhosPrincipais();
}

//funcao de inicializacao de atalhos
$(document).ready(function () {
    ativarAtalhosPrincipais();
});