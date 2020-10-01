// --------------------------------------------- Classe Relatorio -----------------------------------------------------

//funcao responsavel por fazer a ligação necessaria com a tela de relatorio de caixa
async function ligacaoRelatorioCaixaFacede() {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador') {
        telaRelatorioDeCaixa();
        await aguardeCarregamento(true)
        await requisicaoDELETE(`reports`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

//funcao para gerar tela de busca de relatorio de caixa
function telaRelatorioDeCaixa() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center"><span class="fas fa-chart-line"></span> Relatórios</h4>
        <div class="col-6 mx-auto" style="margin-top:20px;">
            <button onclick="imprimirRelatorioProdutoeOrders();" class="btn btn-warning btn-block btn-sm">
                <span class="fas fa-print"></span> Imprimir Relatório
            </button>
        </div>
    </div>

        <div id="grafico1" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="grafico2" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="grafico3" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="listaItens" style="margin-top:20px" class="col-12 rounded mx-auto d-block"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;

    setTimeout(function () {
        gerarGraficoDemonstrativoVendaPorItem();
        gerarGraficoGanhoGastoMensal();
        gerarGraficoQuantidadeVendas();
        gerarGraficoDemonstrativoVendaPorItem();
        tabelaDeRelatorioCaixa();
    }, 300)
}

//funcao responsasvel por gerar o relatorio de quantidade venda de produtos
async function gerarGraficoDemonstrativoVendaPorItem() {
    await aguardeCarregamento(true)
    let json = await requisicaoGET('reports/products', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)
    let vetorNome = [], vetorQuantidade = [], vetorValor = [];

    for (let item of json.data) {
        vetorNome.push(item._id.name)
        vetorQuantidade.push(item.amount)
        vetorValor.push(parseFloat((item.soldout).toFixed(1)))
    }

    Highcharts.chart('grafico1', {
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Demonstrativo de Montante Sobre Valor e Quantidade de Items Vendidos'
        },
        subtitle: {
            text: 'Este gráfico demonstra o montante de valor recebido e a quantidade total vendida de cada item.'
        },
        xAxis: [{
            categories: vetorNome,
            crosshair: true
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value} unid.',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Quantidade vendida',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Valor recebido',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: 'R$ {value} reais',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)'
        },
        series: [{
            name: 'Quantidade vendida',
            type: 'column',
            yAxis: 1,
            data: vetorQuantidade,
            tooltip: {
                valueSuffix: ' unid.'
            }

        }, {
            name: 'Valor recebido',
            type: 'spline',
            data: vetorValor,
            tooltip: {
                valueSuffix: ' reais'
            }
        }]
    });

    /* Highcharts.chart('grafico1', {
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
     });*/
}

//funcao responsavel por gerar o relatorio de lucro mensal
async function gerarGraficoGanhoGastoMensal() {
    await aguardeCarregamento(true)
    let json = await requisicaoGET(`reports`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    Highcharts.chart('grafico2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Demonstrativo de Valor Recebido'
        },
        subtitle: {
            text: 'Este gráfico demonstra a relação entre o valor total recebido, o valor total menos os descontos por gastos do produto e os gastos referentes a cortesia.'
        },
        xAxis: {
            categories: [
                `${new Date()}`,
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Reais (R$)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>R$ {point.y:.2f} (Reais)</b></td></tr>',
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
            name: 'Valor total',
            data: [parseFloat(json.data.total)]

        }, {
            name: 'Valor com descontos',
            data: [parseFloat(json.data.netValue)]

        }, {
            name: 'Gastos com Cortesia',
            data: [parseFloat(json.data.totalCourtesy)]

        },]
    });


}

//funcao responsavel por gerar o grafico de quantidade de vendas por periodo
async function gerarGraficoQuantidadeVendas() {
    let vetorData = [], vetorTotal = [];

    await aguardeCarregamento(true)
    let dia = new Date().getDate(),
        mes = new Date().getMonth() + 1,
        ano = new Date().getFullYear();
    let json = await requisicaoGET(`reports/total?initial=${ano}-${mes > 9 ? mes : '0' + mes}-${dia > 9 ? dia : '0' + dia}&final=${ano}-${mes > 9 ? mes : '0' + mes}-${dia > 9 ? dia + 1 : '0' + (dia + 1)}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    for (let item of json.data) {
        vetorData.push((item._id.month + '/' + item._id.year).toString())
        vetorTotal.push(item.total)
    }

    Highcharts.chart('grafico3', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Demonstrativo Quantitativo de Vendas Diárias'
        },
        subtitle: {
            text: 'Gráfico responsavel por demostrar a quantidade total de vendas do dia.'
        },
        xAxis: {
            categories: vetorData
        },
        yAxis: {
            title: {
                text: 'Quantidade (Unid.)'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: 'Quantidade',
            data: vetorTotal
        }]
    });
}

//funcao para gerar tabela com todos os pedidos registrados no caixa
async function tabelaDeRelatorioCaixa() {
    let codigoHTML = ``, json = null;

    try {
        await aguardeCarregamento(true)
        let dia = new Date().getDate(),
            mes = new Date().getMonth() + 1,
            ano = new Date().getFullYear();
        json = await requisicaoGET(`reports/orders?initial=${ano}-${mes > 9 ? mes : '0' + mes}-${dia > 9 ? dia : '0' + dia}&final=${ano}-${mes > 9 ? mes : '0' + mes}-${dia > 9 ? dia + 1 : '0' + (dia + 1)}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)

        codigoHTML += `<h5>Lista de Pedidos Fechados do Dia</h5>
            <table class="table table-dark table-bordered text-center">
                <thead class="thead-dark">
                    <tr>
                        <td scope="col"><small>Data e hora</small></td>
                        <td scope="col"><small>Identificação</small></td>
                        <td scope="col"><small>Lista itens</small></td>
                        <td scope="col"><small>Forma pagamento</small></td>
                        <td scope="col"><small>Valor</small></td>
                    </tr>
                </thead>
                <tbody>`

        for (let item of json.data) {
            codigoHTML += `<tr class="table-light text-dark">
                <td scope="col"><small><strong>${format(parseISO(item.updatedAt), 'dd/MM/yyyy HH:mm:ss')}</strong></small></td>
                <td scope="col"><small><strong>${item.identification}</strong></small></td>
                <td scope="col"><small>`
            for (let item2 of item.items) {
                codigoHTML += `(<strong>${item2.product.name}</strong> X ${item2.quantity}${item2.courtesy ? ' - <strong class="text-primary">Cortesia</strong>' : ''})`;
            }
            codigoHTML += `</small></td>
                    <td scope="col"><small><strong>${item.payment}</strong></small></td>
                    <td scope="col" class="text-danger"><small><strong>R$${(item.total).toFixed(2)}</strong></small></td>
                </tr>`
        }
        codigoHTML += `</tbody>
            </table>`

        document.getElementById('listaItens').innerHTML = codigoHTML;

    } catch (error) {

        document.getElementById('listaItens').innerHTML = 'Não foi possivel carregar a lista!' + error
    }
}

//funcao responsavel por imprimir o relatorio geral
async function imprimirRelatorioProdutoeOrders() {
    try {
        await aguardeCarregamento(true)
        await requisicaoGET(`printer/orders`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await requisicaoGET(`printer/products`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    } catch (error) {
        await aguardeCarregamento(false)
    }
}