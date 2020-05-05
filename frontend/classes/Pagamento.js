// --------------------------------------------- TELAS DE OPÇÃO DE PAGAMENTO -----------------------------------------------------

//funcao tela de pagamento
function telaPagamento(identificacao){
    var codigoHTML;

    codigoHTML='<h4 style="margin-top:15px">Buscar Pedido</h4>'
    codigoHTML+='<form>'
        codigoHTML+='<div class="form-row">'
        if(identificacao==null){
            codigoHTML+='<input id="identificacao" type="text" class="form-control col-md-9" placeholder="Número Pedido">'
            codigoHTML+='<button onclick="telaRespostaPagamentoBuscarPedido();" type="button" class="btn btn-light border border-dark col-md-3">'
                codigoHTML+='<span class="fas fa-search"></span> Buscar Pedido'
            codigoHTML+='</button>'
        }else{
            codigoHTML+='<input id="identificacao" disabled type="text" class="form-control col-md-9" value='+identificacao+'>'
            setTimeout(function(){telaRespostaPagamentoBuscarPedido()},1000);
        }
        codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<div id="resposta" style="margin-top:10px" class="col-10 rounded mx-auto d-block"></div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para gerar tela de leitura de qrCode
function telaLeituraDeQrCodePagamento(){
    var codigoHTML;

    codigoHTML='<h4 class="text-center">Leitura QR Code</h4>'
    codigoHTML+='<video id="preview" class="rounded mx-auto d-block" style="margin-top:30px" width=300 height=300></video>'
    codigoHTML+='<button onclick="telaLeituraDeQrCodePedido();" class="btn btn-outline-secondary rounded mx-auto d-block" style="margin-top:15px"><span class="fas fa-sync"></span> Atualizar</button>'

    document.getElementById('janela2').innerHTML = codigoHTML;

    let scanner = new Instascan.Scanner(
        {
            video: document.getElementById('preview')
        }
    );
    scanner.addListener('scan', function(content) {
        telaPagamento(content);
        setTimeout(function(){scanner.stop();}, 3000);
    });
    Instascan.Camera.getCameras().then(cameras => 
    {
        if(cameras.length > 0){
            scanner.start(cameras[0]);
        } else {
            mensagemDeErro("Não existe câmera no dispositivo!");
        }
    });
    setTimeout(function(){scanner.stop();}, 10000);
}

//funcao para exibir lista com todos os pedidos
async function telaExibirTodosOsPedidosPagamento(){
    telaEscopoExibirTodosOsPedidos("telaPagamento(this.value)");
}

// --------------------------------------------- TELA DE RESPOSTA -----------------------------------------------------

//funcao para gerar tela de resposta contendo todos os itens produtos e bebidas
async function telaRespostaPagamentoBuscarPedido(){
    var codigoHTML, cont=0;
    var json = await requisicaoGET("order/?identification="+$('#identificacao').val());

    document.getElementById('resposta').innerHTML="";

    codigoHTML='<h5 class="text-center" style="margin-top:15px">Pedido</h5>'
    codigoHTML+='<ul class="list-group">'

        while(json.data.products[cont]){
            codigoHTML+=escopoListaTelaPagamento(json.data.products[cont].product.name,json.data.products[cont].product.price,json.data.products[cont].quantity);
            cont++;
        }

        cont=0;
        
        while(json.data.drinkables[cont]){
            codigoHTML+=escopoListaTelaPagamento(json.data.drinkables[cont].drinkable.name,json.data.drinkables[cont].drinkable.price,json.data.drinkables[cont].quantity);
            cont++;
        }

    codigoHTML+='</ul>'

    codigoHTML+='<div class="input-group mb-3" style="margin-top:20px">'
        codigoHTML+='<div class="input-group-prepend">'
            codigoHTML+='<label class="input-group-text bg-dark text-light" for="inputGroupSelect01"><strong>Total: R$ '+json.data.total.toFixed(2)+'</strong></label>'
        codigoHTML+='</div>'
        codigoHTML+='<select class="custom-select" id="formaPagamento">'
            codigoHTML+='<option selected value="dinheiro">Dinheiro</option>'
            codigoHTML+='<option value="cartão">Cartão</option>'
        codigoHTML+='</select>'
        codigoHTML+='<div class="input-group-append">'
            codigoHTML+='<button onclick="efetuarPagamento();" type="button" class="btn btn-outline-primary">Efetuar Pagamento</button>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    document.getElementById('resposta').innerHTML = codigoHTML;
}

//funcao para gerar escopo da lista de produtos do pedido
function escopoListaTelaPagamento(name,price,quantity){
    var codigoHTML;
    
    codigoHTML='<li class="list-group-item d-flex justify-content-between align-items-center">'
        codigoHTML+='<strong>'+name+'</strong>'
        codigoHTML+='<span class="badge badge-success badge-pill">'
            codigoHTML+='R$'+price.toFixed(2)+' X '+quantity
        codigoHTML+='</span>'
    codigoHTML+='</li>'

    return codigoHTML;
}

// --------------------------------------------- REQUISICAO -----------------------------------------------------

//funcao para efetuar o pagamento
function efetuarPagamento(){
    requisicaoDELETE("orders/"+$('#identificacao').val()+"/"+$('#formaPagamento').val(),null);
    mensagemDeAviso("Pagamento Efetuado!");
    menuPagamentoPedido();
}