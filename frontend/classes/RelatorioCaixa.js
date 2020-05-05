// --------------------------------------------- TELAS INICIAL -----------------------------------------------------

//funcao para gerar tela de busca de relatorio de caixa
function telaRelatorioDeCaixa(){
    var codigoHTML;

    codigoHTML='<h4 class="text-center">Buscar</h4>'
    codigoHTML+='<form>'
        codigoHTML+='<div class="form-row">'
            codigoHTML+='<input id="dataPeriodo" type="month" class="form-control col-md-6" placeholder="Número Pedido">'
            codigoHTML+='<button onclick="buscarPedidos();" type="button" class="btn btn-light border border-dark col-md-3">'
                codigoHTML+='<span class="fas fa-search"></span> Buscar Relatório'
            codigoHTML+='</button>'
            codigoHTML+='<button onclick="buscarTodosPedidos();" type="button" class="btn btn-light border border-dark col-md-3">'
                codigoHTML+='<span class="fas fa-search-plus"></span> Exibir todos'
            codigoHTML+='</button>'
        codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<div id="graficoLucro" style="margin-top:10px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<div id="graficoItensVendidos" style="margin-top:10px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<div id="graficoLucrosMensais" style="margin-top:10px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML+='<hr class="my-6 bg-dark">'
    codigoHTML+='<h5>Lista de Pedidos Fechados</h5>'
    codigoHTML+='<div id="listaItens" style="margin-top:10px" class="col-12 rounded mx-auto d-block"></div>'

    

    if(sessionStorage.getItem("login")){
        document.getElementById('janela2').innerHTML = codigoHTML;
        excluirRelatorioCaixaAntigo();
    }else{
        telaAutenticacao();
    }
}

// --------------------------------------------- TELA DE RESPOSTA -----------------------------------------------------

//funcao para gerar dados relatorio
async function graficoRelatorioCaixa(json){
    
    graficoDeDados(json,'graficoLucro');

    graficoDeItensVendidos(json,'graficoItensVendidos', await requisicaoGET("products/"), await requisicaoGET("drinkables/"));

    graficoDeLucrosTotaisDeCadaMes(json,'graficoLucrosMensais');

    tabelaDeRelatorioCaixa(json);
}

//funcao para gerar tabela com todos os pedidos registrados no caixa
function tabelaDeRelatorioCaixa(json){
    var codigoHTML,cont=0;

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

    document.getElementById('listaItens').innerHTML=codigoHTML;
}

// --------------------------------------------- REQUISICAO -----------------------------------------------------

//funcao para buscar determinados pedidos
async function buscarPedidos(){
    graficoRelatorioCaixa(await requisicaoGET("logs/?date="+$("#dataPeriodo").val()));
}

//funcao para buscar todos pedidos
async function buscarTodosPedidos(){
    graficoRelatorioCaixa(await requisicaoGET("logs_by_month/"));
}

// --------------------------------------------- GERENCIAR EXCLUSAO SISTEMA -----------------------------------------------------

//funcao para gerencia a exclusao de relatorio de caixa com mais de 1 ano
async function excluirRelatorioCaixaAntigo(){
    var json = await requisicaoGET("logs_by_month/");
    var dataAtual = new Date(), cont=0;

    while(json.data[cont]){
        var dataSplit = json.data[cont].update_at.split('-');
        if(dataSplit[0]<(dataAtual.getFullYear()-1)){
            await requisicaoDELETE("logs/"+dataSplit[0]+"-"+dataSplit[1]);
        }
        cont++;
    }

}