// --------------------------------------------- INICIALIZACAO OBRIGATORIA DO SISTEMA -----------------------------------------------------

//verifica inicializações basicas
$(document).ready(function (){
    if(sessionStorage.getItem("login")){
        document.getElementById('statusLogin').innerHTML = '<a onclick="logout();" class="nav-link text-light" href="home.html"><span class="fas fa-user-slash iconsTam"></span> Sair</a>';
    }else{
        document.getElementById('statusLogin').innerHTML = '<a onclick="telaAutenticacao();" class="nav-link text-light" href="#"><span class="fas fa-user-shield iconsTam"></span> Entrar</a>';
    }
});

// --------------------------------------------- TELA DE QR CODE -----------------------------------------------------

// funcao para gerar o QR code
function telaGerarQRCode(numero){
    
    if(numero==null){
        var numeroAleatorio = Math.floor(Math.random()*(201912345-200000000))+200000000;
    }else{
        var numeroAleatorio = parseInt(numero);
    }
    
    var codigoHTML;

    codigoHTML='<div>'
        codigoHTML+='<a class="text-dark" href="home.html">Voltar</a>'
    codigoHTML+='</div>'
    codigoHTML+='<div class="text-center">'
        codigoHTML+='<hr style="bg-light; size:30px">'
        codigoHTML+='<img src="logo.png" class="rounded mx-auto d-block" style="width: 350px; margin-top: 225px;" align="middle">'
        codigoHTML+='<h1 class="text-dark" style="margin-top: 250px;">'+numeroAleatorio+'</h1>'
        codigoHTML+='<div class="qrcode rounded mx-auto d-block" id="qr" style="margin-top: 30px;" align="middle">'
        codigoHTML+='</div>'
        codigoHTML+='<hr style="margin-top: 525px; bg-light; size:30px">'
    codigoHTML+='</div>'

    document.getElementById('navbarTotal').innerHTML="";
    document.getElementById('janelaTotal').innerHTML = codigoHTML;

    new QRCode("qr", {
        text: ""+numeroAleatorio+"",
        width: 256 ,
        height: 256,
        colorDark : "black",
        colorLight : "white",
        correctLevel : QRCode.CorrectLevel.H
    });
    
    setTimeout(function(){window.print();},1000);
}

// --------------------------------------------- GERA TABELA - BEBIDAS, PRODUTOS, RELATORIO DE AMBOS -----------------------------------------------------

//funcao para gerar tabela de escopo
function escopoTabelaDeResposta(msg,cabecalho,opcao1,opcao2,opcao3,opcao4,opcao5,opcao6){
    var cont=0;

    var codigoHTML='<table style="margin-top:10px;" class="table table-light">'
				codigoHTML+='<thead>'
					codigoHTML+='<tr>'
						codigoHTML+=cabecalho
					codigoHTML+='</tr>'
				codigoHTML+='</thead>'
				codigoHTML+='<tbody>'

			while(msg.data[cont]){
				
                codigoHTML+='<tr>'
                    if(opcao1){
                        codigoHTML+=opcao1+msg.data[cont].name+'</th>'
                    }
                    if(opcao2){
                        codigoHTML+=opcao2+msg.data[cont].description+'</td>'
                    }
                    if(opcao3){
                        codigoHTML+=opcao3+msg.data[cont].stock+'</td>'
                    }
                    if(opcao4){
                        codigoHTML+=opcao4+msg.data[cont].price.toFixed(2)+'</td>'
                    }
                    if(opcao5){
                        codigoHTML+=opcao5+' value="'+msg.data[cont]._id+'"><span class="'+opcao6+'"></span></button></td>'
                    }
                codigoHTML+='</tr>'

				cont++;
			}
				codigoHTML+='</tbody>'
            codigoHTML+='</table>'
            
        return codigoHTML;
}

// --------------------------------------------- GERA TELA - PRODUTOS, BEBIDAS, ESTOQUE -----------------------------------------------------

//funcao para gerar resultado tela padrão de buscas
function escopoTelaDeBusca(funcao, funcao2, localizacao){

    var codigoHTML;

    codigoHTML='<h4 class="text-center">Buscar</h4>'
    codigoHTML+='<form>'
        codigoHTML+='<div class="form-row">'
            codigoHTML+='<input id="nome" type="text" class="form-control col-md-9" placeholder="Nome Produto">'
            codigoHTML+='<button onclick='+funcao2+' type="button" class="btn btn-light border border-dark col-md-3">'
                codigoHTML+='<span class="fas fa-search"></span> Buscar'
            codigoHTML+='</button>'
            codigoHTML+='<br/>'
            codigoHTML+='<button onclick='+funcao+' type="button" class="btn btn-light border border-dark btn-lg btn-block" style="margin-top:10px;">'
                codigoHTML+='<span class="fas fa-search-plus"></span> Exibir todos'
            codigoHTML+='</button>'
        codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<div id="resposta"></div>'

    document.getElementById(localizacao).innerHTML = codigoHTML;
}

// --------------------------------------------- SISTEMA DE ALERTAS -----------------------------------------------------

//funcao para gerar mensagem de erro
function mensagemDeErro(mensagem){
    document.getElementById('mensagemDeErro').innerHTML = '<span class="badge badge-danger h5">'+mensagem+'</span>';
    limparTelaDeMensagem();
}

//funcao para gerar mensagem de aviso
function mensagemDeAviso(mensagem){
    document.getElementById('mensagemDeErro').innerHTML = '<span class="badge badge-success h5">'+mensagem+'</span>';
    limparTelaDeMensagem();
}

//funcao para limpar tela de mensagens
function limparTelaDeMensagem(){
    setTimeout(function(){document.getElementById('mensagemDeErro').innerHTML=""},2000);
}


// --------------------------------------------- GERA GRAFICO - RELATORIO, RELATORIOCAIXA -----------------------------------------------------

// variaveis globais para manipulação de itens do grafico de itens vendidos
var vetorNomeIdItens=[], vetorQuantidadeItens=[], vetorNomeIdItensDefinitivo=[], vetorQuantidadeItensDefinitivo=[], marcadorDeIndiceDosVetoresDeItens=0;
var vetorLucroMensalData=[], vetorLucroMensalValor=[], marcadorDeIndiceDosVetoresDeLucro=0;


//funcao para gerar grafico com dados
function graficoDeDados(json,idLocalizacao){
    var dataAtual=new Date, ValorTotal=0, cont=0;

    while(json.data[cont]){
        ValorTotal=ValorTotal+json.data[cont].total;
        cont++;
    }

    Highcharts.chart(idLocalizacao,{
        chart:{
            type:'bar'
        },
        title:{
            text:'Valor total'
        },
        xAxis:{
            categories:['Data: '+dataAtual.getDate()+'/'+(dataAtual.getMonth()+1)+'/'+dataAtual.getFullYear()]
        },
        yAxis:{
            title:'Valor'
        },
        series:[{
            name:'Valor',
            data:[parseFloat(ValorTotal.toFixed(2))]
        }]
    });
}

//funcao para gerar grafico com dados dos produtos mais e menos vendidos
function graficoDeItensVendidos(json,idLocalizacao,json2,json3){
    var cont=0;

    vetorNomeIdItens=[]; 
    vetorQuantidadeItens=[]; 
    vetorNomeIdItensDefinitivo=[]; 
    vetorQuantidadeItensDefinitivo=[]; 
    marcadorDeIndiceDosVetoresDeItens=0;


    while(json.data[cont]){
        criarVetorComTodosOsItensDasOrdens(json.data[cont],1)
        criarVetorComTodosOsItensDasOrdens(json.data[cont],2)
        cont++;
    }

    marcadorDeIndiceDosVetoresDeItens=0;

    for(var cont1=0;cont1<vetorNomeIdItens.length;cont1++){
        verificarEOrdernarVetorDeItens(vetorNomeIdItens[cont1],vetorQuantidadeItens[cont1]);
    }

    for(var cont1=0; cont1<vetorNomeIdItensDefinitivo.length; cont1++){
        var cont2=0;
        while(json2.data[cont2]){
            if(json2.data[cont2]._id==vetorNomeIdItensDefinitivo[cont1]){
                vetorNomeIdItensDefinitivo[cont1]=json2.data[cont2].name;
            }
            cont2++;
        }
        cont2=0;
        while(json3.data[cont2]){
            if(json3.data[cont2]._id==vetorNomeIdItensDefinitivo[cont1]){
                vetorNomeIdItensDefinitivo[cont1]=json3.data[cont2].name;
            }
            cont2++;
        }
    }

    Highcharts.chart(idLocalizacao,{
        chart:{
            type:'bar'
        },
        title:{
            text:'Relatório de Itens Vendidos'
        },
        xAxis:{
            categories: vetorNomeIdItensDefinitivo
        },
        yAxis:{
            title:'Quantidade'
        },
        series:[{
            name:'Quantidade',
            data: vetorQuantidadeItensDefinitivo
        }]
    });
}

//funcao para gerar grafico com dados dos lucros de cada mes 
function graficoDeLucrosTotaisDeCadaMes(json,idLocalizacao){
    var cont=0;

    vetorLucroMensalData=[];
    vetorLucroMensalValor=[];
    marcadorDeIndiceDosVetoresDeLucro=0;

    while(json.data[cont]){
        var datah=json.data[cont].update_at;
        var dataFormat = datah.split("-");
        verificaEOrdenarVetorDeLucroMensal(dataFormat[0]+"/"+dataFormat[1],json.data[cont].total);
        cont++;
    }

    Highcharts.chart(idLocalizacao,{
        chart:{
            type:'bar'
        },
        title:{
            text:'Relatório de Lucros Mensais'
        },
        xAxis:{
            categories: vetorLucroMensalData
        },
        yAxis:{
            title:'Valor'
        },
        series:[{
            name:'Valor',
            data: vetorLucroMensalValor
        }]
    });
}

//funcao para verificar e ordernar vetor com itens em um novo vetor
function verificarEOrdernarVetorDeItens(id, quantidade){
    var verificacao=true;

    for(var cont=0; cont<vetorNomeIdItensDefinitivo.length; cont++){
        if(vetorNomeIdItensDefinitivo[cont]==id){
            vetorQuantidadeItensDefinitivo[cont]+=quantidade;
            verificacao=false;
        }
    }
    if(verificacao){
        vetorNomeIdItensDefinitivo[marcadorDeIndiceDosVetoresDeItens]=id;
        vetorQuantidadeItensDefinitivo[marcadorDeIndiceDosVetoresDeItens]=quantidade;
        marcadorDeIndiceDosVetoresDeItens++;
    }
}

//funcao para criar vetor com todos os itens das ordens
function criarVetorComTodosOsItensDasOrdens(json,tipo){
    var cont=0;

    if(tipo==1){
        while(json.products[cont]){
            vetorNomeIdItens[marcadorDeIndiceDosVetoresDeItens]=json.products[cont].product;
            vetorQuantidadeItens[marcadorDeIndiceDosVetoresDeItens]=json.products[cont].quantity;
            marcadorDeIndiceDosVetoresDeItens++;               
            cont++;
        }
    }else if(tipo==2){
        while(json.drinkables[cont]){
            vetorNomeIdItens[marcadorDeIndiceDosVetoresDeItens]=json.drinkables[cont].drinkable;
            vetorQuantidadeItens[marcadorDeIndiceDosVetoresDeItens]=json.drinkables[cont].quantity;
            marcadorDeIndiceDosVetoresDeItens++;
            cont++;
        }
    }
}

//funcao para verificar e ordenar vetos com os lucros mensais
function verificaEOrdenarVetorDeLucroMensal(data, valor){
    var verificacao=true;

    for(var cont=0; cont<vetorLucroMensalData.length; cont++){
        if(vetorLucroMensalData[cont]==data){
            vetorLucroMensalValor[cont]+=valor;
            verificacao=false;
        }
    }
    if(verificacao){
        vetorLucroMensalData[marcadorDeIndiceDosVetoresDeLucro]=data;
        vetorLucroMensalValor[marcadorDeIndiceDosVetoresDeLucro]=valor;
        marcadorDeIndiceDosVetoresDeLucro++;
    }

}

//funcao para gerar linha para a tabela com o pedidos fechados
function gerarLinhaTabelaRelatorios(json){
    var codigoHTML, listaProdutos="",cont=0;

    while(json.products[cont]){
        listaProdutos+="("+json.products[cont].product+" X "+json.products[cont].quantity+")";
        cont++;
    }
    cont=0;
    while(json.drinkables[cont]){
        listaProdutos+="("+json.drinkables[cont].drinkable+" X "+json.drinkables[cont].quantity+")";
        cont++;
    }

    codigoHTML='<tr class="table-light text-dark">'
        codigoHTML+='<td scope="col"><small>'+json.update_at+'</small></td>'
        codigoHTML+='<td scope="col"><small>'+json.identification+'</small></td>'
        codigoHTML+='<td scope="col"><small>'+listaProdutos+'</small></td>'
        codigoHTML+='<td scope="col"><small>'+json.payment+'</small></td>'
        codigoHTML+='<td scope="col"><small>R$'+json.total.toFixed(2)+'</small></td>'
    codigoHTML+='</tr>'

    return codigoHTML;
}

// --------------------------------------------- GERA TELA COM LISTA DE TODOS OS PEDIDOS - PAGAMENTO, PEDIDO -----------------------------------------------------

//funcao para exibir lista com todos os pedidos
async function telaEscopoExibirTodosOsPedidos(funcao){
    var json = await requisicaoGET("orders/");
    var codigoHTML, cont=0;
    
    codigoHTML='<h4 class="text-center" style="margin-top:30px">Lista de Pedidos</h4>'
    codigoHTML+='<table class="table table-light text-center" style="margin-top:50px">'
        codigoHTML+='<thead><tr><th scope="col">Número</th><th scope="col">Valor Total</th><th scope="col">Data</th><th scope="col">#</th></tr></thead>'
        codigoHTML+='<tbody>'
            while(json.data[cont]){
                codigoHTML+='<tr>'
                    codigoHTML+='<td>'+json.data[cont].identification+'</td>'
                    codigoHTML+='<td>R$ '+json.data[cont].total.toFixed(2)+'</td>'
                    codigoHTML+='<td>'+json.data[cont].update_at+'</td>'
                    codigoHTML+='<td><button class="btn btn-primary" onclick='+funcao+' value='+json.data[cont].identification+'><span class="fas fa-edit iconsTam"></span></button></td>'
                codigoHTML+='</tr>'
                cont++;
            }
        codigoHTML+='</tbody>'
    codigoHTML+='</table>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

// -------------------------------------------------- GERA TELA COM LISTA DE TODOS OS PEDIDOS EM ABERTO --------------------------------------------------------

//funcao para gerar linha para a tabela com o pedidos fechados
function gerarLinhaTabelaPedidosEmAberto(json){
    var codigoHTML, listaProdutos="",cont=0;

    while(json.products[cont]){
        listaProdutos+="("+json.products[cont].product.name+" X "+json.products[cont].quantity+")";
        cont++;
    }
    cont=0;
    while(json.drinkables[cont]){
        listaProdutos+="("+json.drinkables[cont].drinkable.name+" X "+json.drinkables[cont].quantity+")";
        cont++;
    }

    codigoHTML='<tr class="table-light text-dark">'
        codigoHTML+='<td scope="col"><small>'+json.identification+'</small></td>'
        codigoHTML+='<td scope="col"><small>'+listaProdutos+'</small></td>'
        codigoHTML+='<td scope="col"><small>R$'+json.total.toFixed(2)+'</small></td>'
    codigoHTML+='</tr>'

    return codigoHTML;
}