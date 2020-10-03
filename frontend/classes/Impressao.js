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
        } else {
            mensagemDeErro('Usúario não autorizado!')
        }
    } else {
        mensagemDeErro('Usúario não autorizado!')
    }
}

// --------------------------------------------- RELATÓRIO DE PRODUTOS E BEBIDAS -----------------------------------------------------

// funcao relatorio produtos e bebidas
function telaGerarRelatorioProdutoseBebidas() {

    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalRelatorioProdutoseBebidas" tabindex="-1" role="dialog" aria-labelledby="modalRelatorioPeB" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalRelatorioPeB">Relatório Produtos e Bebidas</h5>
                    <button onclick="imprimirImpressora('relatorioProdutoseBebidas'); $('modalRelatorioProdutoseBebidas').modal('hide');" type="button" class="btn btn-primary" style="margin-left:10px;">
                        Imprimir
                    </button>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="relatorioProdutoseBebidas" class="modal-body">
                    <div class="text-center">
                        <h3>Relatório de Produtos e Bebidas</h3>
                        <div id="produtosebebidas"></div>
                            <hr style="margin-top:10px;">
                    </div>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalRelatorioProdutoseBebidas').modal('show');
    telaRespostaRelatorioProdutoseBebidas();

}

//funcao para gerar tela de resposta com todos os produtos e bebidas
async function telaRespostaRelatorioProdutoseBebidas() {
    await aguardeCarregamento(true)
    let codigoHTML = ``, json = await requisicaoGET(`items`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }),
        json2 = await requisicaoGET(`ingredients`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)


    codigoHTML += `<table class="table table-dark table-bordered text-center table-sm">
        <thead class="thead-dark">
            <tr>
                <td scope="col"><small>Nome</small></td>
                <td scope="col"><small>Descrição</small></td>
                <td scope="col"><small>Estoque</small></td>
                <td scope="col"><small>Preço</small></td>
            </tr>
        </thead>
        <tbody>
            <tr class="table-primary text-dark">
                <td colspan="4">Produtos</td>
            </tr>`

    for (let item of json.data) {
        codigoHTML += `<tr class="table-light text-dark">
            <td scope="col"><small>${corrigirTamanhoString(20, item.name)}</small></td>
            <td scope="col"><small>${corrigirTamanhoString(40, item.description)}</small></td>
            <td scope="col"><small>${item.stock ? item.stock + ' unid.' : 'Ingredientes'}</small></td>
            <td scope="col"><small>R$${(item.price).toFixed(2)}</small></td>
        </tr>`
    }

    codigoHTML += `<tr class="table-primary text-dark">
        <td colspan="4">Ingredientes</td>
    </tr>`

    for (let item of json2.data) {
        codigoHTML += `<tr class="table-light text-dark">
            <td scope="col"><small>${corrigirTamanhoString(20, item.name)}</small></td>
            <td scope="col"><small>${corrigirTamanhoString(40, item.description)}</small></td>
            <td scope="col"><small>${item.stock} ${item.unit == 'u' ? 'unid.' : item.unit}</small></td>
            <td scope="col"><small>R$${(item.price).toFixed(2)}</small></td>
        </tr>`
    }

    codigoHTML += `</tbody>
    </table>`

    document.getElementById('produtosebebidas').innerHTML = codigoHTML;
}

// --------------------------------------------- RELATÓRIO DE CAIXA -----------------------------------------------------

//funcao gerar relatorio de caixa
function telaGerarRelatorioDeCaixa() {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalRelatorioDeCaixa" tabindex="-1" role="dialog" aria-labelledby="modalRelatorioC" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalRelatorioC">Relatório de Caixa</h5>
                    <button onclick="imprimirImpressora('relatorioCaixa'); $('modalRelatorioDeCaixa').modal('hide');" type="button" class="btn btn-primary" style="margin-left:10px;">
                        Imprimir
                    </button>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="relatorioCaixa" class="modal-body">
                    <div class="text-center">
                        <h3>Relatório de caixa</h3>
                        <div id="grafico1"></div>
                        <div id="grafico2"></div>
                        <div id="grafico3"></div>
                        <div id="listaItens"></div>
                        <hr style="margin-top:10px;">
                    </div>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalRelatorioDeCaixa').modal('show');
    telaRespostaRelatorioDeCaixa();

}

//funcao para gerar tela de resposta com todos os pedidos fechados
async function telaRespostaRelatorioDeCaixa() {

    await aguardeCarregamento(true)

    await gerarGraficoDemonstrativoVendaPorItem();
    await gerarGraficoGanhoGastoMensal();
    await gerarGraficoQuantidadeVendas();
    await gerarGraficoDemonstrativoVendaPorItem();
    await tabelaDeRelatorioCaixa();

    await aguardeCarregamento(false)

}

// --------------------------------------------- RELATÓRIO DE PEDIDOS EM ABERTO -----------------------------------------------------

//funcao gerar relatorio de pedidos em aberto
function telaGerarListaTodosOsPedidosAbertos() {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalListaTodosProdutosAbertos" tabindex="-1" role="dialog" aria-labelledby="modalListaP" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalListaP">Lista Pedidos Abertos</h5>
                    <button onclick="imprimirImpressora('listaTodosPedidos'); $('#modalListaTodosProdutosAbertos').modal('hide');" type="button" class="btn btn-primary" style="margin-left:10px;">
                        Imprimir
                    </button>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div id="listaTodosPedidos" class="modal-body">
                    <div class="text-center">
                        <h3>Pedidos em Aberto</h3>
                        <div id="lista"></div>
                        <hr style="margin-top:10px;">
                    </div>
                </div>
            </div>
        </div>
    </div>`


    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalListaTodosProdutosAbertos').modal('show');
    telaRespostaListaTodosOsPedidosAbertos();
}

//funcao para gerar tela de resposta com lista de todos os pedidos em aberto
async function telaRespostaListaTodosOsPedidosAbertos() {
    await aguardeCarregamento(true)
    let json = await requisicaoGET(`orders`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }), codigoHTML = ``;
    await aguardeCarregamento(false)

    codigoHTML += `<table class="table table-dark table-bordered text-center">
        <thead class="thead-dark">
            <tr>
                <td scope="col"><small>Identificação</small></td>
                <td scope="col"><small>Lista itens por Nome</small></td>
                <td scope="col"><small>Valor total</small></td>
            </tr>
        </thead>
        <tbody>`

    for (let item of json.data) {
        codigoHTML += `<tr class="table-light text-dark">
            <td scope="col"><small>${item.identification}</small></td>
            <td scope="col"><small>`

        for (let item2 of item.items) {
            codigoHTML += `( ${corrigirTamanhoString(20, item2.product.name)} X ${item2.quantity} )`
        }
        codigoHTML += `</small></td>
            <td scope="col"><small>R$${(item.total).toFixed(2)}</small></td>
        </tr>`
    }

    codigoHTML += `</tbody>
        </table>`

    document.getElementById('lista').innerHTML = codigoHTML;

}

// ----------------------------------------------------- Gerar QrCode ---------------------------------------------------

//funcao responsavel por gerar o modal de dados referentes a impressão da comanda QRCode
function modalImpressaoComandaQrcode(aleatorio) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modalimpressaoComanda">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-clipboard-list"></span> Gerar comanda QRCode</h5>
                    <button onclick="imprimirImpressora('bodyMoadalImpressaoComanda');" type="button" class="btn btn-primary" style="margin-left:10px;">
                        Imprimir
                    </button>
                    <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                <div class="modal-body" id="bodyMoadalImpressaoComanda">
                    <div class="col-8 mx-auto">
                        <h5 class="text-center"> Dados da comanda</h5>
                        <div class="shadow p-3 mb-3 bg-white rounded">
                            <input id="identificacao" type="Number" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="${aleatorio ? 'Digite a quantidade' : 'Digite o número da comanda'}">
                        </div>
                        <div class="shadow p-3 mb-5 bg-white rounded">
                            <button onclick="if(validaDadosCampo(['#identificacao'])){telaGerarQRCodeComanda('${aleatorio ? 'random' : null}');}else{mensagemDeErro('Preencha o campo de identifição!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info btn-block btn-sm">
                                <span class="fas fa-check"></span> Gerar Comanda
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalimpressaoComanda').modal('show')
}

// funcao para gerar o QR code comanda
function telaGerarQRCodeComanda(tipo) {

    let vetorDeRandomico = [];

    if (tipo == 'random') {
        for (let cont = 0; cont < parseInt($('#identificacao').val()); cont++) {
            vetorDeRandomico.push(((Math.floor(Math.random() * (2019123 - 200000000)) + 200000000) + '' + cont).toString());
        }
    } else {
        vetorDeRandomico.push(parseInt($('#identificacao').val()));
    }

    let codigoHTML = ``;

    codigoHTML += `<div class="text-center container">`
    for (let cont = 0; cont < vetorDeRandomico[cont]; cont += 2) {
        codigoHTML += `<hr style="bg-light; size:30px">
            <div class="row">
                <div class="col-sm">
                    <img src="img/logoImpressao.png" class="rounded mx-auto d-block" style="width: 30vw; margin-top: 15vh;" align="middle">
                    <h1 class="text-dark" style="margin-top: 15vh;">${vetorDeRandomico[cont]}</h1>
                    <div class="qrcode rounded mx-auto d-block" id="qr${cont}" style="margin-top: 5vh" align="middle">
                    </div>
                </div>`
        if (vetorDeRandomico[cont + 1]) {
            codigoHTML += `<div class="col-sm">
                <img src="img/logoImpressao.png" class="rounded mx-auto d-block" style="width: 30vw; margin-top: 15vh;" align="middle">
                <h1 class="text-dark" style="margin-top: 15vh;">${vetorDeRandomico[cont + 1]}</h1>
                <div class="qrcode rounded mx-auto d-block" id="qr${(cont + 1)}" style="margin-top: 5vh" align="middle">
                </div>
            </div>`
        }
        codigoHTML += `</div>
        <hr style="margin-top: 580px; bg-light; size:30px">`
    }

    codigoHTML += `</div>`

    document.getElementById('bodyMoadalImpressaoComanda').innerHTML = codigoHTML;

    for (var cont = 0; cont < vetorDeRandomico[cont]; cont++) {
        new QRCode("qr" + cont, {
            text: "" + vetorDeRandomico[cont] + "",
            width: 200,
            height: 200,
            colorDark: "black",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}

// ------------------------------------------------- Gerar Post Cardápio -------------------------------------------

//funcao responsavel por gerar o modal de dado resferentes a impressão do post de cardápio
function modalImpressaoPostCardapio() {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modalimpressaoPostCardapio">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-clipboard-list"></span> Gerar post cardápio</h5>
                    <button onclick="imprimirImpressora('bodyMoadalImpressaoPostCardapio');" type="button" class="btn btn-primary" style="margin-left:10px;">
                        Imprimir
                    </button>
                    <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                <div class="modal-body" id="bodyMoadalImpressaoPostCardapio">
                    <div class="col-8 mx-auto">
                        <h5 class="text-center"> Dados do Post</h5>
                        <div class="shadow p-3 mb-3 bg-white rounded">
                            <input id="nomewifi" type="text" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="Digite o nome da rede wifi">
                        </div>
                        <div class="shadow p-3 mb-5 bg-white rounded">
                            <button onclick="if(validaDadosCampo(['#nomewifi'])){telaGerarQRCodePostCardapio();}else{mensagemDeErro('Preencha o campo de nome rede wifi!'); mostrarCamposIncorrreto(['nomewifi']);}" type="button" class="btn btn-outline-info btn-block btn-sm">
                                <span class="fas fa-check"></span> Gerar post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalimpressaoPostCardapio').modal('show')
}

// funcao para gerar o QR code comanda
function telaGerarQRCodePostCardapio() {
    let codigoHTML = ``, ip;

    codigoHTML += `<div class="text-center container">
        <hr style="bg-light; size:30px">
            <div class="row">
                <div class="col-sm">
                    <img src="img/logoImpressao.png" class="rounded mx-auto d-block" style="width: 30vw; margin-top: 15vh;" align="middle">
                    <h1 class="text-dark" style="margin-top: 15vh;">Cardápio digital:</h1>
                    <h4>1) Conecte-se com a rede wifi ${document.getElementById('nomewifi').value}</h4>
                    <h4>2) Acesse o link ou faça a leitura do qrcode abaixo</h4>
                    <a href="#" id="campoLinkIP"></a>
                    <div class="qrcode rounded mx-auto d-block" id="qr" style="margin-top: 5vh" align="middle">
                    </div>
                </div>
            </div>
        <hr style="margin-top: 580px; bg-light; size:30px">
    </div>`

    document.getElementById('bodyMoadalImpressaoPostCardapio').innerHTML = codigoHTML;


    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;//compatibility for Firefox and chrome
    var pc = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
    pc.createDataChannel('');//create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);// create offer and set local description
    pc.onicecandidate = function (ice) {
        if (ice && ice.candidate && ice.candidate.candidate) {
            var myIP = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
            ip = myIP.toString();
            pc.onicecandidate = noop;
        }
    };

    setTimeout(function () {
        document.getElementById('campoLinkIP').innerHTML = `http://${ip}:3000`

        new QRCode("qr", {
            text: `http://${ip}:3000`,
            width: 200,
            height: 200,
            colorDark: "black",
            colorLight: "white",
            correctLevel: QRCode.CorrectLevel.H
        });
    }, 300)
}