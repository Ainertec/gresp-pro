// --------------------------------------------- RELATÓRIO DE PRODUTOS E BEBIDAS -----------------------------------------------------

//funcao responsavel por fazer a ligação necessaria com a tela de relatorio
function ligacaoRelatorioFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador') {
        if (tipo == 'relatoriocaixa') {
            telaGerarRelatorioDeCaixa();
        } else if (tipo == 'produtosebebidas') {
            telaGerarRelatorioProdutoseBebidas();
        } else {
            telaGerarListaTodosOsPedidosAbertos();
        }
    } else if (JSON.parse(situacao).tipo == 'Comum') {
        if (tipo == 'pedidosabertos') {
            telaGerarListaTodosOsPedidosAbertos();
        }
    } else {
        mensagemDeErro('Usúario não autorizado!')
    }
}

// funcao relatorio produtos e bebidas
function telaGerarRelatorioProdutoseBebidas() {

    var codigoHTML = '';

    codigoHTML += '<div class="modal fade" id="modalRelatorioProdutoseBebidas" tabindex="-1" role="dialog" aria-labelledby="modalRelatorioPeB" aria-hidden="true">'
    codigoHTML += '<div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">'
    codigoHTML += '<div class="modal-content">'
    codigoHTML += '<div class="modal-header">'
    codigoHTML += '<h5 class="modal-title" id="modalRelatorioPeB">Relatório Produtos e Bebidas</h5>'
    codigoHTML += '<button onclick="imprimirImpressora(\'#relatorioProdutoseBebidas\'); setTimeout(function(){limparModal();},1000); $(\'#modalRelatorioProdutoseBebidas\').modal(\'hide\');" type="button" class="btn btn-primary" style="margin-left:10px;">'
    codigoHTML += 'Imprimir'
    codigoHTML += '</button>'
    codigoHTML += '<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
    codigoHTML += '<span aria-hidden="true">&times;</span>'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '<div id="relatorioProdutoseBebidas" class="modal-body">'
    codigoHTML += '<div class="text-center">'
    codigoHTML += '<h3>Relatório de Produtos e Bebidas</h3>'
    codigoHTML += '<div id="produtosebebidas"></div>'
    codigoHTML += '<hr style="margin-top:10px;">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    if (sessionStorage.getItem("login")) {
        document.getElementById('modal').innerHTML = codigoHTML;
        $('#modalRelatorioProdutoseBebidas').modal('show');
        telaRespostaRelatorioProdutoseBebidas();
    } else {
        telaAutenticacao();
    }
}

//funcao para gerar tela de resposta com todos os produtos e bebidas
async function telaRespostaRelatorioProdutoseBebidas() {
    let codigoHTML = '', json = await requisicaoGET("items", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });


    codigoHTML += `<table class="table table-dark table-bordered text-center table-sm">`
    codigoHTML += `<thead class="thead-dark">`
    codigoHTML += `<tr>`
    codigoHTML += `<td scope="col"><small>Nome</small></td>`
    codigoHTML += `<td scope="col"><small>Descrição</small></td>`
    codigoHTML += `<td scope="col"><small>Estoque</small></td>`
    codigoHTML += `<td scope="col"><small>Preço</small></td>`
    codigoHTML += `</tr>`
    codigoHTML += `</thead>`
    codigoHTML += `<tbody>`
    codigoHTML += `<tr class="table-primary text-dark"><td colspan="4">Produtos</td></tr>`

    json.data.forEach(function (item) {
        if (!item.drink) {
            codigoHTML += `<tr class="table-light text-dark">`
            codigoHTML += `<td scope="col"><small>${corrigirTamanhoString(20, item.name)}</small></td>`
            codigoHTML += `<td scope="col"><small>${corrigirTamanhoString(40, item.description)}</small></td>`
            codigoHTML += `<td scope="col"><small>${item.stock}</small></td>`
            codigoHTML += `<td scope="col"><small>R$${(item.price).toFixed(2)}</small></td>`
            codigoHTML += `</tr>`
        }
    });

    codigoHTML += `<tr class="table-primary text-dark"><td colspan="4">Bebidas</td></tr>`

    json.data.forEach(function (item) {
        if (item.drink) {
            codigoHTML += `<tr class="table-light text-dark">`
            codigoHTML += `<td scope="col"><small>${corrigirTamanhoString(20, item.name)}</small></td>`
            codigoHTML += `<td scope="col"><small>${corrigirTamanhoString(40, item.description)}</small></td>`
            codigoHTML += `<td scope="col"><small>${item.stock}</small></td>`
            codigoHTML += `<td scope="col"><small>R$${(item.price).toFixed(2)}</small></td>`
            codigoHTML += `</tr>`
        }
    });

    codigoHTML += `</tbody>`
    codigoHTML += `</table>`


    document.getElementById('produtosebebidas').innerHTML = codigoHTML;
}

// --------------------------------------------- RELATÓRIO DE CAIXA -----------------------------------------------------

//funcao gerar relatorio de caixa
function telaGerarRelatorioDeCaixa() {
    var codigoHTML = '';

    codigoHTML += '<div class="modal fade" id="modalRelatorioDeCaixa" tabindex="-1" role="dialog" aria-labelledby="modalRelatorioC" aria-hidden="true">'
    codigoHTML += '<div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">'
    codigoHTML += '<div class="modal-content">'
    codigoHTML += '<div class="modal-header">'
    codigoHTML += '<h5 class="modal-title" id="modalRelatorioC">Relatório de Caixa</h5>'
    codigoHTML += '<button onclick="imprimirImpressora(\'#relatorioCaixa\'); setTimeout(function(){limparModal();},1000); $(\'#modalRelatorioDeCaixa\').modal(\'hide\');" type="button" class="btn btn-primary" style="margin-left:10px;">'
    codigoHTML += 'Imprimir'
    codigoHTML += '</button>'
    codigoHTML += '<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
    codigoHTML += '<span aria-hidden="true">&times;</span>'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '<div id="relatorioCaixa" class="modal-body">'
    codigoHTML += '<div class="text-center">'
    codigoHTML += '<h3>Relatório de caixa</h3>'
    codigoHTML += '<div id="grafico0"></div>'
    codigoHTML += '<div id="grafico1"></div>'
    codigoHTML += '<div id="grafico2"></div>'
    codigoHTML += '<div id="lista"></div>'
    codigoHTML += '<hr style="margin-top:10px;">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    if (sessionStorage.getItem("login")) {
        document.getElementById('modal').innerHTML = codigoHTML;
        $('#modalRelatorioDeCaixa').modal('show');
        telaRespostaRelatorioDeCaixa();
    } else {
        telaAutenticacao();
    }
}

//funcao para gerar tela de resposta com todos os pedidos fechados
async function telaRespostaRelatorioDeCaixa() {
    //let json = await requisicaoGET("logs_by_month/"), codigoHTML = '';

    gerarGraficoLucroTotal();

    gerarGraficoDemonstrativoVendaPorItem();

    gerarGraficoLucroMensal('impressao');


    /*codigoHTML += '<table class="table table-dark table-bordered text-center">'
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
            codigoHTML += `(${item2.product} X ${item2.quantity})`
        });
        item.drinkables.forEach(function (item2) {
            codigoHTML += `(${item2.drinkable} X ${item2.quantity})`
        });
        codigoHTML += `</small></td>`
        codigoHTML += `<td scope="col"><small>${item.payment}</small></td>`
        codigoHTML += `<td scope="col"><small>R$ ${(item.total).toFixed(2)}</small></td>`
        codigoHTML += '</tr>'
    });
    codigoHTML += '</tbody>'
    codigoHTML += '</table>'

    document.getElementById('lista').innerHTML = codigoHTML;*/

}

// --------------------------------------------- RELATÓRIO DE PEDIDOS EM ABERTO -----------------------------------------------------

//funcao gerar relatorio de pedidos em aberto
function telaGerarListaTodosOsPedidosAbertos() {
    var codigoHTML = '';

    codigoHTML += '<div class="modal fade" id="modalListaTodosProdutosAbertos" tabindex="-1" role="dialog" aria-labelledby="modalListaP" aria-hidden="true">'
    codigoHTML += '<div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">'
    codigoHTML += '<div class="modal-content">'
    codigoHTML += '<div class="modal-header">'
    codigoHTML += '<h5 class="modal-title" id="modalListaP">Lista Pedidos Abertos</h5>'
    codigoHTML += '<button onclick="imprimirImpressora(\'#listaTodosPedidos\'); setTimeout(function(){limparModal();},1000); $(\'#modalListaTodosProdutosAbertos\').modal(\'hide\');" type="button" class="btn btn-primary" style="margin-left:10px;">'
    codigoHTML += 'Imprimir'
    codigoHTML += '</button>'
    codigoHTML += '<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
    codigoHTML += '<span aria-hidden="true">&times;</span>'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '<div id="listaTodosPedidos" class="modal-body">'
    codigoHTML += '<div class="text-center">'
    codigoHTML += '<h3>Pedidos em Aberto</h3>'
    codigoHTML += '<div id="lista"></div>'
    codigoHTML += '<hr style="margin-top:10px;">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'


    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalListaTodosProdutosAbertos').modal('show');
    telaRespostaListaTodosOsPedidosAbertos();
}

//funcao para gerar tela de resposta com lista de todos os pedidos em aberto
async function telaRespostaListaTodosOsPedidosAbertos() {
    let json = await requisicaoGET("orders", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }), codigoHTML = ``;

    codigoHTML += `<table class="table table-dark table-bordered text-center">`
    codigoHTML += `<thead class="thead-dark">`
    codigoHTML += `<tr>`
    codigoHTML += `<td scope="col"><small>Identificação</small></td>`
    codigoHTML += `<td scope="col"><small>Lista itens por Nome</small></td>`
    codigoHTML += `<td scope="col"><small>Valor</small></td>`
    codigoHTML += `</tr>`
    codigoHTML += `</thead>`
    codigoHTML += `<tbody>`

    json.data.forEach(function (item) {
        codigoHTML += `<tr class="table-light text-dark">`
        codigoHTML += `<td scope="col"><small>${item.identification}</small></td>`
        codigoHTML += `<td scope="col"><small>`
        item.items.forEach(function (item2) {
            codigoHTML += `( ${corrigirTamanhoString(20, item2.product.name)} X ${item2.quantity} )`
        });
        codigoHTML += `</small></td>`
        codigoHTML += `<td scope="col"><small>R$${(item.total).toFixed(2)}</small></td>`
        codigoHTML += `</tr>`
    });

    codigoHTML += `</tbody>`
    codigoHTML += `</table>`

    document.getElementById('lista').innerHTML = codigoHTML;

}

// ----------------------------------------------------- Gerar QrCode ---------------------------------------------------

// funcao para gerar o QR code
function telaGerarQRCode(numero, tipo) {

    var vetorDeRandomico = [];

    if (tipo == 'random') {
        for (var cont = 0; cont < numero; cont++) {
            vetorDeRandomico.push(Math.floor(Math.random() * (2019123 - 200000000)) + 200000000);
        }
    } else {
        vetorDeRandomico.push(parseInt(numero));
    }

    var codigoHTML = '';

    codigoHTML += '<div>'
    codigoHTML += '<a class="text-dark" href="home.html">Voltar</a>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="text-center container">'

    for (var cont = 0; cont < vetorDeRandomico[cont]; cont += 2) {
        codigoHTML += '<hr style="bg-light; size:30px">'
        codigoHTML += '<div class="row">'
        codigoHTML += '<div class="col-sm">'
        codigoHTML += '<img src="logo.png" class="rounded mx-auto d-block" style="width: 350px; margin-top: 225px;" align="middle">'
        codigoHTML += '<h1 class="text-dark" style="margin-top: 250px;">' + vetorDeRandomico[cont] + '</h1>'
        codigoHTML += '<div class="qrcode rounded mx-auto d-block" id="qr' + cont + '" style="margin-top: 30px;" align="middle">'
        codigoHTML += '</div>'
        codigoHTML += '</div>'
        if (vetorDeRandomico[cont + 1]) {
            codigoHTML += '<div class="col-sm">'
            codigoHTML += '<img src="logo.png" class="rounded mx-auto d-block" style="width: 350px; margin-top: 225px;" align="middle">'
            codigoHTML += '<h1 class="text-dark" style="margin-top: 250px;">' + vetorDeRandomico[cont + 1] + '</h1>'
            codigoHTML += '<div class="qrcode rounded mx-auto d-block" id="qr' + (cont + 1) + '" style="margin-top: 30px;" align="middle">'
            codigoHTML += '</div>'
            codigoHTML += '</div>'
        }
        codigoHTML += '</div>'
        codigoHTML += '<hr style="margin-top: 580px; bg-light; size:30px">'
    }

    codigoHTML += '</div>'

    document.getElementById('navbarTotal').innerHTML = "";
    document.getElementById('janelaTotal').innerHTML = codigoHTML;

    for (var cont = 0; cont < vetorDeRandomico[cont]; cont++) {
        new QRCode("qr" + cont, {
            text: "" + vetorDeRandomico[cont] + "",
            width: 256,
            height: 256,
            colorDark: "black",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    setTimeout(function () { window.print(); }, 1000);

}