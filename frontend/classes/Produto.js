//------------------------------------------ Classe Produto -----------------------------------------------------------

let VETORDEPRODUTOSCLASSEPRODUTO = [], VETORDEINGREDIENTESCLASSEPRODUTO = [], VETORDECATEGORIASCLASSEPRODUTO = [];

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
        <h4 class="text-center"><span class="fas fa-utensils"></span> Buscar produto <span class="fas fa-wine-glass-alt"></span></h4>
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
        json = await requisicaoGET("itemsDesk/" + $('#nome').val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    } else if (tipoBusca == 'todos') {
        await aguardeCarregamento(true)
        json = await requisicaoGET("itemsDesk", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    }

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center" style="margin-top:40px;">Lista de produtos</h4>
        <table style="margin-top:10px;" class="table table-light table-sm">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço de custo</th>
                    <th scope="col">Preço de venda</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                    <th scope="col">Disponível</th>
                </tr>
            </thead>
            <tbody>`

    for (let item of json.data) {
        VETORDEPRODUTOSCLASSEPRODUTO.push(item)
        codigoHTML += `<tr>
                        <th class="table-info" title="${item.name}">${item.drink ? '<span class="fas fa-wine-glass-alt"></span>' : '<span class="fas fa-utensils"></span>'} ${corrigirTamanhoString(20, item.name)}</th>
                        <th class="table-info" title="${item.description}">${corrigirTamanhoString(40, item.description)}</th>
                        <th class="table-warning"><strong>R$${(item.cost).toFixed(2)}<strong></th>
                        <th class="table-warning text-danger"><strong>R$${(item.price).toFixed(2)}<strong></th>
                        <td class="table-light"><button class="btn btn-primary btn-sm" onclick="carregarDadosProduto('${item._id}');"><span class="fas fa-pencil-alt iconsTam"></span> Editar</button></td>
                        <td class="table-light"><button class="btn btn-outline-danger btn-sm" onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${item._id}');" ><span class="fas fa-trash-alt iconsTam"></span> Excluir</button></td>
                        <td class="table-light">
                            <div class="custom-control custom-switch">`
        if (item.available) {
            codigoHTML += `<input type="checkbox" onclick="this.checked? disponibilizarIndisponibilizarProduto('${item._id}',true) : disponibilizarIndisponibilizarProduto('${item._id}',false) " class="custom-control-input custom-switch" id="botaoselectdisponivel${item._id}" checked=true>`
        } else {
            codigoHTML += `<input type="checkbox" onclick="this.checked? disponibilizarIndisponibilizarProduto('${item._id}',true) : disponibilizarIndisponibilizarProduto('${item._id}',false) " class="custom-control-input custom-switch" id="botaoselectdisponivel${item._id}">`
        }
        codigoHTML += `<label class="custom-control-label" for="botaoselectdisponivel${item._id}">Disponível</label>
                    </div>
                </td>
            </tr>`
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
async function telaProduto(tipoRequisicao, id) {
    let codigoHTML = ``, json = await requisicaoGET(`categories`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });

    codigoHTML += `<div class="modal" id="modalTelaProduto">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title"><span class="fas fa-utensils"></span> Dados do produto <span class="fas fa-wine-glass-alt"></span></h5>
            <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">`
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-utensils"></span> Cadastrar produto <span class="fas fa-wine-glass-alt"></span></h4>`
    } else {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-utensils"></span> Atualizar produto <span class="fas fa-wine-glass-alt"></span></h4>`
    }
    codigoHTML += `<form class="card-deck col-11 mx-auto d-block" style="margin-top:30px;">
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded">
                        <div class="col-6">
                            <label>Nome do produto: </label>
                            <input id="nomeproduto" type="text" class="form-control mousetrap" placeholder="Nome do produto">
                        </div>
                        <div class="col-6">
                            <label>Preço de venda: </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">R$</span>
                                </div>
                                <input id="precovendaproduto" type="Number" class="form-control mousetrap" placeholder="Preço de venda">
                            </div>
                        </div>
                    </div>
                    <div class="row shadow-lg p-3 mb-3 bg-white rounded">
                        <div class="custom-control custom-switch col-6">
                            <input type="checkbox" onclick="this.checked? parteEstoqueTelaDeProduto(true) : parteEstoqueTelaDeProduto(false) " class="custom-control-input custom-switch" id="botaoSelectIngredientes">
                            <label class="custom-control-label" for="botaoSelectIngredientes">Lista de ingredientes</label>
                        </div>
                        <div class="input-group col-6">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="categoriaproduto">Categoria</label>
                            </div>
                            <select class="custom-select" id="categoriaproduto">`
    for (let item of json.data) {
        VETORDECATEGORIASCLASSEPRODUTO.push(item)
        codigoHTML += `<option value="${item._id}" title="${item.name}">${corrigirTamanhoString(20, item.name)}</option>`
    }
    codigoHTML += `</select>
                        </div>
                    </div>
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded" id="opcaoDeEstoqueTelaProduto">
                                                        
                    </div>
                    <div class="row shadow-lg p-3 mb-3 bg-white rounded">
                        <div class="input-group col-8">
                            <div class="input-group-prepend">
                                <label class="input-group-text" for="tipoproduto">Este produto é uma bebida? </label>
                            </div>
                            <select class="custom-select" id="tipoproduto">
                                <option value=false>Não</option>
                                <option value=true>Sim</option>
                            </select>
                        </div>
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
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nomeproduto','#precovendaproduto','#descricao']) && validaValoresCampo(['#precovendaproduto'])){cadastrarProduto(); $('#modalTelaProduto').modal('hide');}else{mensagemDeErro('Preencha os campos nome e preço com valores válidos!'); mostrarCamposIncorrreto(['nomeproduto','precovendaproduto','descricao']);}" type="button" class="btn btn-primary">
            <span class="fas fa-save"></span> Salvar
        </button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nomeproduto','#precovendaproduto','#descricao']) && validaValoresCampo(['#precovendaproduto'])){confirmarAcao('Atualizar os dados do produto!', 'atualizaProduto(this.value)','${id}'); $('#modalTelaProduto').modal('hide');}else{mensagemDeErro('Preencha todos os campos com valores válidos!');  mostrarCamposIncorrreto(['nomeproduto','precovendaproduto','descricao']);}" type="button" class="btn btn-success">
            <span class="fas fa-pencil-alt"></span> Atualizar
        </button>
        <button onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${id}'); $('#modalTelaProduto').modal('hide');" type="button" class="btn btn-outline-danger">
            <span class="fas fa-trash-alt"></span> Excluir
        </button>`
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
async function parteEstoqueTelaDeProduto(tipo) {
    let codigoHTML = ``

    if (tipo) {

        let json = await requisicaoGET(`ingredients`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })

        VETORDEINGREDIENTESCLASSEPRODUTO = []

        codigoHTML += `<div class="form-group mx-auto">
                <label for="quantidadeproduto">Ingredientes/quantidade:</label>
                <div class="col-12" style="position: relative; height: 30vh; z-index: 1; overflow: scroll; margin-right: 0px;">
                    <table class="table">
                        <tbody>`
        for (let item of json.data) {
            codigoHTML += `<tr class="table-info">
                                <td style="width:5vw">
                                <div class="custom-control custom-switch">
                                    <input type="checkbox" onclick="this.checked? adicionarouRemoverIngredienteProduto('adicionar','${item._id}') : adicionarouRemoverIngredienteProduto('remover','${item._id}')" class="custom-control-input custom-switch" id="select${item._id}">
                                    <label class="custom-control-label" for="select${item._id}">Add</label>
                                </div>                                   
                                </td>
                                <td style="width:15vw" title="${item.name}"><span class="fas fa-box"></span> ${corrigirTamanhoString(20, item.name)}</td>
                                <td style="width:15vw" title="Adicione a quantidade gasta na produção do produto!">
                                <div class="input-group input-group-sm">
                                    <input type="Number" class="form-control form-control-sm" id="quanti${item._id}">
                                    <div class="input-group-prepend">`
            if (item.unit == 'u') {
                codigoHTML += `<span class="input-group-text input-group-text">unid.</span>`
            } else {
                codigoHTML += `<span class="input-group-text input-group-text">${item.unit}</span>`
            }
            codigoHTML += `</div>
                                </div>
                                </td>
                            </tr>`
        }
        codigoHTML += `</tbody>
                    </table>
                </div>
            </div>`
    } else {
        codigoHTML += `<div class="col-6">
            <label>Quantidade: </label>
            <div class="input-group">
                <input id="quantidadeproduto" type="Number" class="form-control mousetrap" placeholder="Quantidade">
                <div class="input-group-prepend">
                    <span class="input-group-text">Unid.</span>
                </div>
            </div>
        </div>
        <div class="col-6">
            <label>Preço de custo (unid.): </label>
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text">R$</span>
                </div>
                <input id="precocustoproduto" type="Number" class="form-control mousetrap" placeholder="Preço de custo">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">%</button>
                    <div class="dropdown-menu">`
        for (let i = 5; i <= 90; i += 5) {
            codigoHTML += `<a class="dropdown-item" onclick="calcularValorDeCustoPorPorcentagem(${i});" href="#">${i}%</a>`
        }
        codigoHTML += `</div>
                </div>
            </div>
        </div>`
    }

    document.getElementById('opcaoDeEstoqueTelaProduto').innerHTML = codigoHTML;
}

//funcao responsavel por adicionar ou remover ingredientes no produto
function adicionarouRemoverIngredienteProduto(tipo, id) {
    if (tipo == 'adicionar') {
        if (validaDadosCampo([`#quanti${id}`]) && validaValoresCampo([`#quanti${id}`])) {
            VETORDEINGREDIENTESCLASSEPRODUTO.push(JSON.parse(`{"material":"${id}", "quantity":${parseInt(document.getElementById(`quanti${id}`).value)}}`))
            document.getElementById(`select${id}`).checked = true
        } else {
            document.getElementById(`select${id}`).checked = false
            mensagemDeErro('Preencha o campo quantidade com valores válidos!')
        }
    } else if (tipo == 'remover') {
        const ingredientePosition = VETORDEINGREDIENTESCLASSEPRODUTO.findIndex((element) => element.material == id);
        VETORDEINGREDIENTESCLASSEPRODUTO.splice(ingredientePosition, 1);
    }
}

//funcao responsavel por carregar os dados do produto
async function carregarDadosProduto(id) {

    await aguardeCarregamento(true)
    await telaProduto('atualizar', id);
    await aguardeCarregamento(false)
    const dado = VETORDEPRODUTOSCLASSEPRODUTO.find((element) => element._id == id);

    try {
        document.getElementById('nomeproduto').value = dado.name
        document.getElementById('precovendaproduto').value = (parseFloat(dado.price)).toFixed(2)
        document.getElementById('descricao').value = dado.description
        document.getElementById('tipoproduto').value = dado.drink
        const categoriaExistente = VETORDECATEGORIASCLASSEPRODUTO.find((element) => element.products.findIndex((element1) => element1._id == dado._id) > -1)
        document.getElementById('categoriaproduto').value = categoriaExistente._id
        document.getElementById('categoriaproduto').disabled = true

        if (dado.ingredients != null) {
            await parteEstoqueTelaDeProduto(true)
            document.getElementById('botaoSelectIngredientes').checked = true
            for (let item of dado.ingredients) {
                document.getElementById(`quanti${item.material._id}`).value = parseInt(item.quantity)
                adicionarouRemoverIngredienteProduto('adicionar', item.material._id)
            }
        } else {
            parteEstoqueTelaDeProduto(false)
            document.getElementById('botaoSelectIngredientes').checked = false
            document.getElementById('quantidadeproduto').value = parseInt(dado.stock)
            document.getElementById('precocustoproduto').value = (parseFloat(dado.cost)).toFixed(2)
        }

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
        if (VETORDEINGREDIENTESCLASSEPRODUTO[0] || (document.getElementById('quantidadeproduto') && document.getElementById('precocustoproduto'))) {
            let json = `{
                "name":"${document.getElementById('nomeproduto').value}",
                "price": ${(parseFloat(document.getElementById('precovendaproduto').value)).toFixed(2)},`
            if (VETORDEINGREDIENTESCLASSEPRODUTO[0]) {
                json += `"ingredients":[],`
            } else {
                json += `"stock": ${parseInt(document.getElementById('quantidadeproduto').value)},
                    "cost": ${(parseFloat(document.getElementById('precocustoproduto').value)).toFixed(2)},`
            }
            json += `"drink": ${document.getElementById(`tipoproduto`).value},
                "description":"${document.getElementById('descricao').value}",
                "available":true
            }`

            json = JSON.parse(json)

            if (VETORDEINGREDIENTESCLASSEPRODUTO[0]) {
                json.ingredients = VETORDEINGREDIENTESCLASSEPRODUTO
            }

            await aguardeCarregamento(true)
            result = await requisicaoPOST("items", json, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false)
            await adicionarProdutoEmCategoria(document.getElementById('categoriaproduto').value, result.data._id)
            document.getElementById('modal').innerHTML = ''
            inicializacaoClasseProduto();
        } else {
            mensagemDeErro('Adicione pelo menos um ingrediente!')
        }
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar o produto!')
    }
}

//funcao responsavel por adicionar o produto em uma categoria
async function adicionarProdutoEmCategoria(idCategoria, idProduto) {
    const dado = VETORDECATEGORIASCLASSEPRODUTO.find((element) => element._id == idCategoria);
    dado.products.push(idProduto)
    delete dado._id
    delete dado.createdAt
    delete dado.updatedAt
    delete dado.__v

    await aguardeCarregamento(true)
    await requisicaoPUT(`categories/${idCategoria}`, dado, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
    await aguardeCarregamento(false)
    await mensagemDeAviso("Cadastrado com sucesso!");
}

//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaProduto(id) {
    try {
        if (VETORDEINGREDIENTESCLASSEPRODUTO[0] || (document.getElementById('quantidadeproduto') && document.getElementById('precocustoproduto'))) {
            let json = `{
                "name":"${document.getElementById('nomeproduto').value}",
                "price": ${(parseFloat(document.getElementById('precovendaproduto').value)).toFixed(2)},`
            if (VETORDEINGREDIENTESCLASSEPRODUTO[0]) {
                json += `"ingredients":[],`
            } else {
                json += `"stock": ${parseInt(document.getElementById('quantidadeproduto').value)},
                    "cost": ${(parseFloat(document.getElementById('precocustoproduto').value)).toFixed(2)},`
            }
            json += `"drink": ${document.getElementById(`tipoproduto`).value},
                "description":"${document.getElementById('descricao').value}",
                "available":true
            }`

            json = JSON.parse(json)

            if (VETORDEINGREDIENTESCLASSEPRODUTO[0]) {
                json.ingredients = VETORDEINGREDIENTESCLASSEPRODUTO
            }

            await aguardeCarregamento(true)
            await requisicaoPUT(`items/${id}`, json, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false)
            await mensagemDeAviso('Atualizado com sucesso!');
            await telaBuscarProduto();

        } else {

        }
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}

//funcao responsavel por disponibilizar ou não um produto
async function disponibilizarIndisponibilizarProduto(id, disponivel) {
    const dado = VETORDEPRODUTOSCLASSEPRODUTO.find((element) => element._id == id);

    delete dado._id
    delete dado.createdAt
    delete dado.updatedAt
    delete dado.__v

    if (dado.ingredients != null) {
        delete dado.cost
        delete dado.stock
    } else {
        delete dado.ingredients
    }

    dado.available = disponivel

    await aguardeCarregamento(true)
    await requisicaoPUT(`items/${id}`, dado, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
    await aguardeCarregamento(false)

    if (validaDadosCampo(['#nome'])) {
        await buscarProdutos('nome')
    } else {
        await buscarProdutos('todos')
    }
}

//funcao responsavel por gerar valor de custo a partir de porcentagem do valor de venda
function calcularValorDeCustoPorPorcentagem(porcentagem) {
    let valorCusto = (parseFloat(document.getElementById('precovendaproduto').value ? document.getElementById('precovendaproduto').value : 0.0) * parseInt(porcentagem)) / 100;
    document.getElementById('precocustoproduto').value = valorCusto.toFixed(2);
}

//funcao responsavel por inicializar as variaveis da classe produto
function inicializacaoClasseProduto() {
    VETORDEPRODUTOSCLASSEPRODUTO = [];
    VETORDEINGREDIENTESCLASSEPRODUTO = [];
    VETORDECATEGORIASCLASSEPRODUTO = [];
}