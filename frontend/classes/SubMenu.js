// --------------------------------------------- SUB MENU IMPRESSÃO -----------------------------------------------------

// funcao menu de opcoes para impressao
function menuImpressao() {
    let codigoHTML = ``;

    codigoHTML += `<h3 class="text-center"><span class="fas fa-print"></span> Impressão</h3>
        <div class="card-deck mx-auto" style="margin-top:50px;">
            <div class="input-group border border-dark col-8 mx-auto" style="margin-top:10px; padding: 0px">
                <div class="input-group-prepend">
                    <label class="input-group-text" for="quantidade">Quantidade</label>
                </div>
                <div class="custom-file">
                    <input type="Number" class="form-control mousetrap" id="quantidade" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                </div>
                <div class="input-group-append">
                    <button onclick="if(validaDadosCampo(['#quantidade']) && validaValoresCampo(['#quantidade'])){telaGerarQRCode(quantidade.value, 'random');}else{mensagemDeErro('Valor inválido para o campo quantidade!'); mostrarCamposIncorrreto(['quantidade']);}" class="btn btn-light border border-dark" type="button">
                        <span class="fas fa-qrcode"></span> Impressão Comanda
                    </button>
                </div>
            </div>
        </div>
        <div class="card-deck mx-auto" style="margin-top:50px;">
            <div class="input-group border border-dark col-8 mx-auto" style="margin-top:10px; padding: 0px">
                <div class="input-group-prepend">
                    <label class="input-group-text">Digite um Número</label>
                </div>
                <div class="custom-file">
                    <input type="Number" class="form-control mousetrap" id="comandaOpcNumber" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon3">
                </div>
                <div class="input-group-append">
                    <button onclick="if(validaDadosCampo(['#comandaOpcNumber']) && validaValoresCampo(['#comandaOpcNumber'])){telaGerarQRCode(comandaOpcNumber.value,null);}else{mensagemDeErro('Valor inválido para o campo número!'); mostrarCamposIncorrreto(['comandaOpcNumber']);}" class="btn btn-light border border-dark" type="button">
                        <span class="fas fa-qrcode"></span> Impressão Comanda
                    </button>
                </div>
            </div>
        </div>
        <div class="card-deck mx-auto col-8" style="margin-top:50px;">
            <button onclick="ligacaoRelatorioFacede('produtosebebidas');" type="button" class="btn btn-light border border-dark col-4" style="margin: 5px">
                <span class="fas fa-file-alt"></span> Impressão Relatório Produtos
            </button>
            <button onclick="ligacaoRelatorioFacede('relatoriocaixa');" type="button" class="btn btn-light border border-dark col-3" style="margin: 5px">
                <span class="fas fa-file-invoice-dollar"></span> Impressão Relatório Caixa
            </button>
            <button onclick="ligacaoRelatorioFacede('pedidosabertos');" type="button" class="btn btn-light border border-dark col-4" style="margin: 5px">
                <span class="fas fa-file-signature"></span> Impressão Pedidos Abertos
            </button>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;

}

// --------------------------------------------- SUB MENU PRODUTOS E BEBIDAS -----------------------------------------------------

//funcao menu de opcoes para produto
function menuProdutoeBebida() {
    let codigoHTML = ``;

    codigoHTML += `<h3 style="margin-top:10vh;" class="text-center"><span class="fas fa-utensils"></span> Produtos</h3>
        <div class="card-deck mx-auto" style="margin-top:5vh;">
            <button onclick="ligacaoProdutoFacede('cadastrar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">
                <span class="fas fa-plus"></span> Cadastrar Produto <span class="fas fa-utensils"></span>
            </button>
            <button onclick="ligacaoProdutoFacede('atualizar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">
                <span class="fas fa-search"></span> Buscar Produto <span class="fas fa-utensils"></span>
            </button>
        </div>
        <h3 style="margin-top:10vh;" class="text-center"><span class="fas fa-wine-glass-alt"></span> Bebidas</h3>
        <div class="card-deck mx-auto" style="margin-top:5vh;">
            <button onclick="ligacaoBebidaFacede('cadastrar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">
                <span class="fas fa-plus"></span> Cadastrar Bebida <span class="fas fa-wine-glass-alt"></span>
            </button>
            <button onclick="ligacaoBebidaFacede('atualizar');" type="button" class="btn btn-light border border-dark btn-lg col-5 mx-auto" style="margin: 5px">
                <span class="fas fa-search"></span> Buscar Bebida <span class="fas fa-wine-glass-alt"></span>
            </button>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU PEDIDO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPedido() {
    let codigoHTML = ``;

    codigoHTML += `<h3 class="text-center"><span class="fas fa-file-signature"></span> Pedido</h3>
        <div class="card-deck mx-auto" style="margin-top:30px;">
            <button onclick="ligacaoPedidoFacede('digitar');" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">
                <span class="fas fa-keyboard"></span> Digitar Código
            </button>
            <button onclick="ligacaoPedidoFacede('qrcode');" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">
                <span class="fas fa-camera"></span> Ler QR Code
            </button>
            <button onclick="animacaoSlideUp(['#janela2']); setTimeout(function(){ligacaoPedidoFacede('lista');},300);" type="button" class="btn btn-light border border-dark btn-lg col-8 mx-auto" style="margin-top: 10px">
                <span class="fas fa-list-alt"></span> Exibir Todos
            </button>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU PAGAMENTO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPagamentoPedido() {
    let codigoHTML = ``;

    codigoHTML += `<h3 class="text-center"><span class="fas fa-donate"></span> Pagamento</h3>
        <div class="card-deck mx-auto" style="margin-top:30px;">
            <button onclick="ligacaoPagamentoFacede('digitar');" type="button" class="btn btn-light border border-dark btn-lg mx-auto col-8" style="margin-top: 10px">
                <span class="fas fa-keyboard"></span> Digitar Código
            </button>
            <button onclick="ligacaoPagamentoFacede('qrcode');" type="button" class="btn btn-light border border-dark btn-lg mx-auto col-8" style="margin-top: 10px">
                <span class="fas fa-camera"></span> Ler QR Code
            </button>
            <button onclick="animacaoSlideUp(['#janela2']); setTimeout(function(){ligacaoPagamentoFacede('lista');},300);" type="button" class="btn btn-light border border-dark btn-lg mx-auto col-8" style="margin-top: 10px">
                <span class="fas fa-list-alt"></span> Exibir Todos
            </button>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}