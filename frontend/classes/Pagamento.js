// --------------------------------------------- Classe pagamento -----------------------------------------------------

//funcao responsavel por fazer a ligação necessaria com a tela de pagamento
function ligacaoPagamentoFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        if (tipo == 'digitar') {
            modalBuscarPedidoPagamento();
        } else if (tipo == 'qrcode') {
            telaLeituraDeQrCodePagamento();
        } else {
            telaExibirTodosOsPedidosPagamento();
        }
    } else {
        mensagemDeErro('Usuário não autorizado!')
        if (tipo == 'lista') {
            animacaoSlideDown(['#janela2'])
            telaAutenticacao()
        }
    }
}

//funcao responsavel por criar o modal de busca por numero do pedido classe pagamento
function modalBuscarPedidoPagamento(identificacao) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modalBuscarPedidoPagamento">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-clipboard-list"></span> Buscar Pedido</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                <div class="modal-body">`
    if (identificacao == null) {
        codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
                    <input id="identificacao" type="Number" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="Número pedido">
                </div>    
                <div class="shadow p-3 mb-5 bg-white rounded">
                    <button onclick="if(validaDadosCampo(['#identificacao'])){buscarDadosDoPedidoParaPagamento($('#identificacao').val());}else{mensagemDeErro('Preencha o número do pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info btn-block btn-sm" data-dismiss="modal">
                        <span class="fas fa-search"></span> Buscar Pedido
                    </button>
                </div>`
    } else {
        codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
                    <input id="identificacao" type="Number" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px" value=${identificacao}>
                </div>
                <div class="shadow p-3 mb-5 bg-white rounded">
                    <button onclick="if(validaDadosCampo(['#identificacao'])){buscarDadosDoPedidoParaPagamento($('#identificacao').val());}else{mensagemDeErro('Preencha o número do pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info btn-block btn-sm" data-dismiss="modal">
                        <span class="fas fa-search"></span> Buscar Pedido
                    </button>
                </div>`
        setTimeout(function () { buscarDadosDoPedidoParaPagamento($('#identificacao').val()); $('#modalBuscarPedidoPagamento').modal('hide'); }, 300)
    }
    codigoHTML += `</div>
            </div>
        </div>
    </div>`

    telaPagamento();
    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalBuscarPedidoPagamento').modal('show')
}

//funcao tela de pagamento
function telaPagamento() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
            <div class="col-6 mx-auto" style="margin:5px">
                <button onclick="modalBuscarPedidoPagamento(null)" type="button" class="btn btn-outline-info btn-block btn-sm">
                    <span class="fas fa-search"></span> Buscar pedido
                </button>
            </div>
        </div>
        <div id="resposta" class="col-10 rounded mx-auto d-block" style="margin-top:30px;"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para gerar tela de leitura de qrCode
function telaLeituraDeQrCodePagamento() {
    let codigoHTML = ``;

    codigoHTML = `<div class="shadow p-3 mb-3 bg-white rounded">
            <h4 class="text-center"><span class="fas fa-qrcode"></span> Leitura QR Code</h4>
        </div>
        <div class="shadow p-3 mb-3 bg-white rounded">
            <video id="preview" class="mx-auto d-block" style="margin-top:30px; background-color:#000; width:40vw; height:30vw; border-radius:30px;"></video>
            <button onclick="telaLeituraDeQrCodePedido();" class="btn btn-outline-secondary rounded mx-auto d-block" style="margin-top:15px">
                <span class="fas fa-sync"></span> Atualizar
            </button>
        </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;

    let scanner = new Instascan.Scanner(
        {
            video: document.getElementById('preview')
        }
    );
    scanner.addListener('scan', function (content) {
        modalBuscarPedidoPagamento(content);
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

    await aguardeCarregamento(true)
    let codigoHTML = ``, json = await requisicaoGET("orders", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
            <h4 class="text-center" style="margin-top:30px"><span class="fas fa-clipboard-list"></span> Lista de Pedidos</h4>
        </div>
        <div class="shadow p-3 mb-3 bg-white rounded">
            <table class="table table-light col-10 mx-auto table-sm text-center" style="margin-top:50px">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Número</th>
                        <th scope="col">Valor Total</th>
                        <th scope="col">Data</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>`

    for (let item of json.data) {
        const date = format(parseISO(item.createdAt), 'dd/MM/yyyy HH:mm:ss')
        codigoHTML += `<tr>
                        <td class="table-info"><strong>${item.identification}</strong></td>
                        <td class="table-warning text-danger"><strong>R$${item.total.toFixed(2)}</strong></td>
                        <td class="table-warning"><strong>${date}</strong></td>
                        <td><button class="btn btn-primary btn-sm" onclick="modalBuscarPedidoPagamento(this.value)" value="${item.identification}"><span class="fas fa-check"></span> Abrir</button></td>
                    </tr>`
    }
    codigoHTML += `</tbody>
        </table>
    </div>`

    if (json.data[0] == null) {
        document.getElementById('janela2').innerHTML = `<h5 class="text-center" style="margin-top:40vh;"><span class="fas fa-exclamation-triangle"></span> Não existe pedido em aberto!</h5>`;
        setTimeout(function () { animacaoJanela2(); setTimeout(function () { menuPagamentoPedido(); }, 100); }, 2000)
    } else {
        document.getElementById('janela2').innerHTML = codigoHTML;
    }

    animacaoSlideDown(['#janela2']);
}

//funcao para gerar tela de resposta contendo todos os itens produtos e bebidas
async function buscarDadosDoPedidoParaPagamento(identificacao) {

    let codigoHTML = ``;
    await aguardeCarregamento(true)
    let json = await requisicaoGET(`orders/${identificacao}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    if (json.data == null) {
        mensagemDeErro("Pedido inexistente!");
        setTimeout(function () { menuPagamentoPedido(); }, 1000)
    } else {

        document.getElementById('resposta').innerHTML = "";

        codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
            <div class="col-12 rounded mx-auto" id="escondeDados1" style="margin-top: 10px;">
                <div class="row">
                    <div class="col">
                        <h4>Valor total: <span class="badge badge-success"> R$ ${(json.data.total).toFixed(2)}</span></h4>
                    </div>
                    <div class="col">
                        <div class="input-group mb-3">
                            <select class="custom-select" id="formaPagamento">
                                <option selected value="dinheiro">Dinheiro</option>
                                <option value="cartão">Cartão</option>
                            </select>
                            <div class="input-group-append">
                                <button onclick="confirmarAcao('Efetuar o pagamento deste pedido!','efetuarPagamento(this.value)',${identificacao});" type="button" class="btn btn-primary">
                                    <span class="fas fa-hand-holding-usd"></span> Efetuar Pagamento
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr class="my-6 bg-dark">
            </div>
        </div>
        <div class="shadow p-3 mb-3 bg-white rounded">
            <div class="col-12 rounded mx-auto" style="margin-top: 10px;">
                <h6>Criado em: <span class="badge badge-warning">${format(parseISO(json.data.createdAt), 'dd/MM/yyyy HH:mm:ss')}</span></h6>
                <h6>Alterado em: <span class="badge badge-warning">${format(parseISO(json.data.updatedAt), 'dd/MM/yyyy HH:mm:ss')}</span></h6>
            </div>
            <h5 class="text-center" style="margin-top:15px">Itens do pedido</h5>
            <div class="col-12 layer1" style="position: relative; height: 20vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 5px">
                <table class="table table-light table-sm">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col" class="text-center">Nome</th>
                            <th scope="col" class="text-center">Preço</th>
                            <th scope="col" class="text-center">Quantidade</th>
                            <th scope="col" class="text-center">Cortesia</th>
                            <th scope="col" class="text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>`
        try {
            for (let item of json.data.items) {
                codigoHTML += `<tr scope="row">
                        <td class="table-info text-center" title="${item.product.name}"><strong><span class="fas fa-${item.product.drink ? 'wine-glass-alt' : 'utensils'}"></span> ${corrigirTamanhoString(40, item.product.name)}</strong></td>
                        <td class="table-warning text-center"><strong>R$ ${(parseFloat(item.product.price)).toFixed(2)}</strong></td>
                        <td class="table-warning text-center"><strong>${parseInt(item.quantity)}</strong></td>
                        <td class="table-warning text-center ${item.courtesy ? 'text-primary' : 'text-danger'}"><span class="fas fa-${item.courtesy ? 'check' : 'times'}"></span></td>
                        <td class="table-warning text-center text-danger"><strong>R$ ${(parseFloat(item.product.price) * parseInt(item.quantity)).toFixed(2)}</strong></td>
                    </tr>`
            }
        } catch (Exception) {
            mensagemDeErro('Não foi possível carregar os itens!')
        }
        codigoHTML += `</tbody>
            </table>
        </div>
        <div class="col-12 rounded mx-auto" style="margin-top: 10px;">
            <h6>Observações do pedido: <span class="badge badge-warning">${json.data.note}</span></h6>
        </div>
    </div>`


        animacaoSlideUp(['#resposta']);
        setTimeout(function () {
            document.getElementById('resposta').innerHTML = codigoHTML;
            animacaoSlideDown(['#resposta'])
        }, 400)
    }
}

//funcao para efetuar o pagamento
async function efetuarPagamento(identificacao) {
    try {
        await aguardeCarregamento(true)
        await requisicaoDELETE(`orders/${identificacao}/${$('#formaPagamento').val()}`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso(`Pagamento efetuado para o pedido nº ${identificacao}!`);
        await setTimeout(function () { menuPagamentoPedido(); }, 500)
    } catch (error) {
        mensagemDeErro('Não foi possível efetuar o pagamento!')
    }
}