// --------------------------------------------- SUB MENU IMPRESSÃO -----------------------------------------------------

// funcao menu de opcoes para impressao
function menuImpressao(){

    var codigoHTML;

    codigoHTML='<h3 class="text-center">Impressão</h3>'
    codigoHTML+='<div class="card-deck" style="margin-top:30px;">'
        codigoHTML+='<button onclick="telaGerarQRCode(null);" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-qrcode"></span> Impressão Comanda'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaGerarRelatorioDeCaixa();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-file-invoice-dollar"></span> Impressão Relatório Caixa'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaGerarRelatorioProdutoseBebidas();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-file-alt"></span> Impressão Relatório Produtos'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaGerarListaTodosOsPedidosAbertos();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-file-signature"></span> Impressão Pedidos Abertos'
        codigoHTML+='</button>'
        codigoHTML+='<div class="input-group border border-dark" style="margin-top:10px">'
            codigoHTML+='<div class="input-group-prepend">'
                codigoHTML+='<label class="input-group-text">Digite um Número</label>'
            codigoHTML+='</div>'
            codigoHTML+='<div class="custom-file">'
                codigoHTML+='<input type="Number" class="form-control" id="comandaOpcNumber" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">'
            codigoHTML+='</div>'
            codigoHTML+='<div class="input-group-append">'
                codigoHTML+='<button onclick="telaGerarQRCode(comandaOpcNumber.value);" class="btn btn-light border border-dark btn-lg btn-block" type="button"><span class="fas fa-qrcode"></span> Impressão Comanda</button>'
            codigoHTML+='</div>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
    
}

// --------------------------------------------- SUB MENU PRODUTOS E BEBIDAS -----------------------------------------------------

//funcao menu de opcoes para produto
function menuProdutoeBebida(){
    
    var codigoHTML;
    
    codigoHTML='<div class="card-deck">'
        codigoHTML+='<h3 class="text-center">Produtos</h3>'
        codigoHTML+='<button onclick="telaCadastrarProduto();" type="button" style="margin-top:10px;" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-plus"></span> Cadastrar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaVisualizarProduto();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-search"></span> Visualizar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaListarProdutosAtualizar();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-edit"></span> Editar Produto'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaDeletarProduto();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-trash-alt"></span> Apagar Produto'
        codigoHTML+='</button>'


        codigoHTML+='<h3 style="margin-top:20px;" class="text-center">Bebidas</h3>'
        codigoHTML+='<button onclick="telaCadastrarBebida();" type="button" style="margin-top:10px;" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-plus"></span> Cadastrar Bebida'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaVisualizarBebida();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-search"></span> Visualizar Bebida'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaListarBebidasAtualizar();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-edit"></span> Editar Bebida'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaDeletarBebida();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-trash-alt"></span> Apagar Bebida'
        codigoHTML+='</button>'
    codigoHTML+='</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU ADMIN -----------------------------------------------------

//funcao menu de opoes para admin
function menuConfiguracaoAdmin(){

    var codigoHTML;

    codigoHTML='<h3 class="text-center">Administrador</h3>'
    codigoHTML+='<div class="card-deck" style="margin-top:30px;">'
        codigoHTML+='<button onclick="telaCadastrarAdmin();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-users"></span> Cadastrar Administrador'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaAtualizarAdmin();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-edit"></span> Atualizar Administrador'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="teladeletarAdmin();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-user-times"></span> Deletar Administrador'
        codigoHTML+='</button>'
        
    codigoHTML+='</div>'

    
    if(sessionStorage.getItem("login")){
        document.getElementById('janela2').innerHTML = codigoHTML;
    }else{
        telaAutenticacao();
    }
}

// --------------------------------------------- SUB MENU PEDIDO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPedido(){
    var codigoHTML;

    codigoHTML='<h3 class="text-center">Pedido</h3>'
    codigoHTML+='<div class="card-deck" style="margin-top:30px;">'
        codigoHTML+='<button onclick="telaDigitarPedido(null)" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-keyboard"></span> Digitar Código'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaLeituraDeQrCodePedido();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-camera"></span> Ler QR Code'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaExibirTodosOsPedidos();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-list-alt"></span> Exibir Todos'
        codigoHTML+='</button>'
    codigoHTML+='</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// --------------------------------------------- SUB MENU PAGAMENTO -----------------------------------------------------

//funcao menu de opcaoes para pedido
function menuPagamentoPedido(){
    var codigoHTML;

    codigoHTML='<h3 class="text-center">Pagamento</h3>'
    codigoHTML+='<div class="card-deck" style="margin-top:30px;">'
        codigoHTML+='<button onclick="telaPagamento()" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-keyboard"></span> Digitar Código'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaLeituraDeQrCodePagamento();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-camera"></span> Ler QR Code'
        codigoHTML+='</button>'
        codigoHTML+='<button onclick="telaExibirTodosOsPedidosPagamento();" type="button" class="btn btn-light border border-dark btn-lg btn-block">'
            codigoHTML+='<span class="fas fa-list-alt"></span> Exibir Todos'
        codigoHTML+='</button>'
    codigoHTML+='</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

