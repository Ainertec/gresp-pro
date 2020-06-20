// --------------------------------------------- Classe Relatorio -----------------------------------------------------

//funcao responsavel por fazer a ligação necessaria com a tela de relatorio de caixa
function ligacaoRelatorioCaixaFacede() {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador') {
        telaRelatorioDeCaixa();
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

//funcao para gerar tela de busca de relatorio de caixa
function telaRelatorioDeCaixa() {
    let codigoHTML = '';

    codigoHTML += '<h3 class="text-center">Relatórios</h3>'
    codigoHTML +=
        '<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col">'
    codigoHTML += '<h5 class="text-center">Data inicial</h5>'
    codigoHTML += '<div class="input-group mb-3">'
    codigoHTML +=
        '<input id="dataInicio" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="col">'
    codigoHTML += '<h5 class="text-center">Data final</h5>'
    codigoHTML += '<div class="input-group mb-3">'
    codigoHTML +=
        '<input id="dataFim" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML +=
        '<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
    codigoHTML +=
        `<button onclick="if(validaDadosCampo(['#dataInicio','#dataFim'])){gerarGraficoLucroMensal('visualizar'); tabelaDeRelatorioCaixa();}else{mensagemDeErro('Informe um Periodo!'); mostrarCamposIncorrreto(['dataInicio','dataFim']);}" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Relatórios periódicos</button>`
    codigoHTML +=
        '<button onclick="gerarGraficoLucroTotal(); gerarGraficoDemonstrativoVendaPorItem();" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Relatórios completos</button>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'


    codigoHTML += '<div id="grafico0" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML += '<div id="grafico1" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML += '<div id="grafico2" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML += '<div id="listaItens" style="margin-top:20px" class="col-12 rounded mx-auto d-block"></div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o relatorio de lucro total
async function gerarGraficoLucroTotal() {
    let json = await requisicaoGET('reports/all', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });

    json.data.total = parseFloat(json.data.total)

    Highcharts.chart('grafico0', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Demostrativo de Lucro Total Arrecadado'
        },
        subtitle: {
            text: 'Este gráfico demostra o lucro total arrecado pelo estabelecimento.'
        },
        xAxis: {
            categories: ['Lucro Total'],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valos R$ (x.xx)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' reais'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Valor total',
            data: [json.data.total]
        }]
    });
}

//funcao responsasvel por gerar o relatorio de quantidade venda de produtos
async function gerarGraficoDemonstrativoVendaPorItem() {
    let json = await requisicaoGET('reports/products', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    let result = [];

    json.data.forEach(function (item) {
        result.push(JSON.parse(`{"name":"${item._id.name}","data":[${item.soldout}]}`))
    });

    Highcharts.chart('grafico1', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Demonstrativo de Relação de Venda de Produtos e Bebidas'
        },
        subtitle: {
            text: 'Este gráfico demostra a quantidade vendida de cada item.'
        },
        xAxis: {
            categories: [
                'Items'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Quantidade (Unid.)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f} unid.</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: result
    });
}

//funcao responsavel por gerar o relatorio de lucro mensal
async function gerarGraficoLucroMensal(tipo) {
    let json = null;
    if (tipo == 'impressao') {
        json = await requisicaoGET(`reports?initial=2020-01-01&final=${new Date().getFullYear()}-0${new Date().getMonth() + 1}-28`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        console.log(json)
    } else {
        json = await requisicaoGET(`reports?initial=${$('#dataInicio').val()}&final=${$('#dataFim').val()}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    }

    Highcharts.chart('grafico2', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Demostrativo de Lucro Mensal Arrecadado'
        },
        subtitle: {
            text: 'Este gráfico demostra o lucro mensal arrecadado pelo estabelecimento.'
        },
        xAxis: {
            categories: [json.data[0]._id.month + '/' + json.data[0]._id.year],
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Valos R$ (x.xx)',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ' reais'
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -40,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Valor total',
            data: [json.data[0].amount]
        }]
    });
}

//funcao para gerar tabela com todos os pedidos registrados no caixa
async function tabelaDeRelatorioCaixa() {
    /* let codigoHTML = '', json = await requisicaoGET('logs/?date=2020-06', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
 
     codigoHTML += '<h5>Lista de Pedidos Fechados</h5>'
     codigoHTML += '<table class="table table-dark table-bordered text-center">'
     codigoHTML += '<thead class="thead-dark">'
     codigoHTML += '<tr>'
     codigoHTML += '<td scope="col"><small>Data</small></td>'
     codigoHTML += '<td scope="col"><small>Identificação</small></td>'
     codigoHTML += '<td scope="col"><small>Lista itens por ID</small></td>'
     codigoHTML += '<td scope="col"><small>Forma pagamento</small></td>'
     codigoHTML += '<td scope="col"><small>Valor</small></td>'
     codigoHTML += '</tr>'
     codigoHTML += '</thead>'
     codigoHTML += '<tbody>'
     json.data.forEach(function (item) {
         codigoHTML += '<tr class="table-light text-dark">'
         codigoHTML += `<td scope="col"><small>${item.update_at}</small></td>`
         codigoHTML += `<td scope="col"><small>${item.identification}</small></td>`
         codigoHTML += `<td scope="col"><small>`
         item.products.forEach(function (item2) {
             codigoHTML += `(${item2.product} X ${item2.quantity})`;
         });
 
         item.drinkables.forEach(function (item2) {
             codigoHTML += `(${item2.drinkable} X ${item2.quantity})`;
         });
         codigoHTML += '</small></td>'
         codigoHTML += `<td scope="col"><small>${item.payment}</small></td>`
         codigoHTML += `<td scope="col"><small>R$${(item.total).toFixed(2)}</small></td>`
         codigoHTML += '</tr>'
     });
     codigoHTML += '</tbody>'
     codigoHTML += '</table>'
 
     document.getElementById('listaItens').innerHTML = codigoHTML;*/
}