//------------------------------------------ Classe Produto -----------------------------------------------------------

let VETORDEPRODUTOSCLASSEPRODUTO = [];

//funcao responsavel por fazer a ligação necessaria com a tela de produtos
function ligacaoProdutoFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        if (tipo == 'cadastrar') {
            telaProduto(tipo, null)
        } else if (tipo == 'atualizar') {
            telaBuscarProduto();
        }
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

// tela de visualizacao da lista de produto
function telaBuscarProduto() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center"><span class="fas fa-utensils"></span> Buscar produto</h4>
        <div class="card-deck col-6 mx-auto d-block">
            <div class="input-group mb-3">
                <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do produto">
                <button onclick="if(validaDadosCampo(['#nome'])){buscarProdutos('nome'); animacaoSlideUp(['#resposta']);}else{mensagemDeErro('Preencha o campo nome!');  mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
                    <span class="fas fa-search"></span> Buscar
                </button>
                <br/>
                <button onclick="buscarProdutos('todos'); animacaoSlideUp(['#resposta']);" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                    <span class="fas fa-search-plus"></span> Exibir todos
                </button>
            </div>
        </div>
    </div>
    <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por buscar os produtos selecionados
async function buscarProdutos(tipoBusca) {
    let codigoHTML = ``, json = null;

    VETORDEPRODUTOSCLASSEPRODUTO = []

    if (tipoBusca == 'nome') {
        await aguardeCarregamento(true)
        json = await requisicaoGET("items/" + $('#nome').val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    } else if (tipoBusca == 'todos') {
        await aguardeCarregamento(true)
        json = await requisicaoGET("items", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    }

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center" style="margin-top:40px;">Lista de produtos</h4>
        <table style="margin-top:10px;" class="table table-light table-sm">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Preço</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody>`

    for (let item of json.data) {
        if (!item.drink) {
            VETORDEPRODUTOSCLASSEPRODUTO.push(item)
            codigoHTML += `<tr>
                        <th class="table-info" title="${item.name}"><span class="fas fa-utensils"></span> ${corrigirTamanhoString(20, item.name)}</th>
                        <td class="table-info" title="${item.description}">${corrigirTamanhoString(40, item.description)}</td>`
            if (item.stock != null) {
                codigoHTML += `<td class="table-primary"><strong>${item.stock} Unid.</strong></td>`
            } else {
                codigoHTML += `<td class="table-primary text-danger"><strong>0 Unid.</strong></td>`
            }
            codigoHTML += `<td class="table-warning text-danger"><strong>R$${(item.price).toFixed(2)}<strong></td>
                            <th class="table-light"><button class="btn btn-primary btn-sm" onclick="carregarDadosProduto('${item._id}');"><span class="fas fa-pencil-alt iconsTam"></span> Editar</button></td>
                            <th class="table-light"><button class="btn btn-outline-danger btn-sm" onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${item._id}');" ><span class="fas fa-trash-alt iconsTam"></span> Excluir</button></td>
                        </tr>`
        }
    }
    codigoHTML += `</tbody>
        </table>
    </div>`

    if (json.data[0] == null) {
        document.getElementById('resposta').innerHTML = `<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto encontrado!</h5>`;
    } else {
        document.getElementById('resposta').innerHTML = codigoHTML;
    }
    setTimeout(function () {
        animacaoSlideDown(['#resposta']);
    }, 300);

}

//funcao responsavel por gerar a tela de dados do produto
function telaProduto(tipoRequisicao, id) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modalTelaProduto">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title"><span class="fas fa-utensils"></span> Dados do produto</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">`
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-utensils"></span> Cadastrar produto</h4>`
    } else {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-utensils"></span> Atualizar produto</h4>`
    }
    codigoHTML += `<form class="card-deck col-11 mx-auto d-block" style="margin-top:30px;">
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded">
                        <div class="col-6">
                            <label>Nome do produto: </label>
                            <input id="nome" type="text" class="form-control mousetrap" placeholder="Nome do produto">
                        </div>
                        <div class="col-6">
                            <label>Preço de venda: </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">R$</span>
                                </div>
                                <input id="preco" type="Number" class="form-control mousetrap" placeholder="Preço">
                            </div>
                        </div>
                    </div>
                    <div class="row shadow-lg p-3 mb-3 bg-white rounded">
                        <div class="custom-control custom-switch col-6">
                            <input type="checkbox" onclick="this.checked? parteEstoqueTelaDeProduto(true) : parteEstoqueTelaDeProduto(false) " class="custom-control-input custom-switch" id="botaoSelectClientephoneaddress">
                            <label class="custom-control-label" for="botaoSelectClientephoneaddress">Lista de ingredientes</label>
                        </div>
                        <div class="input-group col-6">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="inputGroupSelect01">Categorias</label>
                            </div>
                            <select class="custom-select" id="inputGroupSelect01">
                                <option value="1">Porções</option>
                                <option value="2">Sobremesas</option>
                            </select>
                        </div>
                    </div>
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded" id="opcaoDeEstoqueTelaProduto">
                                                        
                    </div>
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded">
                        <div class="col">
                            <label>Descrição: </label>
                            <textArea type="text" id="descricao" class="form-control mousetrap" placeholder="Descrição" rows="5">Nenhuma.</textArea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">`
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#descricao']) && validaValoresCampo(['#preco','#quantidade'])){cadastrarProduto();}else{mensagemDeErro('Preencha os campos nome e preço com valores válidos!'); mostrarCamposIncorrreto(['nome','preco','descricao','quantidade']);}" type="button" class="btn btn-primary"><span class="fas fa-save"></span> Salvar</button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#descricao']) && validaValoresCampo(['#preco','#quantidade'])){confirmarAcao('Atualizar os dados do produto!', 'atualizaProduto(this.value)','${id}');}else{mensagemDeErro('Preencha todos os campos com valores válidos!');  mostrarCamposIncorrreto(['nome', 'preco','descricao','quantidade']);}" type="button" class="btn btn-success"><span class="fas fa-pencil-alt"></span> Atualizar</button>`
        codigoHTML += `<button onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${id}');" type="button" class="btn btn-outline-danger"><span class="fas fa-trash-alt"></span> Excluir</button>`
    }
    codigoHTML += `</div>
        </div>
        </div>
    </div>`


    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modalTelaProduto').modal('show')
    parteEstoqueTelaDeProduto(false)
}

//funcao responsavel por gerar a selecao da tela de produto sobre estoque
function parteEstoqueTelaDeProduto(tipo) {
    let codigoHTML = ``

    if (tipo) {
        codigoHTML += `<div class="form-group mx-auto">
                <label for="quantidadeproduto">Ingredientes/quantidade:</label>
                <div class="col-12" style="position: relative; height: 30vh; z-index: 1; overflow: scroll; margin-right: 0px;">
                    <table class="table">
                        <tbody>
                            <tr class="table-info">
                                <td style="width:5vw">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" onclick="this.checked? adicionarIngredienteaoProduto('', 'cadastrar', null) : removerIngredientedoProduto('')" class="custom-control-input custom-switch" id="select">
                                    <label class="custom-control-label" for="select">Add</label>
                                </div>                                   
                                </td>
                                <td style="width:15vw" title="Teste"><span class="fas fa-box"></span> Teste</td>
                                <td style="width:15vw" title="Adicione a quantidade gasta na produção do produto!">
                                <div class="input-group input-group-sm">
                                    <input type="Number" class="form-control form-control-sm" id="quanti">
                                    <div class="input-group-prepend">
                                    <span class="input-group-text input-group-text">unid.</span>
                                    </div>
                                </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>`
    } else {
        codigoHTML += `<div class="col-6">
            <label>Quantidade: </label>
            <div class="input-group">
                <input id="quantidade" type="Number" class="form-control mousetrap" placeholder="Quantidade">
                <div class="input-group-prepend">
                    <span class="input-group-text">Unid.</span>
                </div>
            </div>
        </div>
        <div class="col-6">
            <label>Preço de custo: </label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">R$</span>
                </div>
                <input id="preco" type="Number" class="form-control mousetrap" placeholder="Preço">
            </div>
        </div>`
    }

    document.getElementById('opcaoDeEstoqueTelaProduto').innerHTML = codigoHTML;
}

//funcao responsavel por carregar os dados do produto
async function carregarDadosProduto(id) {

    await aguardeCarregamento(true)
    await telaProduto('atualizar', id);
    await aguardeCarregamento(false)
    const dado = VETORDEPRODUTOSCLASSEPRODUTO.find((element) => element._id == id);
    try {
        document.getElementById('nome').value = dado.name
        document.getElementById('preco').value = (parseFloat(dado.price)).toFixed(2)
        if (dado.stock) {
            document.getElementById('quantidade').value = parseInt(dado.stock)
        }
        document.getElementById('descricao').value = dado.description
    } catch (error) {
        mensagemDeErro('Não foi possível carregar os dados do produto!')
    }
}

//chamada de funcao de requisicao delete enviando Id da opcao selecionada
async function deletarProduto(id) {
    if (id != null) {
        try {
            await aguardeCarregamento(true)
            await requisicaoDELETE("items/", (id).toString(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false)
            await mensagemDeAviso("Excluido com sucesso!");
            await telaBuscarProduto();
        } catch (error) {
            mensagemDeErro('Não foi possivel excluir!')
        }
    } else {
        mensagemDeErro('Preencha o campo ID!')
    }
}

//chamada de funcao de requisicao create enviando dados em formato JSON para gravura
async function cadastrarProduto() {
    try {
        var json = `{
            "name": "${($('#nome').val()).toString()}",
            "price": ${parseFloat($('#preco').val())},
            "drink": false,`
        if (validaValoresCampo(['#quantidade']) && validaDadosCampo(['#quantidade'])) {
            json += `"stock": ${parseInt($('#quantidade').val())},`
        }
        json += `"description": "${($('#descricao').val()).toString()}"
        }`

        await aguardeCarregamento(true)
        await requisicaoPOST("items", JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso("Cadastrado com sucesso!");
        await telaProduto('cadastrar', null)
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar o produto!')
    }
}

//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaProduto(id) {
    try {
        var json = `{
            "name": "${($('#nome').val()).toString()}",
            "price": ${parseFloat($('#preco').val())},
            "drink": false,`
        if (validaValoresCampo(['#quantidade']) && validaDadosCampo(['#quantidade'])) {
            json += `"stock": ${parseInt($('#quantidade').val())},`
        }
        json += `"description": "${($('#descricao').val()).toString()}"
        }`

        await aguardeCarregamento(true)
        await requisicaoPUT("items/" + id, JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso('Atualizado com sucesso!');
        await telaBuscarProduto();
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}