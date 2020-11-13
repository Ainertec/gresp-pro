// --------------------------------------------- Classe Pedido -----------------------------------------------------

let VETORDEITENSCLASSEPEDIDO = [];

//funcao responsavel por fazer a ligacao necessaria com a tela de pedido
function ligacaoPedidoFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {

        $('#submenu').slideUp(1000);
        animacaoSlideUp(['#mensagemSubMenu']);
        setTimeout(function () {
            document.getElementById('mensagemSubMenu').innerHTML = `<p>
                Para liberar o menu pressione duas vezes a tecla "B" ou clique no botão abaixo!
            </p>
            <button onclick="liberarSubMenu();" type="button" class="btn btn-outline-dark">
                <span class="fas fa-list-ul iconsTam"></span> 
                    Menu 
                <span class="fas fa-caret-down iconsTam"></span>
            </button>`; animacaoSlideDown(['#mensagemSubMenu'])
        }, 1000);
        pausarAtalhos();
        atalhoTeclaPedido();

        if (tipo == 'digitar') {
            modalBuscarPedido(null);
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

//funcao responsavel por criar o modal de busca por numero do pedido
function modalBuscarPedido(identificacao) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modalBuscarPedido">
        <div class="modal-dialog modal-sm modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-clipboard-list"></span> Buscar Pedido</h5>
                    <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                 </div>
                <div class="modal-body">`
    if (identificacao == null) {
        codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
                    <input id="identificacao" type="Number" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="Número pedido">
                </div>    
                <div class="shadow p-3 mb-5 bg-white rounded">
                    <button onclick="if(validaDadosCampo(['#identificacao'])){efeitoPaginaPedido(); setTimeout(function(){$('#escondeDados4').slideDown(300);},300); buscarPedido($('#identificacao').val()); }else{mensagemDeErro('Informe um numero de pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info btn-block btn-sm" data-dismiss="modal">
                        <span class="fas fa-search"></span> Buscar Pedido
                    </button>
                </div>`
    } else {
        codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
                    <input id="identificacao" type="Number" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px" value=${identificacao}>
                </div>
                <div class="shadow p-3 mb-5 bg-white rounded">
                    <button onclick="if(validaDadosCampo(['#identificacao'])){efeitoPaginaPedido(); setTimeout(function(){$('#escondeDados4').slideDown(300);},300); buscarPedido($('#identificacao').val()); }else{mensagemDeErro('Informe um numero de pedido!'); mostrarCamposIncorrreto(['identificacao']);}" type="button" class="btn btn-outline-info btn-block btn-sm" data-dismiss="modal">
                        <span class="fas fa-search"></span> Buscar Pedido
                    </button>
                </div>`
        setTimeout(function () { if (validaDadosCampo(['#identificacao'])) { efeitoPaginaPedido(); setTimeout(function () { $('#escondeDados4').slideDown(300); }, 300); buscarPedido($('#identificacao').val()); $('#modalBuscarPedido').modal('hide'); } else { mensagemDeErro('Informe um numero de pedido!'); } }, 300);
    }
    codigoHTML += `</div>
            </div>
        </div>
    </div>`

    telaDigitarPedido();
    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalBuscarPedido').modal('show')
}

//funcao tela de digitar identificacao do pedido
function telaDigitarPedido() {

    let codigoHTML = ``;

    codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
            <div class="col-6 mx-auto" style="margin:5px">
                <button onclick="modalBuscarPedido(null)" type="button" class="btn btn-outline-info btn-block btn-sm">
                    <span class="fas fa-search"></span> Buscar pedido
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col border border-secondary rounded bg-white" style="padding: 0px">
                <div class="col-12 layer1" style="position: relative; height: 69vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 0px">
                    <div class="col-12 rounded mx-auto" id="escondeDados2" style="margin-top: 10px; padding: 0px">
                        <div class="shadow p-3 mb-3 bg-white rounded">
                            <h5 style="margin-top:5px; margin-left: 5px"><span class="fas fa-utensils"></span> Itens do pedido <span class="fas fa-wine-glass-alt"></span></h5>
                        </div>
                        <div class="shadow p-3 mb-3 bg-white rounded">
                            <div style="margin-top:20px; padding: 5px" class="col-12 rounded mx-auto d-block">
                                <table class="table table-light table-sm">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th scope="col">Nome</th>
                                            <th scope="col">Preço</th>
                                            <th scope="col">Cortesia</th>
                                            <th scope="col">Quantidade</th>
                                            <th scope="col">#</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tabelaItens">
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col border border-secondary rounded bg-white" style="padding: 0px; margin-left: 2px">
                <div class="col-12 rounded mx-auto" id="escondeDados1" style="margin-top: 10px;">
                    <div class="shadow p-3 mb-3 bg-white rounded">
                        <h4 id="valorTotal"></h4>
                    </div>
                </div>
                <div class="col-12 rounded mx-auto" id="escondeDados4" style="margin-top: 5px; padding: 7px">
                    <div class="col-12 layer1" style="position: relative; height: 40vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 5px">
                        <div class="shadow p-3 mb-3 bg-white rounded">
                            <div class="col-11 rounded mx-auto d-block">
                                <button onclick="telaBuscaeExibirItens();" class="btn btn-warning btn-block">
                                    <span class="fas fa-utensils"> Adicionar produtos e bebidas <span class="fas fa-wine-glass-alt"></span>
                                </button>
                            </div>
                        </div>
                        <div class="shadow p-3 mb-3 bg-white rounded">
                            <h5 style="margin-top:5px; margin-left: 5px">Observações</h5>
                            <textArea id="observacao" class="form-control col-11 rounded mx-auto d-block border border-dark mousetrap" rows="5">Nenhuma.</textArea>
                        </div>
                    </div>
                    <div class="shadow p-3 mb-3 bg-white rounded">
                        <div id="botaoFinalizarPedido" style="margin-top:5px" class="col-11 rounded mx-auto d-block"></div>
                        <div id="botaoReimprimir" style="margin-top:10px" class="col-11 rounded mx-auto d-block"></div>
                    </div>
                </div>
            </div>
        </div>`


    document.getElementById('janela2').innerHTML = codigoHTML;
    efeitoPaginaPedido();

}

//funcao para gerar tela de leitura de qrCode
function telaLeituraDeQrCodePedido() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
        <h4 class="text-center"><span class="fas fa-qrcode"></span> Leitura QR Code</h4>
    </div>
    <div class="shadow p-3 mb-3 bg-white rounded">
        <video id="preview" class="mx-auto d-block" style="margin-top:30px; background-color:#000; width:40vw; height:30vw; border-radius:30px;"></video>
        <button onclick="telaLeituraDeQrCodePedido();" class="btn btn-outline-dark rounded mx-auto d-block" style="margin-top:15px">
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
        modalBuscarPedido(content);
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
    let codigoHTML = ``, json = await requisicaoGET(`orders`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
        <h4 class="text-center" style="margin-top:30px"><span class="fas fa-clipboard-list"></span> Lista de pedidos</h4>
    </div>
    <div class="shadow p-3 mb-3 bg-white rounded">
        <table class="table table-light text-center col-10 mx-auto table-sm" style="margin-top:50px">
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
            <td class="table-warning text-danger"><strong>R$ ${(item.total).toFixed(2)}</strong></td>
            <td class="table-warning"><strong>${date}</strong></td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="modalBuscarPedido(this.value)" value=${item.identification}>
                    <span class="fas fa-check"></span> Abrir
                </button>
            </td>
        </tr>`
    }
    codigoHTML += `</tbody>
        </table>
    </div>`

    if (json.data[0] == null) {
        document.getElementById('janela2').innerHTML = `<h5 class="text-center" style="margin-top:40vh;"><span class="fas fa-exclamation-triangle"></span> Não existe pedido em aberto!</h5>`;
        setTimeout(function () { animacaoJanela2(); setTimeout(function () { menuPedido(); }, 100); }, 2000)
    } else {
        document.getElementById('janela2').innerHTML = codigoHTML;
    }

    animacaoSlideDown(['#janela2'])
}

//funcao para verificar se pedido existe
async function buscarPedido(identificacao) {

    await aguardeCarregamento(true)
    let json = await requisicaoGET(`orders/${identificacao}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    recarregarPagina();

    setTimeout(function () {
        if (json.data != null) {
            document.getElementById('valorTotal').innerHTML = `Valor total: <span class="badge badge-success"> R$ ${json.data.total.toFixed(2)}</span>`;
            $('#escondeDados1').slideDown(300);
            for (let item of json.data.items) {
                adicionarItemaoPedido(item.product._id, item.quantity, 'atualizar', item.courtesy ? true : false);
            }
            document.getElementById('observacao').innerHTML = json.data.note;
            $('#escondeDados4').slideDown(300);
            botaoDeConfirmaçãoDePedido(`confirmarAcao('Atualizar este pedido!', 'cadastrarAtualizarPedido(this.value,${identificacao})', 'atualizar');`);
            botaoDeConfirmaçãoDePedido(`confirmarAcao('Reimprimir pedido!', 'cadastrarAtualizarPedido(this.value,${identificacao})', 'atualizar');`);
            botaoDeReimprimirDePedido();
            mensagemDeAviso('Pedido pronto para atualização!')
        } else {
            botaoDeConfirmaçãoDePedido(`confirmarAcao('Cadastrar este pedido!','cadastrarAtualizarPedido(this.value,${identificacao})', 'cadastrar');`);
            $('#escondeDados4').slideDown(300);
            mensagemDeAviso('Pedido pronto para cadastro!')
        }
    }, 300)
}

//funcao para criar sub menu de opcoes
function botaoDeConfirmaçãoDePedido(funcao) {
    let codigoHTML = '';

    codigoHTML += `<button id="botaoConfirmarPedido" onclick="${funcao}" type="button" class="btn btn-primary btn-block" disabled>
        <span class="fas fa-check"></span> Finalizar Pedido
    </button>`

    document.getElementById('botaoFinalizarPedido').innerHTML = codigoHTML;
}

//funcao para criar sub menu de opcoes
function botaoDeReimprimirDePedido() {
    let codigoHTML = '';

    codigoHTML += `<button id="botaoReimprimirPedido" onclick="confirmarAcao('Reimprimir este pedido!','reimprimirPedido();', '');" type="button" class="btn btn-outline-dark btn-block">
        <span class="fas fa-print"></span> Reimprimir Pedido
    </button>`

    document.getElementById('botaoReimprimir').innerHTML = codigoHTML;
}

//funcao responsavel por adicionar o produto/bebida na tabela do pedido
async function adicionarItemaoPedido(idItem, quantidadeItem, pedidoTipo, cortesia) {

    let json = null;

    await aguardeCarregamento(true)
    json = await requisicaoGET(`itemsDesk`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    const existe = VETORDEITENSCLASSEPEDIDO.findIndex((element) => element._id == idItem)

    if (existe == -1) {
        const item = json.data.find((element) => element._id == idItem)
        VETORDEITENSCLASSEPEDIDO.push(item);
        document.getElementById('botaoConfirmarPedido').disabled = false;
        if (pedidoTipo == 'novo') {
            quantidadeItem = parseInt($(quantidadeItem).val());
        }
        gerarTabeladeItensInseridos(item, quantidadeItem, pedidoTipo, cortesia)
    } else {
        mensagemDeErro('Não é possível adicionar pois o mesmo já se encontra no pedido!')
    }
}

//funcao responsavel por criar a tabela com os itens inseridos
function gerarTabeladeItensInseridos(json, quantidadeItem, pedidoTipo, cortesia) {
    let codigoHTML = '';
    const situacao = autenticacaoLogin()

    codigoHTML = `<tr scope="row" id="item${json._id}">
        <td class="col-md-5 table-info" title="${json.name}">
            <strong>
                <span class="fas fa-${json.drink ? 'wine-glass-alt' : 'utensils'}"></span> ${corrigirTamanhoString(30, json.name)}
            </strong>
        </td>
        <td class="col-md-2 table-warning text-danger"><strong>R$${(parseFloat(json.price)).toFixed(2)}</strong></td>
        <td class="col-md-1 table-warning">
            <div class="custom-control custom-switch">`
    if (JSON.parse(situacao).tipo == 'Administrador') {
        if (cortesia) {
            codigoHTML += `<input type="checkbox" class="custom-control-input" id="checkbox${json._id}" checked>`
        } else {
            codigoHTML += `<input type="checkbox" class="custom-control-input" id="checkbox${json._id}">`
        }
    } else {
        codigoHTML += `<input type="checkbox" class="custom-control-input" id="checkbox${json._id}" disabled>`
    }
    codigoHTML += `<label class="custom-control-label" for="checkbox${json._id}"><span class="fab fa-creative-commons-nc"></span></label>
            </div>
        </td>
        <td class="col-md-1 table-warning">
            <input class="form-control col-md-8 form-control-sm mousetrap" id="quantidade${json._id}" type="Number" value=${parseInt(quantidadeItem)}>
        </td>`
    if (pedidoTipo == 'novo') {
        codigoHTML += `<td class="col-md-2">
            <button onclick="removerItem('${json._id}')" class="btn btn-outline-danger btn-sm">
                <span class="fas fa-trash-alt"></span>
            </button>
        </td>`
    }
    codigoHTML += `</tr>`

    $('#tabelaItens').append(codigoHTML);
    $('#escondeDados2').slideDown(500);
    if (pedidoTipo == 'novo') {
        mensagemDeAviso('Item adicionado com sucesso!')
    }
}

//funcao responsavel por remover o item do pedido
function removerItem(identification) {

    const indice = VETORDEITENSCLASSEPEDIDO.findIndex((element) => element._id == identification)

    if (indice > -1) {
        VETORDEITENSCLASSEPEDIDO.splice(indice, 1)
        document.getElementById('tabelaItens').removeChild(document.getElementById(`item${identification}`))
        mensagemDeAviso('Item removido com sucesso!')
    } else {
        mensagemDeErro('Item não existente no pedido!')
    }

}

//funcao responsavel por liberar o menu lateral
function liberarSubMenu() {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalDesbloquearSubMenu" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-danger">
                        <span class="fas fa-exclamation-triangle" style="margin-right:5px;"></span> Atenção
                    </h5>
                </div>
                <div class="modal-body">
                    <p><strong>Ao sair da tela você perderá todos os novos dados do pedido caso não o tenha finalizado! Deseja continuar?</strong></p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Não</button>
                    <button onclick="$('#submenu').slideDown(1000); document.getElementById('mensagemSubMenu').innerHTML=''; retirarPausaAtalho();" type="button" class="btn btn-primary" data-dismiss="modal">Sim</button>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('alert2').innerHTML = codigoHTML;
    $('#modalDesbloquearSubMenu').modal('show');
}

//funcao responsavel por gerar a tela de busca de novo itens para o pedido
async function telaBuscaeExibirItens() {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modalListaItensPedido" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title"><span class="fas fa-utensils"></span> Produtos e Bebidas <span class="fas fa-wine-glass-alt"></span></h5>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="shadow p-3 mb-3 bg-white rounded">
                        <form>
                            <div class="form-row col-6 mx-auto">
                                <input id="nome" type="text" class="form-control form-control-sm col-md-9 mousetrap" placeholder="Nome do produto">
                                <button onclick="if(validaDadosCampo(['#nome'])){$('#resposta').slideUp(300); setTimeout(function(){listaItens('nome')},300);}else{mensagemDeErro('Preencha o campo de busca!'); mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm col-md-3">
                                    <span class="fas fa-search"></span> Buscar
                                </button>
                                <br/>
                                <button onclick="$('#resposta').slideUp(300); setTimeout(function(){listaItens('todos')},300)" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                                    <span class="fas fa-search-plus"></span> Exibir todos
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="shadow p-3 mb-3 bg-white rounded">
                        <div class="dropdown mx-auto col-6">
                            <button class="btn btn-outline-secondary btn-sm btn-block dropdown-toggle" type="button" id="botaocategoriapedido" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="fas fa-filter"></span> Categorias
                            </button>
                            <div class="dropdown-menu" style="border-radius:30px;" aria-labelledby="botaocategoriapedido">
                                <div class="row" style="margin:5px;">
                                    <div class="col" id="col1catpedido">
                                    </div>
                                    <div class="col" id="col2catpedido">
                                    </div>
                                    <div class="col" id="col3catpedido">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col">
                            <div id="respostaItens" style="margin-top: 10px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`


    document.getElementById('modal2').innerHTML = codigoHTML;
    await $('#modalListaItensPedido').modal('show');
    await categoriaProdutoPedido();
}

//funcao responsavel por gerar a parte de categoria de produtos da classe pedido
async function categoriaProdutoPedido() {
    let json = await requisicaoGET(`categories`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } }), aux = 1;

    for (let item of json.data) {
        if (aux == 1) {
            $(`#col${aux}catpedido`).append(`<a class="dropdown-item" onclick="document.getElementById('botaocategoriapedido').value='${item._id}'; listaItens('categoria');" href="#" style="background-color:${item.color}; border-radius:30px; padding:15px;"><h6 style="color:#fff; mix-blend-mode: exclusion;">${item.name}</h6></a>`)
            aux = 2;
        } else if (aux == 2) {
            $(`#col${aux}catpedido`).append(`<a class="dropdown-item" onclick="document.getElementById('botaocategoriapedido').value='${item._id}'; listaItens('categoria');" href="#" style="background-color:${item.color}; border-radius:30px; padding:15px;"><h6 style="color:#fff; mix-blend-mode: exclusion;">${item.name}</h6></a>`)
            aux = 3;
        } else if (aux == 3) {
            $(`#col${aux}catpedido`).append(`<a class="dropdown-item" onclick="document.getElementById('botaocategoriapedido').value='${item._id}'; listaItens('categoria');" href="#" style="background-color:${item.color}; border-radius:30px; padding:15px;"><h6 style="color:#fff; mix-blend-mode: exclusion;">${item.name}</h6></a>`)
            aux = 1;
        }
    }
}

//funcao para criar lista de produtos para adicionar
async function listaItens(tipoBusca) {

    let codigoHTML = ``, json = null;

    if (tipoBusca == 'todos') {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`itemsDesk`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    } else if (tipoBusca == 'nome') {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`itemsDesk/${$('#nome').val()}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    } else if (tipoBusca == 'categoria') {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`categories/${document.getElementById('botaocategoriapedido').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
    }

    codigoHTML += `<div class="shadow p-3 mb-3 bg-white rounded">
        <h5 class="text-center" style="margin-top:5px; margin-bottom:10px"><span class="fas fa-utensils"></span> Lista de Itens <span class="fas fa-wine-glass-alt"></span></h5>
        <div class="col-12 layer1" style="position: relative; height: 25vh; z-index: 1; overflow: scroll; margin-right: 0px; padding: 0px">
            <table class="table table-light table-sm">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>`
    for (let item of json.data) {
        codigoHTML += `<tr>
                            <td class="col-md-5 table-secondary" title="${item.name}">
                                <strong>
                                    <span class="fas fa-${item.drink ? 'wine-glass-alt' : 'utensils'}"></span> ${corrigirTamanhoString(30, item.name)}
                                </strong>
                            </td>
                            <td class="col-md-2 table-warning text-danger"><strong>R$${(item.price).toFixed(2)}</strong></td>
                            <td class="col-md-2 table-warning">
                                <input class="form-control form-control-sm col-md-8 mousetrap" type="Number" value=1 id="quantidadeAdicionar${item._id}" />
                            </td>
                            <td class="col-md-2">
                                <button onclick="if(validaDadosCampo(['#quantidadeAdicionar${item._id}']) && validaValoresCampo(['#quantidadeAdicionar${item._id}'])){adicionarItemaoPedido('${item._id}', '#quantidadeAdicionar${item._id}', 'novo', false)}else{mensagemDeErro('Quantidade inválida para adicionar!'); mostrarCamposIncorrreto(['quantidadeAdicionar${item._id}']);}" class="btn btn-success btn-sm">
                                    <span class="fas fa-plus"></span>
                                </button>
                            </td>
                        </tr>`
    }
    codigoHTML += `</tbody>
            </table>
        </div>
    </div?`

    document.getElementById('respostaItens').innerHTML = codigoHTML;
    $('#respostaItens').slideDown(300);

}

//funcao para requisicao via post com JSON com todos os dados para gravura do arquivo
async function cadastrarAtualizarPedido(tipoRequisicao, identificacao) {
    let aux = true, condicaoComItens = false, condicaoSemQuantidade = true;

    for (let item of VETORDEITENSCLASSEPEDIDO) {
        if (!validaDadosCampo(['#quantidade' + item._id]) || !validaValoresCampo(['#quantidade' + item._id])) {
            condicaoSemQuantidade = false;
            mostrarCamposIncorrreto(['quantidade' + item._id]);
        }
    }

    try {
        let vetorItemSelecionadosPedido = []
        let json = JSON.parse(`{
        "identification":${parseInt(identificacao)},
        "items":[],
        "note":"Nenhuma."
    }`)

        for (let item of VETORDEITENSCLASSEPEDIDO) {
            vetorItemSelecionadosPedido.push(JSON.parse(`{"product":"${item._id}","quantity":${parseInt($('#quantidade' + item._id).val())},"courtesy":${document.getElementById('checkbox' + item._id).checked ? true : false}}`))
        }

        if (validaDadosCampo(['#observacao'])) {
            json.note = ($('#observacao').val()).toString()
        }

        json.items = vetorItemSelecionadosPedido

        if (tipoRequisicao == 'cadastrar') {
            if (vetorItemSelecionadosPedido[0] && condicaoSemQuantidade) {
                await aguardeCarregamento(true)
                let result = await requisicaoPOST(`orders`, json, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                await aguardeCarregamento(false)

                let newOrder = JSON.parse(`{
                "identification":${result.data.order.identification},
                "oldItems": [],
                "type":true
            }`)

                await aguardeCarregamento(true)
                await requisicaoPOST(`printer`, newOrder, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                await aguardeCarregamento(false)

                await mensagemDeAviso("Pedido cadastrado com sucesso!");
                try {
                    if (result.data.stockAlert[0]) {
                        await mensagemEstoque(`O estoque referente ao (s) produto(s) (${result.data.stockAlert.join()}), está acabando, verifique o estoque!`);
                    }
                } catch (error) { }
                await buscarPedido(identificacao);
                await setTimeout(function () { menuPedido(); }, 1500)

            } else if (vetorItemSelecionadosPedido[0]) {
                mensagemDeErro('Não cadastrado, item com quantidade inválida!')
            } else {
                mensagemDeErro('Não cadastrado, pedido sem item!')
            }

        } else {

            if (vetorItemSelecionadosPedido[0] && condicaoSemQuantidade) {

                await aguardeCarregamento(true)

                let jsonDid = await requisicaoGET(`orders/${identificacao}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                let json2 = json, vetorDeItensAtualizarPedido = [];

                delete json2.identification

                let result = await requisicaoPUT(`orders/${identificacao}`, json2, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });

                await aguardeCarregamento(false)

                for (let item of jsonDid.data.items) {
                    vetorDeItensAtualizarPedido.push(JSON.parse(`{
                    "product":"${item.product._id}",
                    "quantity":${item.quantity},
                    "courtesy":${document.getElementById('checkbox' + item.product._id).checked ? true : false}
                }`))
                }

                let updateOrder = JSON.parse(`{
                "identification":${identificacao},
                "oldItems": [],
                "type":false
            }`)

                updateOrder.oldItems = vetorDeItensAtualizarPedido

                await aguardeCarregamento(true)
                await requisicaoPOST(`printer`, updateOrder, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
                await aguardeCarregamento(false)

                try {
                    if (result.data.stockAlert[0]) {
                        await mensagemEstoque(`O estoque referente ao (s) produto(s) (${result.data.stockAlert.join()}), está acabando, verifique o estoque!`);
                    }
                } catch (error) { }
                await mensagemDeAviso("Pedido atualizado com sucesso!");
                await buscarPedido(identificacao);
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

//funcao responsavel por reimprimir o pedido
async function reimprimirPedido() {
    let newOrder = `{
        "identification":${$('#identificacao').val()},
        "oldItems": [],
        "type":true
    }`

    await aguardeCarregamento(true)
    await requisicaoPOST(`printer`, JSON.parse(newOrder), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)
    await mensagemDeAviso("Reimprimindo pedido...");

}

//funcao para inicializar/zerar todos os componentes da tela
function recarregarPagina() {
    document.getElementById('tabelaItens').innerHTML = '';
    document.getElementById('botaoFinalizarPedido').innerHTML = '';
    document.getElementById('valorTotal').innerHTML = '';
    document.getElementById('observacao').innerHTML = '';
    VETORDEITENSCLASSEPEDIDO = [];
}

//funcao responsavel por iniciar os efeitos da pagina pedido
function efeitoPaginaPedido() {
    $('#escondeDados1').slideUp(300);
    $('#escondeDados2').slideUp(300);
    $('#escondeDados4').slideUp(300);
}