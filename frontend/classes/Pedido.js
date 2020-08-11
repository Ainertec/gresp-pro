// --------------------------------------------- Classe Pedido -----------------------------------------------------

let VETORDEITENSCLASSEPEDIDO = [];

//funcao responsavel por fazer a ligacao necessaria com a tela de pedido
function ligacaoPedidoFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {

        $('#submenu').slideUp(1000);
        animacaoSlideUp(['#mensagemSubMenu']);
        setTimeout(function () { document.getElementById('mensagemSubMenu').innerHTML = '<p>Para liberar o menu pressione duas vezes a tecla "B" ou clique no botão abaixo!</p><button onclick="liberarSubMenu();" type="button" class="btn btn-outline-dark"><span class="fas fa-list-ul iconsTam"></span> Menu <span class="fas fa-caret-down iconsTam"></span></button>'; animacaoSlideDown(['#mensagemSubMenu']) }, 1000);
        pausarAtalhos();
        atalhoTeclaPedido();

        if (tipo == 'digitar') {
            telaDigitarPedido(null);
        } else if (tipo == 'qrcode') {
            telaLeituraDeQrCodePedido();
        } else if ('lista') {
            telaExibirTodosOsPedidos();
        }

    } else {
        mensagemDeErro('Usuário não autorizado!')
        if (tipo == 'lista') {
            animacaoSlideDown(['#janela2'])
            telaAutenticacao()
        }
    }
}

//funcao tela de digitar identificacao do pedido
function telaDigitarPedido(identificacao) {

    let codigoHTML = '';

    codigoHTML += '<div class="card-deck col-8 mx-auto d-block">'
    codigoHTML += '<div class="input-group mb-3">'
    codigoHTML += '<label class="h5" for="identificacao" style="margin-right: 15px">Buscar</label>'
    if (identificacao == null) {
        codigoHTML += '<input id="identificacao" type="Number" class="form-control mousetrap" placeholder="Número Pedido">'
        codigoHTML += `<button onclick="if(validaDadosCampo(['#identificacao'])){efeitoPaginaPedido(); setTimeout(function(){$('#escondeDados4').slideDown(300);},300); buscarPedido()}else{mensagemDeErro('Informe um numero de pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info">`
        codigoHTML += '<span class="fas fa-search"></span> Buscar Pedido'
        codigoHTML += '</button>'
    } else {
        codigoHTML += `<input id="identificacao" type="Number" class="form-control mousetrap" value=${identificacao}>`
        codigoHTML += `<button onclick="if(validaDadosCampo(['#identificacao'])){efeitoPaginaPedido(); setTimeout(function(){$('#escondeDados4').slideDown(300);},300); buscarPedido();}else{mensagemDeErro('Informe um numero de pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info">`
        codigoHTML += '<span class="fas fa-search"></span> Buscar Pedido'
        codigoHTML += '</button>'
        setTimeout(function () { if (validaDadosCampo(['#identificacao'])) { efeitoPaginaPedido(); setTimeout(function () { $('#escondeDados4').slideDown(300); }, 300); buscarPedido() } else { mensagemDeErro('Informe um numero de pedido!'); } }, 300);
    }
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col border border-secondary rounded bg-white" style="padding: 0px">'

    codigoHTML += '<div class="col-12 layer1" style="position: relative; height: 69vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 0px">'
    codigoHTML += '<div class="col-12 rounded mx-auto" id="escondeDados2" style="margin-top: 10px; padding: 0px">'
    codigoHTML += '<h5 style="margin-top:20px; margin-left: 5px">Produtos do pedido</h5>'
    codigoHTML += '<div style="margin-top:20px; padding: 5px" class="col-12 rounded mx-auto d-block"><table class="table table-light table-sm"><thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead><tbody id="tabelaProdutos"></tbody></table></div>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="col-12 rounded mx-auto" id="escondeDados3" style="margin-top: 10px; padding: 0px">'
    codigoHTML += '<h5 style="margin-top:20px; margin-left: 5px">Bebidas do pedida</h5>'
    codigoHTML += '<div style="margin-top:10px; padding: 5px" class="col-12 rounded mx-auto d-block"><table class="table table-light table-sm"><thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead><tbody id="tabelaBebidas"></tbody></table></div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    codigoHTML += '</div>'
    codigoHTML += '<div class="col border border-secondary rounded bg-white" style="padding: 0px; margin-left: 2px">'

    codigoHTML += '<div class="col-12 rounded mx-auto" id="escondeDados1" style="margin-top: 10px;">'
    codigoHTML += '<h3 id="valorTotal"></h3>'
    codigoHTML += '<hr class="my-6 bg-dark">'
    codigoHTML += '</div>'
    codigoHTML += '<div class="col-12 rounded mx-auto" id="escondeDados4" style="margin-top: 10px; padding: 7px">'
    codigoHTML += '<div class="col-12 layer1" style="position: relative; height: 45vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 5px">'
    codigoHTML += '<div class="col-11 rounded mx-auto d-block" style="margin-bottom: 40px"><button onclick="telaBuscaeExibirItens();" class="btn btn-warning btn-block"><span class="fas fa-utensils"> Adicionar produtos e bebidas <span class="fas fa-wine-glass-alt"></span></button></div>'
    codigoHTML += '<hr class="my-6 bg-dark">'
    codigoHTML += '<h5 style="margin-top:10px; margin-left: 10px">Observações</h5>'
    codigoHTML += '<textArea id="observacao" class="form-control col-11 rounded mx-auto d-block border border-dark mousetrap" rows="5"></textArea>'
    codigoHTML += '</div>'
    codigoHTML += '<hr class="my-6 bg-dark">'
    codigoHTML += '<div id="botaoFinalizarPedido" style="margin-top:10px" class="col-11 rounded mx-auto d-block"></div>'
    codigoHTML += '</div>'

    codigoHTML += '</div>'
    codigoHTML += '</div>'





    document.getElementById('janela2').innerHTML = codigoHTML;
    efeitoPaginaPedido();

}

//funcao para gerar tela de leitura de qrCode
function telaLeituraDeQrCodePedido() {
    let codigoHTML = '';

    codigoHTML += '<h4 class="text-center">Leitura QR Code</h4>'
    codigoHTML += '<video id="preview" class="mx-auto d-block" style="margin-top:30px; background-color:#000; width:40vw; height:30vw; border-radius:30px;"></video>'
    codigoHTML += '<button onclick="telaLeituraDeQrCodePedido();" class="btn btn-outline-dark rounded mx-auto d-block" style="margin-top:15px"><span class="fas fa-sync"></span> Atualizar</button>'

    document.getElementById('janela2').innerHTML = codigoHTML;

    let scanner = new Instascan.Scanner(
        {
            video: document.getElementById('preview')
        }
    );
    scanner.addListener('scan', function (content) {
        telaDigitarPedido(content);
        setTimeout(function () { scanner.stop(); }, 3000);
    });
    Instascan.Camera.getCameras().then(cameras => {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            mensagemDeErro("Não existe câmera no dispositivo!");
        }
    });
    setTimeout(function () { scanner.stop(); document.getElementById('preview').innerHTML = ''; }, 10000);
}

//funcao para exibir lista com todos os pedidos
async function telaExibirTodosOsPedidos() {

    await aguardeCarregamento(true)
    let codigoHTML = '', json = await requisicaoGET("orders", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    codigoHTML += '<h4 class="text-center" style="margin-top:30px">Lista de Pedidos</h4>'
    codigoHTML += '<table class="table table-light text-center col-10 mx-auto table-sm" style="margin-top:50px">'
    codigoHTML += '<thead class="thead-dark"><tr><th scope="col">Número</th><th scope="col">Valor Total</th><th scope="col">Data</th><th scope="col">#</th></tr></thead>'
    codigoHTML += '<tbody>'
    json.data.forEach(function (item) {
        codigoHTML += '<tr>'
        codigoHTML += `<td class="table-info"><strong>${item.identification}</strong></td>`
        codigoHTML += `<td class="table-warning text-danger"><strong>R$ ${(item.total).toFixed(2)}</strong></td>`
        codigoHTML += `<td class="table-warning"><strong>${(item.updatedAt).split('.')[0]}</strong></td>`
        codigoHTML += `<td><button class="btn btn-primary" onclick="telaDigitarPedido(this.value)" value=${item.identification}><span class="fas fa-edit iconsTam"></span></button></td>`
        codigoHTML += '</tr>'
    });
    codigoHTML += '</tbody>'
    codigoHTML += '</table>'

    if (json.data[0] == null) {
        document.getElementById('janela2').innerHTML = '<h5 class="text-center" style="margin-top:40vh;"><span class="fas fa-exclamation-triangle"></span> Não existe pedido em aberto!</h5>';
        setTimeout(function () { animacaoJanela2(); setTimeout(function () { menuPedido(); }, 100); }, 2000)
    } else {
        document.getElementById('janela2').innerHTML = codigoHTML;
    }

    animacaoSlideDown(['#janela2'])
}

//funcao para verificar se pedido existe
async function buscarPedido() {

    await aguardeCarregamento(true)
    let json = await requisicaoGET("orders/" + $('#identificacao').val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    recarregarPagina();

    setTimeout(function () {
        if (json.data != null) {
            document.getElementById('valorTotal').innerHTML = `Valor total: <span class="badge badge-success"> R$ ${json.data.total.toFixed(2)}</span>`;
            $('#escondeDados1').slideDown(300);
            json.data.items.forEach(function (item) {
                if (!item.product.drink) {
                    adicionarItemaoPedido('Produto', item.product._id, item.quantity, 'atualizar');
                } else {
                    adicionarItemaoPedido('Bebida', item.product._id, item.quantity, 'atualizar');
                }
            });
            document.getElementById('observacao').innerHTML = json.data.note;
            $('#escondeDados4').slideDown(300);
            botaoDeConfirmaçãoDePedido(`confirmarAcao('Atualizar este pedido!', 'cadastrarAtualizarPedido(this.value)', 'atualizar');`);
            mensagemDeAviso('Pedido pronto para atualização!')
        } else {
            botaoDeConfirmaçãoDePedido(`confirmarAcao('Cadastrar este pedido!','cadastrarAtualizarPedido(this.value)', 'cadastrar');`);
            $('#escondeDados4').slideDown(300);
            mensagemDeAviso('Pedido pronto para cadastro!')
        }
    }, 300)
}

//funcao para criar sub menu de opcoes
function botaoDeConfirmaçãoDePedido(funcao) {
    let codigoHTML = '';

    codigoHTML += `<button id="botaoConfirmarPedido" onclick="${funcao}" type="button" class="btn btn-primary btn-block" disabled>`
    codigoHTML += '<span class="fas fa-check"></span> Finalizar Pedido'
    codigoHTML += '</button>'

    document.getElementById('botaoFinalizarPedido').innerHTML = codigoHTML;

}

//funcao responsavel por adicionar o produto/bebida na tabela do pedido
async function adicionarItemaoPedido(itemTipo, idItem, quantidadeItem, pedidoTipo) {

    let aux = true, json = null;

    await aguardeCarregamento(true)
    json = await requisicaoGET('items', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    VETORDEITENSCLASSEPEDIDO.forEach(function (item) {
        if (item._id.toString() == idItem.toString()) {
            aux = false;
        }
    });

    if (aux) {
        json.data.forEach(function (item) {
            if (item._id.toString() == idItem.toString()) {
                item.type = itemTipo.toString();
                VETORDEITENSCLASSEPEDIDO.push(item);
                document.getElementById('botaoConfirmarPedido').disabled = false;
                if (pedidoTipo == 'novo') {
                    quantidadeItem = parseInt($(quantidadeItem).val());
                }
                gerarTabeladeItensInseridos(item, quantidadeItem, pedidoTipo)
            }
        });
    } else {
        mensagemDeErro('Não é possível adicionar pois o mesmo já se encontra no pedido!')
    }
}

//funcao responsavel por criar a tabela com os itens inseridos
function gerarTabeladeItensInseridos(json, quantidadeItem, pedidoTipo) {
    let codigoHTML = '';

    codigoHTML = `<tr scope="row" id="item${json._id}">`
    if (json.type == 'Produto') {
        codigoHTML += `<td class="col-md-5 table-info"><strong><span class="fas fa-utensils"></span> ${corrigirTamanhoString(30, json.name)}</strong></td>`
    } else {
        codigoHTML += `<td class="col-md-5 table-info"><strong><span class="fas fa-wine-glass-alt"></span> ${corrigirTamanhoString(30, json.name)}</strong></td>`
    }
    codigoHTML += `<td class="col-md-2 table-warning text-danger"><strong>R$${(parseFloat(json.price)).toFixed(2)}</strong></td>`
    codigoHTML += `<td class="col-md-1 table-warning"><input class="form-control col-md-8 form-control-sm mousetrap" id="quantidade${json._id}" type="Number" value=${parseInt(quantidadeItem)}></td>`
    if (pedidoTipo == 'novo') {
        codigoHTML += `<td class="col-md-2"><button onclick="removerItem('${json._id}')" class="btn btn-outline-danger btn-sm"><span class="fas fa-trash-alt"></span></button></td>`
    }
    codigoHTML += '</tr>'

    if (json.type == 'Produto') {
        $('#tabelaProdutos').append(codigoHTML);
        $('#escondeDados2').slideDown(500);
        if (pedidoTipo == 'novo') {
            mensagemDeAviso('Produto adicionado com sucesso!')
        }
    } else if (json.type == 'Bebida') {
        $('#tabelaBebidas').append(codigoHTML);
        $('#escondeDados3').slideDown(500);
        if (pedidoTipo == 'novo') {
            mensagemDeAviso('Bebida adicionada com sucesso!')
        }
    }
}

//funcao responsavel por remover o item do pedido
function removerItem(identification) {
    VETORDEITENSCLASSEPEDIDO.forEach(function (item, indice) {
        if (item._id.toString() == identification.toString()) {
            if (item.type == 'Produto') {
                VETORDEITENSCLASSEPEDIDO.splice(indice, 1)
                document.getElementById('tabelaProdutos').removeChild(document.getElementById('item' + identification))
                mensagemDeAviso('Produto removido com sucesso!')
            } else if (item.type == 'Bebida') {
                VETORDEITENSCLASSEPEDIDO.splice(indice, 1)
                document.getElementById('tabelaBebidas').removeChild(document.getElementById('item' + identification))
                mensagemDeAviso('Bebida removida com sucesso!')
            }
        }
    });
}

//funcao responsavel por liberar o menu lateral
function liberarSubMenu() {
    let codigoHTML = '';
    codigoHTML += '<div class="modal fade" id="modalDesbloquearSubMenu" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">'
    codigoHTML += '<div class="modal-dialog" role="document">'
    codigoHTML += '<div class="modal-content">'
    codigoHTML += '<div class="modal-header">'
    codigoHTML += '<h5 class="modal-title">Atenção</h5>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="modal-body">'
    codigoHTML += '<p>Ao sair da tela você perderá todos os novos dados do pedido caso não o tenha finalizado! Deseja continuar?</p>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="modal-footer">'
    codigoHTML += '<button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Não</button>'
    codigoHTML += `<button onclick="$('#submenu').slideDown(1000); document.getElementById('mensagemSubMenu').innerHTML=''; retirarPausaAtalho();" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>`
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalDesbloquearSubMenu').modal('show');
}

//funcao responsavel por gerar a tela de busca de novo itens para o pedido
function telaBuscaeExibirItens() {
    let codigoHTML = '';

    codigoHTML += '<div class="modal" id="modalListaItensPedido" style="width: 99vw" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">'
    codigoHTML += '<div class="modal-dialog modal-lg float-right" style="width: 42vw" role="document">'
    codigoHTML += '<div class="modal-content" style="width: 42vw; height: 90vh; margin-top: 15px;">'
    codigoHTML += '<div class="modal-header">'
    codigoHTML += '<h5 class="modal-title">Produtos e Bebidas</h5>'
    codigoHTML += '<button onclick="limparModal();" type="button" class="close" data-dismiss="modal" aria-label="Close">'
    codigoHTML += '<span aria-hidden="true">&times;</span>'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="modal-body">'

    codigoHTML += '<form>'
    codigoHTML += '<div class="form-row">'
    codigoHTML += '<input id="nome" type="text" class="form-control col-md-9 mousetrap" placeholder="Nome Produto">'
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nome'])){$('#resposta').slideUp(300); setTimeout(function(){listaItens('nome')},300);}else{mensagemDeErro('Preencha o campo de busca!'); mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info col-md-3">`
    codigoHTML += '<span class="fas fa-search"></span> Buscar'
    codigoHTML += '</button>'
    codigoHTML += '<br/>'
    codigoHTML += `<button onclick="$('#resposta').slideUp(300); setTimeout(function(){listaItens('todos')},300)" type="button" class="btn btn-outline-info btn-block" style="margin-top:10px;">`
    codigoHTML += '<span class="fas fa-search-plus"></span> Exibir todos'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '</form>'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col">'
    codigoHTML += '<div id="respostaProduto" style="margin-top: 10px;"></div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col">'
    codigoHTML += '<div id="respostaBebida" style="margin-top: 10px;"></div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'


    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalListaItensPedido').modal('show');
}

//funcao para criar lista de produtos para adicionar
async function listaItens(tipoBusca) {

    let codigoHTML = '', codigoHTML2 = '', json = null, json2 = null;

    if (tipoBusca == 'todos') {
        await aguardeCarregamento(true)
        json = await requisicaoGET('items', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    } else if (tipoBusca == 'nome') {
        await aguardeCarregamento(true)
        json = await requisicaoGET('items/' + $('#nome').val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    }

    codigoHTML += '<h5 class="text-center" style="margin-top:20px">Lista produtos</h5>'
    codigoHTML += '<div class="col-12 layer1" style="position: relative; height: 25vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 0px">'
    codigoHTML += '<table class="table table-light table-sm">'
    codigoHTML += '<thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead>'
    codigoHTML += '<tbody>'
    json.data.forEach(function (item) {
        if (!item.drink) {
            codigoHTML += '<tr>'
            codigoHTML += `<td class="col-md-5 table-secondary"><strong><span class="fas fa-utensils"></span> ${corrigirTamanhoString(30, item.name)}</strong></td>`
            codigoHTML += `<td class="col-md-2 table-warning text-danger"><strong>R$${(item.price).toFixed(2)}</strong></td>`
            codigoHTML += `<td class="col-md-2 table-warning"><input class="form-control form-control-sm col-md-8 mousetrap" type="Number" value=1 id="quantidadeAdicionar${item._id}" /></td>`
            codigoHTML += `<td class="col-md-2"><button onclick="if(validaDadosCampo(['#quantidadeAdicionar${item._id}']) && validaValoresCampo(['#quantidadeAdicionar${item._id}'])){adicionarItemaoPedido('Produto', '${item._id}', '#quantidadeAdicionar${item._id}', 'novo')}else{mensagemDeErro('Quantidade inválida para adicionar!'); mostrarCamposIncorrreto(['quantidadeAdicionar${item._id}']);}" class="btn btn-success btn-sm"><span class="fas fa-plus"></span></button></td>`
            codigoHTML += '</tr>'
        }
    });
    codigoHTML += '</tbody>'
    codigoHTML += '</table>'
    codigoHTML += '</div>'


    codigoHTML2 += '<h5 class="text-center" style="margin-top:20px">Lista bebidas</h5>'
    codigoHTML2 += '<div class="col-12 layer1" style="position: relative; height: 25vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 0px">'
    codigoHTML2 += '<table class="table table-light table-sm">'
    codigoHTML2 += '<thead class="thead-dark"><tr><th scope="col">Nome</th><th scope="col">Preço</th><th scope="col">Quantidade</th><th scope="col">#</th></tr></thead>'
    codigoHTML2 += '<tbody>'
    json.data.forEach(function (item) {
        if (item.drink) {
            codigoHTML2 += '<tr>'
            codigoHTML2 += `<td class="col-md-5 table-secondary"><strong><span class="fas fa-wine-glass-alt"></span> ${corrigirTamanhoString(30, item.name)}</strong></td>`
            codigoHTML2 += `<td class="col-md-2 table-warning text-danger"><strong>R$${(item.price).toFixed(2)}</strong></td>`
            codigoHTML2 += `<td class="col-md-2 table-warning"><input class="form-control form-control-sm col-md-8 mousetrap" type="Number" value=1 id="quantidadeAdicionar${item._id}" /></td>`
            codigoHTML2 += `<td class="col-md-2"><button onclick="if(validaDadosCampo(['#quantidadeAdicionar${item._id}']) && validaValoresCampo(['#quantidadeAdicionar${item._id}'])){adicionarItemaoPedido('Bebida', '${item._id}', '#quantidadeAdicionar${item._id}', 'novo')}else{mensagemDeErro('Quantidade inválida para adicionar!'); mostrarCamposIncorrreto(['quantidadeAdicionar${item._id}']);}" class="btn btn-success btn-sm"><span class="fas fa-plus"></span></button></td>`
            codigoHTML2 += '</tr>'
        }
    });
    codigoHTML2 += '</tbody>'
    codigoHTML2 += '</table>'
    codigoHTML2 += '</div>'

    document.getElementById('respostaProduto').innerHTML = codigoHTML;
    document.getElementById('respostaBebida').innerHTML = codigoHTML2;
    $('#respostaProduto').slideDown(300);
    $('#respostaBebida').slideDown(300);

}

//funcao para requisicao via post com JSON com todos os dados para gravura do arquivo
async function cadastrarAtualizarPedido(tipoRequisicao) {
    let aux = true, condicaoComItens = false, condicaoSemQuantidade = true;

    VETORDEITENSCLASSEPEDIDO.forEach(function (item) {
        if (!validaDadosCampo(['#quantidade' + item._id]) || !validaValoresCampo(['#quantidade' + item._id])) {
            condicaoSemQuantidade = false;
            mostrarCamposIncorrreto(['quantidade' + item._id]);
        }
    });

    try {
        let json = `{"identification":${parseInt($('#identificacao').val())},
                    "items":[`
        VETORDEITENSCLASSEPEDIDO.forEach(function (item) {
            if (aux) {
                json += `{"product":"${item._id}","quantity":${parseInt($('#quantidade' + item._id).val())}}`
                aux = false;
                condicaoComItens = true;
            } else {
                json += `,{"product":"${item._id}","quantity":${parseInt($('#quantidade' + item._id).val())}}`
            }
        });
        if (validaDadosCampo(['#observacao'])) {
            json += `],"note":"${($('#observacao').val()).toString()}"}`
        } else {
            json += `],"note":"Nenhuma."}`
        }

        if (tipoRequisicao == 'cadastrar') {
            if (condicaoComItens && condicaoSemQuantidade) {
                await aguardeCarregamento(true)
                await requisicaoPOST("orders", JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                await aguardeCarregamento(false)

                let newOrder = `{
                    "identification":${$('#identificacao').val()},
                    "oldItems": [],
                    "type":true
                }`

                await aguardeCarregamento(true)
                await requisicaoPOST(`printer`, JSON.parse(newOrder), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                await aguardeCarregamento(false)

                await mensagemDeAviso("Pedido cadastrado com sucesso!");
                await buscarPedido();
                await setTimeout(function () { menuPedido(); }, 1500)
            } else if (condicaoComItens) {
                mensagemDeErro('Não cadastrado, item com quantidade inválida!')
            } else {
                mensagemDeErro('Não cadastrado, pedido sem item!')
            }
        } else {
            if (condicaoComItens && condicaoSemQuantidade) {
                await aguardeCarregamento(true)
                let jsonDid = await requisicaoGET("orders/" + $('#identificacao').val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                let json2 = JSON.parse(json), aux = true
                delete json2.identification
                await requisicaoPUT("orders/" + $('#identificacao').val(), json2, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                await aguardeCarregamento(false)

                let updateOrder = `{
                    "identification":${$('#identificacao').val()},
                    "oldItems": [`
                jsonDid.data.items.forEach(function (item) {
                    if (aux) {
                        updateOrder += `{
                                "product":"${item.product._id}",
                                "quantity":${item.quantity}
                            }`
                        aux = false;
                    } else {
                        updateOrder += `,{
                                "product":"${item.product._id}",
                                "quantity":${item.quantity}
                            }`
                    }

                });
                updateOrder += `],
                    "type":false
                }`

                await aguardeCarregamento(true)
                await requisicaoPOST(`printer`, JSON.parse(updateOrder), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                await aguardeCarregamento(false)

                await mensagemDeAviso("Pedido atualizado com sucesso!");
                await buscarPedido();
                await setTimeout(function () { menuPedido(); }, 1500)
            } else if (condicaoComItens) {
                mensagemDeErro('Não atualizado, item com quantidade inválida!')
            } else {
                mensagemDeErro('Não atualizado, pedido sem item!')
            }
        }

    } catch (error) {
        if (tipoRequisicao == 'cadastrar') {
            mensagemDeAviso('Não foi possível cadastrar o pedido!');
        } else {
            mensagemDeErro('Não foi possível atualizar o pedido!')
        }
    }
}

//funcao para inicializar/zerar todos os componentes da tela
function recarregarPagina() {
    document.getElementById('tabelaProdutos').innerHTML = '';
    document.getElementById('tabelaBebidas').innerHTML = '';
    document.getElementById('botaoFinalizarPedido').innerHTML = '';
    document.getElementById('valorTotal').innerHTML = '';
    document.getElementById('observacao').innerHTML = '';
    VETORDEITENSCLASSEPEDIDO = [];
}

//funcao responsavel por iniciar os efeitos da pagina pedido
function efeitoPaginaPedido() {
    $('#escondeDados1').slideUp(300);
    $('#escondeDados2').slideUp(300);
    $('#escondeDados3').slideUp(300);
    $('#escondeDados4').slideUp(300);
}