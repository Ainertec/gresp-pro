// --------------------------------------------- SUB MENU IMPRESSÃO -----------------------------------------------------

// funcao menu de opcoes para impressao
function menuImpressao() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:5vh">
        <h3 class="text-center" style="margin-top:30px;"><span class="fas fa-print"></span> Impressão</h3>
        <div class="card-deck mx-auto" style="margin-top:80px;">
            <button onclick="modalImpressaoComandaQrcode(true);" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-qrcode"></span> Comanda aleatória
            </button>
            <button onclick="modalImpressaoComandaQrcode(false);" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-qrcode"></span> Comanda específica
            </button>
            <button onclick="modalImpressaoPostCardapio();" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-qrcode"></span> Post cardápio
            </button>
            <button onclick="ligacaoRelatorioFacede('produtosebebidas');" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-file-alt"></span> Impressão Relatório Produtos
            </button>
            <button onclick="ligacaoRelatorioFacede('relatoriocaixa');" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-file-invoice-dollar"></span> Impressão Relatório Caixa
            </button>
            <button onclick="ligacaoRelatorioFacede('pedidosabertos');" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-file-signature"></span> Impressão Pedidos Abertos
            </button>
        </div>
    </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;

}

// --------------------------------------------- SUB MENU PRODUTOS E BEBIDAS -----------------------------------------------------

//funcao menu de opcoes para produto
function menuProdutoeBebida() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:5vh;">
        <h3 class="text-center" style="margin-top:30px;"><span class="fas fa-utensils"></span> Produtos <span class="fas fa-wine-glass-alt"></span></h3>
        <div class="card-deck mx-auto" style="margin-top:80px;">
            <button onclick="ligacaoProdutoFacede('cadastrar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px; height: 20vh; width: 20vw;">
                <span class="fas fa-plus"></span> Criar Produto <span class="fas fa-utensils"></span> <span class="fas fa-wine-glass-alt"></span>
            </button>
            <button onclick="ligacaoProdutoFacede('atualizar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px; height: 20vh; width: 20vw;">
                <span class="fas fa-search"></span> Buscar Produto <span class="fas fa-utensils"></span> <span class="fas fa-wine-glass-alt"></span>
            </button>
        </div>
    </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU PEDIDO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPedido() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:5vh">
        <h3 class="text-center" style="margin-top:30px;"><span class="fas fa-file-signature"></span> Pedido</h3>
        <div class="card-deck mx-auto" style="margin-top:80px;">
            <button onclick="ligacaoPedidoFacede('digitar');" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-keyboard"></span> Digitar Código
            </button>
            <button onclick="ligacaoPedidoFacede('qrcode');" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-camera"></span> Ler QR Code
            </button>
            <button onclick="animacaoSlideUp(['#janela2']); setTimeout(function(){ligacaoPedidoFacede('lista');},300);" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-list-alt"></span> Exibir Todos
            </button>
        </div>
    </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU PAGAMENTO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPagamentoPedido() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:5vh">
        <h3 class="text-center" style="margin-top:30px;"><span class="fas fa-donate"></span> Pagamento</h3>
        <div class="card-deck mx-auto" style="margin-top:80px;">
            <button onclick="ligacaoPagamentoFacede('digitar');" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-keyboard"></span> Digitar Código
            </button>
            <button onclick="ligacaoPagamentoFacede('qrcode');" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-camera"></span> Ler QR Code
            </button>
            <button onclick="animacaoSlideUp(['#janela2']); setTimeout(function(){ligacaoPagamentoFacede('lista');},300);" type="button" class="btn btn-light border border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-list-alt"></span> Exibir Todos
            </button>
        </div>
    </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// -----------------------------------------------SUB MENU ESTOQUE ------------------------------------------------------

//funcao menu de opcoes para estoque
function menuEstoque() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:5vh">
        <h3 class="text-center" style="margin-top:30px;"><span class="fas fa-boxes"></span> Estoque</h3>
        <div class="card-deck mx-auto" style="margin-top:80px;">
            <button onclick="ligacaoEstoqueFacede('produto');" type="button" class="btn btn-light border col-5 border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-search"></span> Buscar Produtos <span class="fas fa-utensils"></span> <span class="fas fa-wine-glass-alt"></span>
            </button>
            <button onclick="ligacaoEstoqueFacede('ingrediente');" type="button" class="btn btn-light border col-5 border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-search"></span> Buscar ingrediente <span class="fas fa-carrot"></span>
            </button>
        </div>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// -----------------------------------------------SUB MENU CATEGORIA ------------------------------------------------------

//funcao menu de opcoes para categoria
function menuCategoria() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:5vh">
        <h3 class="text-center" style="margin-top:30px;"><span class="fas fa-filter"></span> Categoria</h3>
        <div class="card-deck mx-auto" style="margin-top:80px;">
            <button onclick="ligacaoCategoriaFacede('cadastrar');" type="button" class="btn btn-light border col-5 border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-plus"></span> Criar categoria <span class="fas fa-filter"></span>
            </button>
            <button onclick="ligacaoCategoriaFacede('atualizar');" type="button" class="btn btn-light border col-5 border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-search"></span> Buscar categoria <span class="fas fa-filter"></span>
            </button>
        </div>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// -----------------------------------------------SUB MENU INGREDIENTES ------------------------------------------------------

//funcao menu de opcoes para ingrediente
function menuIngrediente() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded" style="margin-top:5vh">
        <h3 class="text-center" style="margin-top:30px;"><span class="fas fa-carrot"></span> Ingrediente</h3>
        <div class="card-deck mx-auto" style="margin-top:80px;">
            <button onclick="ligacaoIngredienteFacede('cadastrar');" type="button" class="btn btn-light border col-5 border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-plus"></span> Criar ingrediente <span class="fas fa-carrot"></span>
            </button>
            <button onclick="ligacaoIngredienteFacede('atualizar');" type="button" class="btn btn-light border col-5 border-dark btn-lg mx-auto" style="margin-top: 10px; height: 20vh; width: 20vw;">
                <span class="fas fa-search"></span> Buscar ingrediente <span class="fas fa-carrot"></span>
            </button>
        </div>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}