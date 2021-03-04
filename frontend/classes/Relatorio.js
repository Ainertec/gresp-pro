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
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center"><span class="fas fa-chart-line"></span> Relatórios</h4>
        <div class="col-6 mx-auto row" style="margin-top:20px;">
            <label for="dataInicial">Inicio</label>
            <input id="dataInicial" type="date" class="form-control form-control-sm" value="${new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}">
            <label for="dataFinal">Final</label>
            <input id="dataFinal" type="date" class="form-control form-control-sm" value="${new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()}">
        </div>
        <div class="col-6 mx-auto" style="margin-top:20px;">
            <button onclick="chamadaDeMetodosRelatorio();" class="btn btn-info btn-block btn-sm" style="margin-bottom:40px;">
                <span class="fas fa-search"></span> Buscar
            </button>
            <button onclick="imprimirRelatorioProdutoeOrders();" class="btn btn-warning btn-block btn-sm">
                <span class="fas fa-print"></span> Imprimir Relatório
            </button>
            <button onclick="confirmarAcao('Excluir relatórios com mais de 5 anos!', 'excluirRelatorioAutomaticamente();', null);" class="btn btn-danger btn-block btn-sm">
                <span class="fas fa-trash-alt"></span> Excluir relatórios antigos
            </button>
        </div>
    </div>

        <div id="grafico1" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="grafico2" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="grafico3" style="margin-top:20px;" class="col-12 rounded mx-auto d-block"></div>
        <div id="listaItens" style="margin-top:20px" class="col-12 rounded mx-auto d-block"></div>
        <div id="listaDadosGerais" style="margin-top:20px" class="col-12 rounded mx-auto d-block"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por chamar os metodos da classe relatorio
function chamadaDeMetodosRelatorio() {
    setTimeout(function () {
        gerarGraficoDemonstrativoVendaPorItem();
        gerarGraficoGanhoGastoMensal();
        gerarGraficoDemonstrativoVendaPorItem();
        gerarGraficoQuantidadeVendas();
        tabelaDeRelatorioCaixa();
        tabelaGeralDeRelatorios();
    }, 300)
}

//funcao responsasvel por gerar o relatorio de quantidade venda de produtos
async function gerarGraficoDemonstrativoVendaPorItem() {
    await aguardeCarregamento(true)
    let json = await requisicaoGET(`reports/products?initial=${document.getElementById('dataInicial').value}&final=${document.getElementById('dataFinal').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
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
            text: 'Demonstrativo de Montante Sobre Valor e Quantidade de Items Vendidos (Diário)'
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
                format: 'R$ {value} reais',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: 'Valor recebido',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                text: 'Quantidade vendida',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} unid.',
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
}

//funcao responsavel por gerar o relatorio de lucro mensal
async function gerarGraficoGanhoGastoMensal() {
    await aguardeCarregamento(true)
    let json = await requisicaoGET(`reports?initial=${document.getElementById('dataInicial').value}&final=${document.getElementById('dataFinal').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    Highcharts.chart('grafico2', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Demonstrativo de Valor Recebido (Período)'
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
    let json = await requisicaoGET(`reports/total?initial=${document.getElementById('dataInicial').value}&final=${document.getElementById('dataFinal').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
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
            text: 'Demonstrativo Quantitativo de Vendas (Período)'
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
        json = await requisicaoGET(`reports/orders?initial=${document.getElementById('dataInicial').value}&final=${document.getElementById('dataFinal').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)

        codigoHTML += `<h5>Lista de Pedidos Fechados no Período</h5>
            <table class="table table-dark table-bordered text-center">
                <thead class="thead-dark">
                    <tr>
                        <td scope="col"><small>Data e hora</small></td>
                        <td scope="col"><small>Identificação</small></td>
                        <td scope="col"><small>Lista itens</small></td>
                        <td scope="col"><small>Forma pagamento</small></td>
                        <td scope="col"><small>Custo</small></td>
                        <td scope="col"><small>Taxa Cartão</small></td>
                        <td scope="col"><small>serviço/gorjeta</small></td>
                        <td scope="col"><small>Valor</small></td>
                        <td scope="col"><small>Excluir</small></td>
                    </tr>
                </thead>
                <tbody>`

        for (let item of json.data) {
            codigoHTML += `<tr class="table-light text-dark">
                <td scope="col"><small><strong>${format(parseISO(item.order.updatedAt), 'dd/MM/yyyy HH:mm:ss')}</strong></small></td>
                <td scope="col"><small><strong>${item.order.identification}</strong></small></td>
                <td scope="col"><small>`
            for (let item2 of item.order.items) {
                codigoHTML += `(<strong>${item2.product.name}</strong> X ${item2.quantity}${item2.courtesy ? ' - <strong class="text-primary">Cortesia</strong>' : ''})`;
            }
            codigoHTML += `</small></td>
                    <td scope="col"><small><strong>${item.order.payment}</strong></small></td>
                    <td scope="col" class="text-danger"><small><strong>R$${(item.costTotal).toFixed(2)}</strong></small></td>
                    <td scope="col" class="text-danger"><small><strong>R$${item.order.cardfee? (item.order.cardfee).toFixed(2):'0.00'}</strong></small></td>
                    <td scope="col" class="text-danger"><small><strong>R$${item.order.tip? (item.order.tip).toFixed(2):'0.00'}</strong></small></td>
                    <td scope="col" class="text-danger"><small><strong>R$${(item.order.total).toFixed(2)}</strong></small></td>
                    <td scope="col">
                        <button class="btn btn-outline-danger btn-sm" onclick="confirmarAcao('Excluir relatório!', 'excluirUmRelatorio(this.value);', '${item.order._id}');" value=${item.identification}>
                            <span class="fas fa-trash-alt"></span>
                        </button>
                    </td>
                </tr>`
        }
        codigoHTML += `</tbody>
            </table>`

        document.getElementById('listaItens').innerHTML = codigoHTML;

    } catch (error) {

        document.getElementById('listaItens').innerHTML = 'Não foi possivel carregar a lista!' + error
    }
}

//funcao para gerar tabela com todos os pedidos registrados no caixa
async function tabelaGeralDeRelatorios() {
    let codigoHTML = ``;

    try {
        await aguardeCarregamento(true)
        let json = await requisicaoGET(`reports?initial=${document.getElementById('dataInicial').value}&final=${document.getElementById('dataFinal').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        let json2 = await requisicaoGET(`reports/coststock`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)

        codigoHTML += `<h5>Informações gerais</h5>
            <table class="table table-dark table-bordered text-center">
                <thead class="thead-dark">
                    <tr>
                        <td scope="col"><small>Informação</small></td>
                        <td scope="col"><small>Valor</small></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Valor recebido bruto(Período)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$${json.data.total}</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Receitas menos custos(Período)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$${json.data.netValue}</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Gastos com cortesia(Período)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$${json.data.totalCourtesy}</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Taxas de cartão(Período)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$${json.data.totalCardFee}</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Taxas de serviço/gorjeta(Período)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$${json.data.totalTip}</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Custos com pedidos(Período)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$${json.data.totalCost}</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Valor total em estoque(Total)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$${(json2.data).toFixed(2)}</strong></small></td>
                    </tr>
                </tbody>
            </table>`

        document.getElementById('listaDadosGerais').innerHTML = codigoHTML;

    } catch (error) {

        document.getElementById('listaDadosGerais').innerHTML = 'Não foi possivel carregar a lista!' + error
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

//funcao responsavel por apagar os relatorios com mais de 5 anos
async function excluirRelatorioAutomaticamente() {
    try {
        await aguardeCarregamento(true)
        await requisicaoDELETE(`reports`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
        mensagemDeAviso('Relatórios com mais de 5 anos excluidos com sucesso!')
    } catch (error) {
        mensagemDeErro('Não foi possível excluir os relatórios mais antigos!')
    }
}

//funcao responsavel por excluir um determinado relatorio
async function excluirUmRelatorio(id) {
    try {
        await aguardeCarregamento(true)
        await requisicaoDELETE(`reports/${id}`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
        mensagemDeAviso('Relatório excluido com sucesso!')
        await chamadaDeMetodosRelatorio();
    } catch (error) {
        mensagemDeErro('Não foi possível excluir o relatório!')
    }
}