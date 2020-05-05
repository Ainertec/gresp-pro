// --------------------------------------------- VARIAVEIS GLOBAIS -----------------------------------------------------

// variaveis globais para contabilizar a quantidade de bebidas e produtos para percorrer o while
var contadorProduto=0, contadorBebida=0;

// --------------------------------------------- TELAS OPÇÃO DE PEDIDO -----------------------------------------------------

//funcao tela de digitar identificacao do pedido
function telaDigitarPedido(identificacao){

    var codigoHTML;

    codigoHTML='<h4>Buscar</h4>'
    codigoHTML+='<form>'
        codigoHTML+='<div class="form-row">'
            if(identificacao==null){
                codigoHTML+='<input id="identificacao" type="text" class="form-control col-md-9" placeholder="Número Pedido">'
                codigoHTML+='<button onclick="buscarPedido();" type="button" class="btn btn-light border border-dark col-md-3">'
                    codigoHTML+='<span class="fas fa-search"></span> Buscar Pedido'
                codigoHTML+='</button>'
            }else{
                codigoHTML+='<input id="identificacao" disabled type="text" class="form-control col-md-9" value='+identificacao+'>'
                setTimeout(function(){buscarPedido()},1000);
            }
        codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<h4 id="valorTotal"></h4>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<h5>Produtos Pedidos</h5>'
    codigoHTML+='<div style="margin-top:10px" class="col-11 rounded mx-auto d-block"><table class="table table-light"><thead><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead><tbody id="tabelaProdutos"></tbody></table></div>'
    codigoHTML+='<h5>Bebidas Pedidas</h5>'
    codigoHTML+='<div style="margin-top:10px" class="col-11 rounded mx-auto d-block"><table class="table table-light"><thead><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead><tbody id="tabelaBebidas"></tbody></table></div>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<h5>Observações</h5>'
    codigoHTML+='<textarea id="observacao" class="form-control col-10 rounded mx-auto d-block" rows="5"></textarea>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<h5>Lista Produtos e Bebidas</h5>'
    codigoHTML+='<div id="listaItens" style="margin-top:10px" class="col-11 rounded mx-auto d-block"></div>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<div id="subMenu" style="margin-top:10px" class="col-11 rounded mx-auto d-block"></div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para gerar tela de leitura de qrCode
function telaLeituraDeQrCodePedido(){
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
        telaDigitarPedido(content);
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
async function telaExibirTodosOsPedidos(){
    
    telaEscopoExibirTodosOsPedidos("telaDigitarPedido(this.value)");
    
}

// --------------------------------------------- REQUISICAO -----------------------------------------------------

//funcao para verificar se pedido existe
async function buscarPedido(){
    var json = await requisicaoGET("order/?identification="+$('#identificacao').val());

    inicializacao();

    if(json.data){
        subMenuOpcao("requisicaoOrderPut()");
        carregarItemDoPedido(json);
        document.getElementById('valorTotal').innerHTML = 'Valor Total: <span class="badge badge-success"> R$'+json.data.total.toFixed(2)+'</span>';
        document.getElementById('observacao').innerHTML = json.data.note;
    }else{
        subMenuOpcao("requisicaoOrderPost()");
    }
}

//funcao para requisicao via put com JSON com novos dados
async function requisicaoOrderPut(){
    var json=JSON.parse(gerarJSONRequisicao());
    await requisicaoPUT("orders/"+json.identification,json);
    await requisicaoGET("printer/?identification="+$('#identificacao').val()+"&type=Atualizada");
    mensagemDeAviso("Pedido cadastrado com sucesso!");
    buscarPedido();
}

//funcao para requisicao via post com JSON com todos os dados para gravura do arquivo
async function requisicaoOrderPost(){
    var retorno = await requisicaoPOST("orders/",JSON.parse(gerarJSONRequisicao()));
    await requisicaoGET("printer/?identification="+$('#identificacao').val()+"&type=Novo");
    try {
        if(retorno.data.alert!=null){
            mensagemDeErro(retorno.data.alert);
        }
        mensagemDeAviso("Pedido cadastrado com sucesso!");
        buscarPedido();   
    } catch (error) {
        mensagemDeAviso("Pedido cadastrado com sucesso!");
        buscarPedido();
    }
}

//funcao para detereminar a requisicao de acordo com a opcao de busca e o tipo de item
async function tipoRequisicaoItens(url,tipo){
    if(url==1){
        if(tipo==1){
            listaItens(1,1,await requisicaoGET("products/?name="+$("#nome").val()));
        }else{
            listaItens(1,1,await requisicaoGET("products/"));
        }
    }else{
        if(tipo==1){
            listaItens(2,2,await requisicaoGET("drinkables/?name="+$("#nome").val()));
        }else{
            listaItens(2,2,await requisicaoGET("drinkables/"));
        }
    }
}

// --------------------------------------------- TELAS DE RESPOSTA -----------------------------------------------------

//funcao para criar sub menu de opcoes
function subMenuOpcao(funcao){
    var codigoHTML;

    opcaoBuscaItens(1);

    codigoHTML='<button onclick='+funcao+' type="button" class="btn btn-info btn-lg btn-block border border-dark">'
        codigoHTML+='<span class="fas fa-check"></span> Finalizar Pedido'
    codigoHTML+='</button>'

    document.getElementById('subMenu').innerHTML=codigoHTML;

}

//funcao para carregar os itens de um ordem já existente
async function carregarItemDoPedido(json){
    var cont=0;

    while(json.data.products[cont]){
        gerarListaPedido({compID:"produto"+contadorProduto+"", compIDp:"idp"+contadorProduto+"", comp_id:json.data.products[cont].product._id, nome:json.data.products[cont].product.name, preco:json.data.products[cont].product.price, compIDQuanti:"quantidadep"+contadorProduto+"", compQuanti:json.data.products[cont].quantity, compContador:contadorProduto, compTipo:1},null,null);
        cont++;
    }
    
    cont=0;
    while(json.data.drinkables[cont]){
        gerarListaPedido({compID:"bebida"+contadorBebida+"", compIDp:"idb"+contadorBebida+"", comp_id:json.data.drinkables[cont].drinkable._id, nome:json.data.drinkables[cont].drinkable.name, preco:json.data.drinkables[cont].drinkable.price, compIDQuanti:"quantidadeb"+contadorBebida+"", compQuanti:json.data.drinkables[cont].quantity, compContador:contadorBebida, compTipo:2},null,null);
        cont++;
    }
}

//funcao para gerar tela de escopo com as opcoes de busca todos os itens um buscar determinado item
function opcaoBuscaItens(tipo){
    if(tipo==1){
        escopoTelaDeBusca("tipoRequisicaoItens(1,2)","tipoRequisicaoItens(1,1)",'listaItens');
    }else{
        escopoTelaDeBusca("tipoRequisicaoItens(2,2)","tipoRequisicaoItens(2,1)",'listaItens');
    }
    
}

//funcao para criar lista de produtos para adicionar
function listaItens(url,tipo,json){
    var codigoHTML, cont=0;

    if(url==1){
        codigoHTML='<h5 class="text-center" style="margin-top:10px"> Produto</h5>'    
    }else{
        codigoHTML='<h5 class="text-center" style="margin-top:10px"> Bebida</h5>'
    }
    codigoHTML+='<table class="table table-light">'
        codigoHTML+='<thead><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead>'
        codigoHTML+='<tbody>'
        while(json.data[cont]){
            codigoHTML+='<tr class="table-light text-dark">'
                codigoHTML+='<td class="col-md-5"><input hidden id="'+json.data[cont]._id+'name" value="'+json.data[cont].name+'"/><strong>'+json.data[cont].name+'</strong></td>'
                codigoHTML+='<td class="col-md-2"><input hidden id="'+json.data[cont]._id+'price" value="'+json.data[cont].price.toFixed(2)+'"/><strong>R$'+json.data[cont].price.toFixed(2)+'</strong></td>'
                codigoHTML+='<td class="col-md-2"><input class="col-md" type="Number" id="quantidade'+json.data[cont]._id+'"/></td>'
                codigoHTML+='<td class="col-md-2"><button onclick="gerarListaPedido(null,this.value,'+tipo+')" value="'+json.data[cont]._id+'" class="btn btn-outline-primary"><span class="fas fa-plus"></span></button></td>'
            codigoHTML+='</tr>'

            cont++;
        }
        codigoHTML+='</tbody>'
    codigoHTML+='</table>'
    if(url==1){
        codigoHTML+='<button onclick="opcaoBuscaItens(2)" class="btn btn-outline-success">Próximo <span class="fas fa-angle-right"></span></button>'
    }else{
        codigoHTML+='<button onclick="opcaoBuscaItens(1)" class="btn btn-outline-success">Próximo <span class="fas fa-angle-right"></span></button>'
    }
    

    document.getElementById('resposta').innerHTML = codigoHTML;

}

//funcao para criar listas com os itens selecionados
function gerarListaPedido(json,id,tipo){
    var codigoHTML, vetorDeComponentes;

    if(json==null){
        if(tipo==1){
            vetorDeComponentes={compID:"produto"+contadorProduto+"", compIDp:"idp"+contadorProduto+"", comp_id:id, nome:$("#"+id+"name").val(), preco:$("#"+id+"price").val(), compIDQuanti:"quantidadep"+contadorProduto+"", compQuanti:$("#quantidade"+id).val(), compContador:contadorProduto, compTipo:tipo};
        }else{
            vetorDeComponentes={compID:"bebida"+contadorBebida+"", compIDp:"idb"+contadorBebida+"", comp_id:id, nome:$("#"+id+"name").val(), preco:$("#"+id+"price").val(), compIDQuanti:"quantidadeb"+contadorBebida+"", compQuanti:$("#quantidade"+id).val(), compContador:contadorBebida, compTipo:tipo};
        }
    }else{
        vetorDeComponentes={compID:json.compID, compIDp:json.compIDp, comp_id:json.comp_id, nome:json.nome, preco:json.preco.toFixed(2), compIDQuanti:json.compIDQuanti, compQuanti:json.compQuanti, compContador:json.compContador, compTipo:json.compTipo};
    }
    
    codigoHTML='<tr scope="row" class="table-secondary text-dark" id='+vetorDeComponentes.compID+'>'
        codigoHTML+='<td class="col-md-5"><strong>'+vetorDeComponentes.nome+'</strong></td>'
        codigoHTML+='<td class="col-md-2"><strong>R$'+vetorDeComponentes.preco+'</strong></td>'
        codigoHTML+='<td class="col-md-2"><input class="col-md" id='+vetorDeComponentes.compIDQuanti+' type="Number" value='+vetorDeComponentes.compQuanti+'></td>'
        if(json==null){
            codigoHTML+='<td class="col-md-2"><button onclick="removerItem('+vetorDeComponentes.compContador+','+vetorDeComponentes.compTipo+')" class="btn btn-outline-danger"><span class="fas fa-trash-alt"></span></button></td>'
        }
        codigoHTML+='<td><input id='+vetorDeComponentes.compIDp+' hidden value="'+vetorDeComponentes.comp_id+'"></td>'
    codigoHTML+='</tr>'


    if(vetorDeComponentes.compTipo==1){
        $('#tabelaProdutos').append(codigoHTML);
        contadorProduto++;
    }else{
        $('#tabelaBebidas').append(codigoHTML);
        contadorBebida++;
    }
}

//funcao para remover item da lista
function removerItem(id,tipo){
    if(tipo==1){
        document.getElementById("produto"+id).innerHTML="";
    }else{
        document.getElementById("bebida"+id).innerHTML="";
    }
}

// --------------------------------------------- GERAR JSON PARA REQUISICAO -----------------------------------------------------

//funcao para gerar JSON para requisicoes
function gerarJSONRequisicao(){
    var JSONRequisicao;

    JSONRequisicao='{"identification":'+$("#identificacao").val()
    if(contadorProduto>0){
        JSONRequisicao+=','
        JSONRequisicao+=escopoDeJSONDrinkablesProducts(contadorProduto,'produto','idp',"products","product","quantidadep");    
        JSONRequisicao +=']'
    }
    if(contadorBebida>0){
        JSONRequisicao+=','
        JSONRequisicao+=escopoDeJSONDrinkablesProducts(contadorBebida,'bebida','idb',"drinkables","drinkable","quantidadeb");
        JSONRequisicao +=']'
    }
    JSONRequisicao +=', "note":"'+$("#observacao").val()+'"}'

    return JSONRequisicao;
}

//funcao para gerar escopo de while para gerar JSON de Products e Drinkables
function escopoDeJSONDrinkablesProducts(contador,tipo,id,tipo2,tipo3,quantidade){
    var JSONRequisicao, cont=0, primeiroElemento=true;

    while(cont<contador){
        if(document.getElementById(tipo+cont).querySelector('#'+id+cont)!==null){
            if(primeiroElemento){
                JSONRequisicao ='"'+tipo2+'":[{"'+tipo3+'":"'+$("#"+id+cont).val()+'","quantity":'+$("#"+quantidade+cont).val()+'}'
                primeiroElemento=false;
            }else{
                JSONRequisicao +=',{"'+tipo3+'":"'+$("#"+id+cont).val()+'","quantity":'+$("#"+quantidade+cont).val()+'}'
            }
        }
        cont++;
    }

    return JSONRequisicao;
}

// --------------------------------------------- INICIALIZAR OU RECARREGAR PAGINA -----------------------------------------------------

//funcaopara inicializar zerar todos os componentes da tela
function inicializacao(){
    document.getElementById('tabelaProdutos').innerHTML="";
    document.getElementById('tabelaBebidas').innerHTML="";
    document.getElementById('listaItens').innerHTML="";
    document.getElementById('subMenu').innerHTML="";
    document.getElementById('valorTotal').innerHTML="";
    document.getElementById('observacao').innerHTML="";
    contadorProduto=0;
    contadorBebida=0;
}
