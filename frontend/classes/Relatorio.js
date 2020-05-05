// --------------------------------------------- RELATÓRIO DE PRODUTOS E BEBIDAS -----------------------------------------------------

// funcao relatorio produtos e bebidas
function telaGerarRelatorioProdutoseBebidas(){
    
    var codigoHTML;

    codigoHTML='<div>'
        codigoHTML+='<a class="text-dark" href="home.html">Voltar</a>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="text-center">'
        codigoHTML+='<h3>Relatório de Produtos e Bebidas</h3>'
        codigoHTML+='<div id="produtos"></div>'
        codigoHTML+='<div id="bebidas"></div>'
        codigoHTML+='<hr style="margin-top:10px;">'
    codigoHTML+='</div>'

    if(sessionStorage.getItem("login")){
        document.getElementById('navbarTotal').innerHTML="";
        document.getElementById('janelaTotal').innerHTML = codigoHTML;
        telaRespostaRelatorioProdutoseBebidas();
    }else{
        telaAutenticacao();
    }
}

//funcao para gerar tela de resposta com todos os produtos e bebidas
async function telaRespostaRelatorioProdutoseBebidas(){
	
    document.getElementById('produtos').innerHTML = escopoTabelaDeResposta(await requisicaoGET("products/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th>','<th class="table-light">','<th class="table-light">',null,'<th class="table-light">R$ ',null,null);

    document.getElementById('bebidas').innerHTML = escopoTabelaDeResposta(await requisicaoGET("drinkables/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th>','<th class="table-light">','<th class="table-light">','<th class="table-light">','<th class="table-light">R$ ',null,null);
			
	setTimeout(function(){window.print();},1000);
}

// --------------------------------------------- RELATÓRIO DE CAIXA -----------------------------------------------------


//funcao gerar relatorio de caixa
function telaGerarRelatorioDeCaixa(){
    var codigoHTML;

    codigoHTML='<div>'
        codigoHTML+='<a class="text-dark" href="home.html">Voltar</a>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="text-center">'
        codigoHTML+='<h3>Relatório de caixa</h3>'
        codigoHTML+='<div id="grafico"></div>'
        codigoHTML+='<div id="grafico2"></div>'
        codigoHTML+='<div id="grafico3"></div>'
        codigoHTML+='<div id="lista"></div>'
        codigoHTML+='<hr style="margin-top:10px;">'
    codigoHTML+='</div>'

    if(sessionStorage.getItem("login")){
        document.getElementById('navbarTotal').innerHTML="";
        document.getElementById('janelaTotal').innerHTML = codigoHTML;
        telaRespostaRelatorioDeCaixa();
    }else{
        telaAutenticacao();
    }
}

//funcao para gerar tela de resposta com todos os pedidos fechados
async function telaRespostaRelatorioDeCaixa(){
    var json=await requisicaoGET("logs_by_month/"), codigoHTML, cont=0;

    graficoDeDados(json,'grafico');

    graficoDeItensVendidos(json,'grafico2', await requisicaoGET("products/"), await requisicaoGET("drinkables/"));

    graficoDeLucrosTotaisDeCadaMes(json,'grafico3');


    codigoHTML='<table class="table table-dark table-bordered text-center">'
        codigoHTML+='<thead class="thead-dark">'
            codigoHTML+='<tr>'
                codigoHTML+='<td scope="col"><small>Data</small></td>'
                codigoHTML+='<td scope="col"><small>Identificação</small></td>'
                codigoHTML+='<td scope="col"><small>Lista itens por ID</small></td>'
                codigoHTML+='<td scope="col"><small>Forma pagamento</small></td>'
                codigoHTML+='<td scope="col"><small>Valor</small></td>'
            codigoHTML+='</tr>'
        codigoHTML+='</thead>'
        codigoHTML+='<tbody>'
        while(json.data[cont]){
            codigoHTML+=gerarLinhaTabelaRelatorios(json.data[cont]);
            cont++;
        }
        codigoHTML+='</tbody>'
    codigoHTML+='</table>'

    document.getElementById('lista').innerHTML=codigoHTML;

    setTimeout(function(){window.print();},1000);

}

// --------------------------------------------- RELATÓRIO DE PEDIDOS EM ABERTO -----------------------------------------------------

//funcao gerar relatorio de pedidos em aberto
function telaGerarListaTodosOsPedidosAbertos(){
    var codigoHTML;

    codigoHTML='<div>'
        codigoHTML+='<a class="text-dark" href="home.html">Voltar</a>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="text-center">'
        codigoHTML+='<h3>Pedidos em Aberto</h3>'
        codigoHTML+='<div id="lista"></div>'
        codigoHTML+='<hr style="margin-top:10px;">'
    codigoHTML+='</div>'

    document.getElementById('navbarTotal').innerHTML="";
    document.getElementById('janelaTotal').innerHTML = codigoHTML;
    telaRespostaListaTodosOsPedidosAbertos();
}

//funcao para gerar tela de resposta com lista de todos os pedidos em aberto
async function telaRespostaListaTodosOsPedidosAbertos(){
    var json=await requisicaoGET("orders/"), codigoHTML, cont=0;

    codigoHTML='<table class="table table-dark table-bordered text-center">'
        codigoHTML+='<thead class="thead-dark">'
            codigoHTML+='<tr>'
                codigoHTML+='<td scope="col"><small>Identificação</small></td>'
                codigoHTML+='<td scope="col"><small>Lista itens por Nome</small></td>'
                codigoHTML+='<td scope="col"><small>Valor</small></td>'
            codigoHTML+='</tr>'
        codigoHTML+='</thead>'
        codigoHTML+='<tbody>'
        while(json.data[cont]){
            codigoHTML+=gerarLinhaTabelaPedidosEmAberto(json.data[cont]);
            cont++;
        }
        codigoHTML+='</tbody>'
    codigoHTML+='</table>'

    document.getElementById('lista').innerHTML=codigoHTML;

    setTimeout(function(){window.print();},1000);

}