// --------------------------------------------- Classe pagamento -----------------------------------------------------

//funcao responsavel por fazer a ligação necessaria com a tela de pagamento
function ligacaoPagamentoFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        if (tipo == 'digitar') {
            telaPagamento();
        } else if (tipo == 'qrcode') {
            telaLeituraDeQrCodePagamento();
        } else {
            telaExibirTodosOsPedidosPagamento();
        }
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

//funcao tela de pagamento
function telaPagamento(identificacao) {
    let codigoHTML = '';

    codigoHTML += '<h4 class="text-center">Buscar</h4>'
    codigoHTML += '<div class="card-deck col-8 mx-auto d-block">'
    codigoHTML += '<div class="input-group mb-3">'
    if (identificacao == null) {
        codigoHTML += '<input id="identificacao" type="Number" class="form-control mousetrap" placeholder="Número Pedido">'
        codigoHTML += `<button onclick="if(validaDadosCampo(['#identificacao'])){buscarDadosDoPedidoParaPagamento();}else{mensagemDeErro('Preencha o número do pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info">`
        codigoHTML += '<span class="fas fa-search"></span> Buscar Pedido'
        codigoHTML += '</button>'
    } else {
        codigoHTML += `<input id="identificacao" type="Number" class="form-control mousetrap" value=${identificacao}>`
        codigoHTML += `<button onclick="if(validaDadosCampo(['#identificacao'])){buscarDadosDoPedidoParaPagamento();}else{mensagemDeErro('Preencha o número do pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info">`
        codigoHTML += '<span class="fas fa-search"></span> Buscar Pedido'
        codigoHTML += '</button>'
        setTimeout(function () { buscarDadosDoPedidoParaPagamento(); }, 300);
    }
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<div id="resposta" style="margin-top:50px" class="col-10 rounded mx-auto d-block"></div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para gerar tela de leitura de qrCode
function telaLeituraDeQrCodePagamento() {
    var codigoHTML;

    codigoHTML = '<h4 class="text-center">Leitura QR Code</h4>'
    codigoHTML += '<video id="preview" class="mx-auto d-block" style="margin-top:30px; background-color:#000; width:40vw; height:30vw; border-radius:30px;"></video>'
    codigoHTML += '<button onclick="telaLeituraDeQrCodePedido();" class="btn btn-outline-secondary rounded mx-auto d-block" style="margin-top:15px"><span class="fas fa-sync"></span> Atualizar</button>'

    document.getElementById('janela2').innerHTML = codigoHTML;

    let scanner = new Instascan.Scanner(
        {
            video: document.getElementById('preview')
        }
    );
    scanner.addListener('scan', function (content) {
        telaPagamento(content);
        setTimeout(function () { scanner.stop(); }, 3000);
    });
    Instascan.Camera.getCameras().then(cameras => {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            mensagemDeErro("Não existe câmera no dispositivo!");
        }
    });
    setTimeout(function () { scanner.stop(); }, 10000);
}

//funcao para exibir lista com todos os pedidos
async function telaExibirTodosOsPedidosPagamento() {

    let codigoHTML = '', json = await requisicaoGET("orders", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });

    codigoHTML += '<h4 class="text-center" style="margin-top:30px">Lista de Pedidos</h4>'
    codigoHTML += '<table class="table table-light col-10 mx-auto table-sm text-center" style="margin-top:50px">'
    codigoHTML += '<thead class="thead-dark"><tr><th scope="col">Número</th><th scope="col">Valor Total</th><th scope="col">Data</th><th scope="col">#</th></tr></thead>'
    codigoHTML += '<tbody>'
    json.data.forEach(function (item) {
        codigoHTML += '<tr>'
        codigoHTML += '<td class="table-info"><strong>' + item.identification + '</strong></td>'
        codigoHTML += '<td class="table-warning text-danger"><strong>R$ ' + item.total.toFixed(2) + '</strong></td>'
        codigoHTML += '<td class="table-warning"><strong>' + (item.updatedAt).split('.')[0] + '</strong></td>'
        codigoHTML += '<td><button class="btn btn-primary" onclick="telaPagamento(this.value)" value=' + item.identification + '><span class="fas fa-edit iconsTam"></span></button></td>'
        codigoHTML += '</tr>'
    });
    codigoHTML += '</tbody>'
    codigoHTML += '</table>'

    document.getElementById('janela2').innerHTML = codigoHTML;

    animacaoSlideDown(['#janela2']);
}

//funcao para gerar tela de resposta contendo todos os itens produtos e bebidas
async function buscarDadosDoPedidoParaPagamento() {

    var codigoHTML = '';
    var json = await requisicaoGET("orders/" + $('#identificacao').val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });

    if (json.data == null) {
        mensagemDeErro("Pedido inexistente!");
        setTimeout(function () { menuPagamentoPedido(); }, 1000)
    } else {

        document.getElementById('resposta').innerHTML = "";

        codigoHTML += '<div class="col-12 rounded mx-auto" id="escondeDados1" style="margin-top: 10px;">'
        codigoHTML += `<h3>Valor Total: <span class="badge badge-success"> R$ ${(json.data.total).toFixed(2)}</span></h3>`
        codigoHTML += '<hr class="my-6 bg-dark">'
        codigoHTML += '</div>'

        codigoHTML += '<h5 class="text-center" style="margin-top:15px">Pedido</h5>'
        codigoHTML += '<div class="col-12 layer1" style="position: relative; height: 35vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 5px">'
        codigoHTML += '<table class="table table-light table-sm"><thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">Total</th></tr></thead><tbody>'
        try {
            json.data.items.forEach(function (item) {
                codigoHTML += '<tr scope="row">'
                if (item.product.drink) {
                    codigoHTML += `<td class="table-info"><strong><span class="fas fa-wine-glass-alt"></span> ${corrigirTamanhoString(40, item.product.name)}</strong></td>`
                } else {
                    codigoHTML += `<td class="table-info"><strong><span class="fas fa-utensils"></span> ${corrigirTamanhoString(40, item.product.name)}</strong></td>`
                }
                codigoHTML += `<td class="table-warning"><strong>R$ ${(parseFloat(item.product.price)).toFixed(2)}</strong></td>`
                codigoHTML += `<td class="table-warning text-center"><strong>${parseInt(item.quantity)}</strong></td>`
                codigoHTML += `<td class="table-warning text-danger"><strong>R$ ${(parseFloat(item.product.price) * parseInt(item.quantity)).toFixed(2)}</strong></td>`
                codigoHTML += '</tr>'
            });
        } catch (Exception) {
            mensagemDeErro('Não foi possível carregar os itens!')
        }
        codigoHTML += '</tbody></table>'
        codigoHTML += '</div>'

        codigoHTML += '<div class="card-deck col-8 mx-auto d-block">'
        codigoHTML += '<div class="input-group mb-3" style="margin-top:20px">'
        codigoHTML += '<select class="custom-select" id="formaPagamento">'
        codigoHTML += '<option selected value="dinheiro">Dinheiro</option>'
        codigoHTML += '<option value="cartão">Cartão</option>'
        codigoHTML += '</select>'
        codigoHTML += '<div class="input-group-append">'
        codigoHTML += `<button onclick="if(validaDadosCampo(['#identificacao'])){confirmarAcao('Efetuar o pagamento deste pedido!','efetuarPagamento()',null)}else{mensagemDeErro('Preencha o número do pedido!')}" type="button" class="btn btn-primary">Efetuar Pagamento</button>`
        codigoHTML += '</div>'
        codigoHTML += '</div>'
        codigoHTML += '</div>'

        animacaoSlideUp(['#resposta']);
        setTimeout(function () {
            document.getElementById('resposta').innerHTML = codigoHTML;
            animacaoSlideDown(['#resposta'])
        }, 400)
    }
}

//funcao para efetuar o pagamento
function efetuarPagamento() {
    try {
        requisicaoDELETE("orders/" + $('#identificacao').val() + "/" + $('#formaPagamento').val(), null, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        mensagemDeAviso("Pagamento Efetuado!");
        setTimeout(function () { menuPagamentoPedido(); }, 500)
    } catch (error) {
        mensagemDeErro('Não foi possível efetuar o pagamento!')
    }
}