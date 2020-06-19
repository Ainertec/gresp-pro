// --------------------------------------------- SUB MENU IMPRESSÃO -----------------------------------------------------

// funcao menu de opcoes para impressao
function menuImpressao() {

    let codigoHTML;

    codigoHTML = '<h3 class="text-center">Impressão</h3>'
    codigoHTML += '<div class="card-deck mx-auto" style="margin-top:50px;">'
    codigoHTML += '<div class="input-group border border-dark col-8 mx-auto" style="margin-top:10px; padding: 0px">'
    codigoHTML += '<div class="input-group-prepend">'
    codigoHTML += '<label class="input-group-text" for="quantidade">Quantidade</label>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="custom-file">'
    codigoHTML += '<input type="Number" class="form-control mousetrap" id="quantidade" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">'
    codigoHTML += '</div>'
    codigoHTML += '<div class="input-group-append">'
    codigoHTML += `<button onclick="if(validaDadosCampo(['#quantidade']) && validaValoresCampo(['#quantidade'])){telaGerarQRCode(quantidade.value, 'random');}else{mensagemDeErro('Valor inválido para o campo quantidade!'); mostrarCamposIncorrreto(['quantidade']);}" class="btn btn-light border border-dark" type="button"><span class="fas fa-qrcode"></span> Impressão Comanda</button>`
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    codigoHTML += '<div class="card-deck mx-auto" style="margin-top:50px;">'
    codigoHTML += '<div class="input-group border border-dark col-8 mx-auto" style="margin-top:10px; padding: 0px">'
    codigoHTML += '<div class="input-group-prepend">'
    codigoHTML += '<label class="input-group-text">Digite um Número</label>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="custom-file">'
    codigoHTML += '<input type="Number" class="form-control mousetrap" id="comandaOpcNumber" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon3">'
    codigoHTML += '</div>'
    codigoHTML += '<div class="input-group-append">'
    codigoHTML += `<button onclick="if(validaDadosCampo(['#comandaOpcNumber']) && validaValoresCampo(['#comandaOpcNumber'])){telaGerarQRCode(comandaOpcNumber.value,null);}else{mensagemDeErro('Valor inválido para o campo número!'); mostrarCamposIncorrreto(['comandaOpcNumber']);}" class="btn btn-light border border-dark" type="button"><span class="fas fa-qrcode"></span> Impressão Comanda</button>`
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    codigoHTML += '<div class="card-deck mx-auto col-8" style="margin-top:50px;">'
    codigoHTML += `<button onclick="ligacaoRelatorioFacede('produtosebebidas');" type="button" class="btn btn-light border border-dark col-4" style="margin: 5px">`
    codigoHTML += '<span class="fas fa-file-alt"></span> Impressão Relatório Produtos'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="ligacaoRelatorioFacede('relatoriocaixa');" type="button" class="btn btn-light border border-dark col-3" style="margin: 5px">`
    codigoHTML += '<span class="fas fa-file-invoice-dollar"></span> Impressão Relatório Caixa'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="ligacaoRelatorioFacede('pedidosabertos');" type="button" class="btn btn-light border border-dark col-4" style="margin: 5px">`
    codigoHTML += '<span class="fas fa-file-signature"></span> Impressão Pedidos Abertos'
    codigoHTML += '</button>'
    codigoHTML += '</div>'


    document.getElementById('janela2').innerHTML = codigoHTML;

}

// --------------------------------------------- SUB MENU PRODUTOS E BEBIDAS -----------------------------------------------------

//funcao menu de opcoes para produto
function menuProdutoeBebida() {

    var codigoHTML = '';

    codigoHTML += '<h3 class="text-center">Produtos</h3>'
    codigoHTML += '<div class="card-deck mx-auto" style="margin-top:40px;">'
    codigoHTML += `<button onclick="ligacaoProdutoFacede('cadastrar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">`
    codigoHTML += '<span class="fas fa-plus"></span> Cadastrar Produto <span class="fas fa-utensils"></span>'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="ligacaoProdutoFacede('atualizar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">`
    codigoHTML += '<span class="fas fa-search"></span> Buscar Produto <span class="fas fa-utensils"></span>'
    codigoHTML += '</button>'
    codigoHTML += '</div>'

    codigoHTML += '<h3 style="margin-top:60px;" class="text-center">Bebidas</h3>'
    codigoHTML += '<div class="card-deck mx-auto" style="margin-top:40px;">'
    codigoHTML += `<button onclick="ligacaoBebidaFacede('cadastrar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">`
    codigoHTML += '<span class="fas fa-plus"></span> Cadastrar Bebida <span class="fas fa-wine-glass-alt"></span>'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="ligacaoBebidaFacede('atualizar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">`
    codigoHTML += '<span class="fas fa-search"></span> Buscar Bebida <span class="fas fa-wine-glass-alt"></span>'
    codigoHTML += '</button>'
    codigoHTML += '</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU ADMIN -----------------------------------------------------

//funcao menu de opoes para admin
function menuConfiguracaoAdmin() {

    var codigoHTML;

    codigoHTML = '<h3 class="text-center">Administrador</h3>'
    codigoHTML += '<div class="card-deck mx-auto" style="margin-top:30px;">'
    codigoHTML += '<button onclick="ligacaoAdministradorFacede(\'cadastrar\');" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">'
    codigoHTML += '<span class="fas fa-users"></span> Cadastrar Administrador'
    codigoHTML += '</button>'
    codigoHTML += '<button onclick="ligacaoAdministradorFacede(\'atualizar\');" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">'
    codigoHTML += '<span class="fas fa-search"></span> Buscar Administrador'
    codigoHTML += '</button>'

    codigoHTML += '</div>'


    if (sessionStorage.getItem("login")) {
        document.getElementById('janela2').innerHTML = codigoHTML;
    } else {
        telaAutenticacao();
    }
}

// --------------------------------------------- SUB MENU PEDIDO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPedido() {
    var codigoHTML = '';

    codigoHTML += '<h3 class="text-center">Pedido</h3>'
    codigoHTML += '<div class="card-deck mx-auto" style="margin-top:30px;">'
    codigoHTML += `<button onclick="ligacaoPedidoFacede('digitar');" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">`
    codigoHTML += '<span class="fas fa-keyboard"></span> Digitar Código'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="ligacaoPedidoFacede('qrcode');" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">`
    codigoHTML += '<span class="fas fa-camera"></span> Ler QR Code'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="animacaoSlideUp(['#janela2']); setTimeout(function(){ligacaoPedidoFacede('lista');},300);" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">`
    codigoHTML += '<span class="fas fa-list-alt"></span> Exibir Todos'
    codigoHTML += '</button>'
    codigoHTML += '</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU PAGAMENTO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPagamentoPedido() {
    var codigoHTML = '';

    codigoHTML += '<h3 class="text-center">Pagamento</h3>'
    codigoHTML += '<div class="card-deck mx-auto" style="margin-top:30px;">'
    codigoHTML += `<button onclick="ligacaoPagamentoFacede('digitar');" type="button" class="btn btn-light border border-dark btn-lg mx-auto col-8" style="margin-top: 10px">`
    codigoHTML += '<span class="fas fa-keyboard"></span> Digitar Código'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="ligacaoPagamentoFacede('qrcode');" type="button" class="btn btn-light border border-dark btn-lg mx-auto col-8" style="margin-top: 10px">`
    codigoHTML += '<span class="fas fa-camera"></span> Ler QR Code'
    codigoHTML += '</button>'
    codigoHTML += `<button onclick="animacaoSlideUp(['#janela2']); setTimeout(function(){ligacaoPagamentoFacede('lista');},300);" type="button" class="btn btn-light border border-dark btn-lg mx-auto col-8" style="margin-top: 10px">`
    codigoHTML += '<span class="fas fa-list-alt"></span> Exibir Todos'
    codigoHTML += '</button>'
    codigoHTML += '</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}