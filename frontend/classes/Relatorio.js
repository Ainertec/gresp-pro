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
        <div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">
            <div class="row">
                <div class="col">
                    <h5 class="text-center">Data inicial</h5>
                    <div class="input-group mb-3">
                        <input id="dataInicio" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">
                    </div>
                </div>
                <div class="col">
                    <h5 class="text-center">Data final</h5>
                    <div class="input-group mb-3">
                        <input id="dataFim" type="date" class="form-control mousetrap" aria-label="Recipients username" aria-describedby="botaoBuscar">
                    </div>
                </div>
            </div>
            <div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">
                <button onclick="if(validaDadosCampo(['#dataInicio','#dataFim'])){gerarGraficoLucroMensal('visualizar'); gerarGraficoQuantidadeVendasMensal('visualizar'); tabelaDeRelatorioCaixa('visualizar');}else{mensagemDeErro('Informe um Periodo!'); mostrarCamposIncorrreto(['dataInicio','dataFim']);}" type="button" class="btn btn-outline-primary">
                    <span class="fas fa-search"></span> Relatórios periódicos
                </button>
                <button onclick="gerarGraficoLucroTotal(); gerarGraficoDemonstrativoVendaPorItem();" type="button" class="btn btn-outline-primary">
                    <span class="fas fa-search"></span> Relatórios completos
                </button>
            </div>
        </div>
    </div>

        <div id="grafico0" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="grafico1" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="grafico2" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="grafico3" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="listaItens" style="margin-top:20px" class="col-12 rounded mx-auto d-block"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por gerar o relatorio de lucro total
async function gerarGraficoLucroTotal() {
    await aguardeCarregamento(true)
    let json = await requisicaoGET('reports/all', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

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
    await aguardeCarregamento(true)
    let json = await requisicaoGET('reports/products', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)
    let result = [];

    for (let item of json.data) {
        result.push(JSON.parse(`{"name":"${item._id.name}","data":[${item.amount}]}`))
    }

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
    let json = null, vetorData = [], vetorTotal = [];

    if (tipo == 'impressao') {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`reports?initial=2020-01-01&final=${new Date().getFullYear()}-12-28`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    } else {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`reports?initial=${$('#dataInicio').val()}&final=${$('#dataFim').val()}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    }

    for (let item of json.data) {
        vetorTotal.push(parseFloat(item.amount))
        vetorData.push(`${item._id.month} / ${item._id.year}`)
    }

    Highcharts.chart('grafico2', {
        chart: {
            type: 'area',
            inverted: true
        },
        title: {
            text: 'Demostrativo de Lucro Mensal Arrecadado'
        },
        subtitle: {
            text: 'Este gráfico demostra o lucro mensal arrecadado pelo estabelecimento.'
        },
        accessibility: {
            keyboardNavigation: {
                seriesNavigation: {
                    mode: 'serialize'
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: vetorData
        },
        yAxis: {
            title: {
                text: 'Data'
            },
            allowDecimals: false,
            min: 0
        },
        plotOptions: {
            area: {
                fillOpacity: 0.5
            }
        },
        series: [{
            name: 'Valor Total',
            data: vetorTotal
        }]
    });

}

//funcao responsavel por gerar o grafico de quantidade de vendas por periodo
async function gerarGraficoQuantidadeVendasMensal(tipo) {
    let json = null, vetorData = [], vetorTotal = [];
    if (tipo == 'impressao') {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`reports/total?initial=2020-01-01&final=${new Date().getFullYear()}-12-28`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    } else {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`reports/total?initial=${$('#dataInicio').val()}&final=${$('#dataFim').val()}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    }

    for (let item of json.data) {
        vetorData.push((item._id.month + '/' + item._id.year).toString())
        vetorTotal.push(item.total)
    }

    Highcharts.chart('grafico3', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Demonstrativo Quantitativo de Vendas Mensal'
        },
        subtitle: {
            text: 'Gráfico responsavel por demostrar a quantidade total de vendas mensal.'
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
async function tabelaDeRelatorioCaixa(tipo) {
    let codigoHTML = '', json = null;

    try {
        if (tipo == 'impressao') {
            await aguardeCarregamento(true)
            json = await requisicaoGET(`reports/orders?initial=2020-01-01&final=${new Date().getFullYear()}-12-28`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false)
        } else {
            await aguardeCarregamento(true)
            json = await requisicaoGET(`reports/orders?initial=${$('#dataInicio').val()}&final=${$('#dataFim').val()}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false)
        }

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
        for (let item of json.data) {
            codigoHTML += '<tr class="table-light text-dark">'
            codigoHTML += `<td scope="col"><small>${(item.updatedAt).split(".")[0]}</small></td>`
            codigoHTML += `<td scope="col"><small>${item.identification}</small></td>`
            codigoHTML += `<td scope="col"><small>`
            for (let item2 of item.items) {
                codigoHTML += `(${item2.product.name} X ${item2.quantity})`;
            }
            codigoHTML += '</small></td>'
            codigoHTML += `<td scope="col"><small>${item.payment}</small></td>`
            codigoHTML += `<td scope="col"><small>R$${(item.total).toFixed(2)}</small></td>`
            codigoHTML += '</tr>'
        }
        codigoHTML += '</tbody>'
        codigoHTML += '</table>'

        document.getElementById('listaItens').innerHTML = codigoHTML;

    } catch (error) {

        document.getElementById('listaItens').innerHTML = 'Não foi possivel carregar a lista!' + error
    }
}