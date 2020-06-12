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
    var codigoHTML = '';

    codigoHTML += '<h4 class="text-center">Buscar</h4>'
    codigoHTML += '<div class="card-deck col-8 mx-auto d-block">'
    codigoHTML += '<div class="input-group mb-3">'
    codigoHTML += '<input id="dataPeriodo" type="month" class="form-control mousetrap" placeholder="Número Pedido">'
    codigoHTML += `<button onclick="if(validaDadosCampo(['#dataPeriodo'])){gerarGraficoLucroTotal(); gerarGraficoDemonstrativoVendaPorItem(); gerarGraficoLucroMensal(); tabelaDeRelatorioCaixa();}else{mensagemDeErro('Informe um Periodo!'); mostrarCamposIncorrreto(['dataPeriodo']);}" type="button" class="btn btn-outline-info">`
    codigoHTML += '<span class="fas fa-search"></span> Buscar Relatório'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<hr class="my-6 bg-dark">'
    codigoHTML += '<div id="grafico0" style="margin-top:10px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML += '<hr class="my-6 bg-dark">'
    codigoHTML += '<div id="grafico1" style="margin-top:10px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML += '<hr class="my-6 bg-dark">'
    codigoHTML += '<div id="grafico2" style="margin-top:10px;" class="col-12 rounded mx-auto d-block"></div>'
    codigoHTML += '<hr class="my-6 bg-dark">'
    codigoHTML += '<h5>Lista de Pedidos Fechados</h5>'
    codigoHTML += '<div id="listaItens" style="margin-top:10px" class="col-12 rounded mx-auto d-block"></div>'



    if (sessionStorage.getItem("login")) {
        document.getElementById('janela2').innerHTML = codigoHTML;
    } else {
        telaAutenticacao();
    }
}

//funcao para gerar tabela com todos os pedidos registrados no caixa
async function tabelaDeRelatorioCaixa() {
    var codigoHTML = '', json = await requisicaoGET('logs/?date=2020-06');

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

    document.getElementById('listaItens').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o relatorio de lucro total
function gerarGraficoLucroTotal() {
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
            data: [1000.00]
        }]
    });
}

//funcao responsasvel por gerar o relatorio de quantidade venda de produtos
function gerarGraficoDemonstrativoVendaPorItem() {
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
        series: [{
            name: 'Batata frita',
            data: [49]

        }, {
            name: 'Suco de uva',
            data: [83]

        }]
    });
}

//funcao responsavel por gerar o relatorio de lucro mensal
function gerarGraficoLucroMensal() {
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
            categories: ['2020-06'],
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
            data: [1000.00]
        }]
    });
}