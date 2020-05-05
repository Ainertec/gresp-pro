// --------------------------------------------- TELA INICIAL -----------------------------------------------------

//funcao para gerar tela de busca de bebidas
function telaDeBuscarBebidasEstoque(){
    escopoTelaDeBusca("requisicaoBebida()","requisicaoTodasBebidas()",'janela2');
}

// --------------------------------------------- REQUISICAO -----------------------------------------------------

//funcao para fazer busca via GET de bebida
async function requisicaoTodasBebidas(){
    gerarTabelaDeRespostaBebidasEstoque(await requisicaoGET("drinkables/?name="+$("#nome").val()));
}

//funcao para fazer busca via GET de todas as bebidas
async function requisicaoBebida(){
    gerarTabelaDeRespostaBebidasEstoque(await requisicaoGET("drinkables/"));
}

//funcao para salvar atualizar quantidade de produtos no estoque
async function requisicaoPUTEstoque(id){
    await requisicaoPUT("drinkables/"+id,{"name":$('#'+id+'name').val(),"price":$('#'+id+'price').val(),"description":$('#'+id+'description').val(),"stock":$('#quantidade'+id).val()});
    mensagemDeAviso("Atualizado com sucesso!");
    telaDeBuscarBebidasEstoque();
}

// --------------------------------------------- TELA DE RESPOSTA -----------------------------------------------------

//funcao para gerar tabela de resposta de requisicao
function gerarTabelaDeRespostaBebidasEstoque(json){
        var codigoHTML, cont=0;

        codigoHTML='<div id="grafico" style="margin-top:10px"></div>'
        codigoHTML+='<h5 class="text-center" style="margin-top:25px">Atualizar estoque</h5>'
        codigoHTML+='<table class="table table-light" style="margin-top:10px">'
        codigoHTML+='<thead><tr><th scope="col">Nome</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead>'
        codigoHTML+='<tbody>'
        while(json.data[cont]){
            codigoHTML+='<tr class="table-secondary text-dark">'
                codigoHTML+='<td class="col-md-3"><input hidden id="'+json.data[cont]._id+'name" value="'+json.data[cont].name+'"/>'+json.data[cont].name+'</td>'
                codigoHTML+='<td class="col-md-5"><input class="col-md" type="Number" id="quantidade'+json.data[cont]._id+'" value="'+json.data[cont].stock+'"/></td>'
                codigoHTML+='<td class="col-md-2"><button onclick="requisicaoPUTEstoque(this.value)" value="'+json.data[cont]._id+'" class="btn btn-outline-primary"><span class="fas fa-sync"></span></button></td>'
                codigoHTML+='<td class="col-md-1"><input hidden id="'+json.data[cont]._id+'price" value="'+json.data[cont].price+'"/></td>'
                codigoHTML+='<td class="col-md-1"><input hidden id="'+json.data[cont]._id+'description" value="'+json.data[cont].description+'"/></td>'
            codigoHTML+='</tr>'

            cont++;
        }
        codigoHTML+='</tbody>'
    codigoHTML+='</table>'

    document.getElementById('resposta').innerHTML = codigoHTML;
    gerarGraficoEstoque(json);
}

//function para gerar grafico de estoque
function gerarGraficoEstoque(json){
    var cont=0, vetorNome=[],vetorQuantidade=[];

    while(json.data[cont]){
        vetorNome[cont]=json.data[cont].name;
        vetorQuantidade[cont]=json.data[cont].stock;
        cont++;
    }

    Highcharts.chart('grafico',{
        chart:{
            type:'bar'
        },
        title:{
            text:'Gráfico Estoque'
        },
        xAxis:{
            categories:vetorNome
        },
        yAxis:{
            title:'Quantidade'
        },
        series:[{
            name:'Quantidade',
            data:vetorQuantidade
        }]
    });
}