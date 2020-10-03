//------------------------------------------ Classe Ingredientes -----------------------------------------------------------

let VETORDEINGREDIENTESCLASSEINGREDIENTE = [];

//funcao responsavel por fazer a ligação necessaria com a tela de ingrediente
function ligacaoIngredienteFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        if (tipo == 'cadastrar') {
            telaIngrediente(tipo, null)
        } else if (tipo == 'atualizar') {
            telaBuscarIngrediente();
        }
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

// tela de visualizacao da lista de ingrediente
function telaBuscarIngrediente() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center"><span class="fas fa-carrot"></span> Buscar ingredientes</h4>
        <div class="card-deck col-6 mx-auto d-block">
            <div class="input-group mb-3">
                <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do ingrediente">
                <button onclick="if(validaDadosCampo(['#nome'])){buscarIngrediente('nome');}else{mensagemDeErro('Preencha o campo nome!'); mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
                    <span class="fas fa-search"></span> Buscar
                </button>
                <br/>
                <button onclick="buscarIngrediente('todos');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                    <span class="fas fa-search-plus"></span> Exibir todos
                </button>
            </div>
        </div>
    </div>
    <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por buscar os ingrediente selecionados
async function buscarIngrediente(tipo) {
    let codigoHTML = ``, json = null;

    VETORDEINGREDIENTESCLASSEINGREDIENTE = []

    if (tipo == 'nome') {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`ingredients/${document.getElementById('nome').value}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    } else if (tipo == 'todos') {
        await aguardeCarregamento(true)
        json = await requisicaoGET(`ingredients`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    }

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h5 class="text-center"><span class="fas fa-carrot"></span> Lista de ingredientes</h5>
        <table style="margin-top:5vh;" class="table table-light table-sm">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Preço por unidade</th>
                    <th scope="col">Preço de custo</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody>`

    for (let item of json.data) {
        VETORDEINGREDIENTESCLASSEINGREDIENTE.push(item)
        codigoHTML += `<tr>
                <th class="table-warning" title="${item.name}"> 
                    <span class="fas fa-carrot"></span> ${corrigirTamanhoString(20, item.name)}
                </th>
                <th class="table-warning" title="${item.description}"> 
                    ${corrigirTamanhoString(20, item.description)}
                </th>
                <th class="table-warning"> 
                    R$${(parseFloat(item.priceUnit)).toFixed(2)}
                </th>
                <th class="table-warning text-danger"> 
                    R$${(parseFloat(item.price)).toFixed(2)}
                </th>
                <td class="table-light">
                    <button class="btn btn-primary btn-sm" onclick="carregarDadosIngrediente('${item._id}');">
                        <span class="fas fa-pencil-alt iconsTam"></span> Editar
                    </button>
                </td>
                <td class="table-light">
                    <button class="btn btn-outline-danger btn-sm" onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${item._id}');" >
                        <span class="fas fa-trash-alt iconsTam"></span> Excluir
                    </button>
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

//funcao responsavel por gerar a tela de dados do ingrediente
function telaIngrediente(tipoRequisicao, id) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modaltelaingrediente">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title"><span class="fas fa-carrot"></span> Dados do ingrediente</h5>
            <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">`
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-carrot"></span> Criar ingrediente</h4>`
    } else {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-carrot"></span> Atualizar ingrediente</h4>`
    }
    codigoHTML += `<form class="card-deck col-11 mx-auto d-block" style="margin-top:30px;">
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded">
                        <div class="col-6">
                            <label>Nome do ingrediente: </label>
                            <input id="nomeingrediente" type="text" class="form-control mousetrap" placeholder="Nome do ingrediente">
                        </div>
                        <div class="col-6">
                            <label>Preço de custo: </label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">R$</span>
                                </div>
                                <input id="precocustoingrediente" type="Number" class="form-control mousetrap" placeholder="Preço de custo">
                            </div>
                        </div>
                    </div>
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded">
                        <div class="col-6">
                            <label>Quantidade: </label>
                            <input id="quantidadeingrediente" type="Number" class="form-control mousetrap" placeholder="Quantidade">
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label for="unidademedidaingrediente">Unidade de medida: </label>
                                <select class="form-control" id="unidademedidaingrediente">
                                    <option value="g">G (Grama)</option>
                                    <option value="ml">ML (Mililitro)</option>
                                    <option value="u">Unid. (Unidade)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded">
                        <div class="col">
                            <label>Descrição: </label>
                            <textArea type="text" id="descricaoingrediente" class="form-control mousetrap" placeholder="Descrição" rows="5">Nenhuma.</textArea>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">`
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nomeingrediente','#precocustoingrediente','#quantidadeingrediente','#descricaoingrediente']) && validaValoresCampo(['#precocustoingrediente','#quantidadeingrediente'])){cadastrarIngrediente(); $('#modaltelaingrediente').modal('hide');}else{mensagemDeErro('Preencha os campos nome e preço com valores válidos!'); mostrarCamposIncorrreto(['nomeingrediente','precocustoingrediente','quantidadeingrediente','descricaoingrediente']);}" type="button" class="btn btn-primary">
                <span class="fas fa-save"></span> Salvar
            </button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nomeingrediente','#precocustoingrediente','#quantidadeingrediente','#descricaoingrediente']) && validaValoresCampo(['#precocustoingrediente','#quantidadeingrediente'])){confirmarAcao('Atualizar os dados do produto!', 'atualizaIngrediente(this.value)','${id}'); $('#modaltelaingrediente').modal('hide');}else{mensagemDeErro('Preencha todos os campos com valores válidos!'); mostrarCamposIncorrreto(['nomeingrediente','precocustoingrediente','quantidadeingrediente','descricaoingrediente']);}" type="button" class="btn btn-success">
            <span class="fas fa-pencil-alt"></span> Atualizar
        </button>
        <button onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarIngrediente(this.value)', '${id}'); $('#modaltelaingrediente').modal('hide');" type="button" class="btn btn-outline-danger">
            <span class="fas fa-trash-alt"></span> Excluir
        </button>`
    }
    codigoHTML += `</div>
        </div>
        </div>
    </div>`


    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modaltelaingrediente').modal('show')
}

//funcao responsavel por carregar os dados do ingrediente
async function carregarDadosIngrediente(id) {

    await aguardeCarregamento(true)
    await telaIngrediente('atualizar', id);
    await aguardeCarregamento(false)
    const dado = VETORDEINGREDIENTESCLASSEINGREDIENTE.find((element) => element._id == id);
    try {
        document.getElementById('nomeingrediente').value = dado.name
        document.getElementById('precocustoingrediente').value = (parseFloat(dado.price)).toFixed(2)
        document.getElementById('quantidadeingrediente').value = parseInt(dado.stock)
        document.getElementById('unidademedidaingrediente').value = dado.unit
        document.getElementById('descricaoingrediente').value = dado.description
    } catch (error) {
        mensagemDeErro('Não foi possível carregar os dados do produto!')
    }
}

//chamada de funcao de requisicao delete enviando Id da opcao selecionada
async function deletarIngrediente(id) {
    if (id != null) {
        try {
            await aguardeCarregamento(true)
            await requisicaoDELETE(`ingredients/`, (id).toString(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false)
            await mensagemDeAviso("Excluido com sucesso!");
            document.getElementById('modal').innerHTML = ''
            await telaBuscarCategoria();
        } catch (error) {
            mensagemDeErro('Não foi possivel excluir!')
        }
    } else {
        mensagemDeErro('Preencha o campo ID!')
    }
}

//chamada de funcao de requisicao create enviando dados em formato JSON para gravura
async function cadastrarIngrediente() {
    try {
        var json = `{
            "name":"${document.getElementById('nomeingrediente').value}",
            "price":${(parseFloat(document.getElementById('precocustoingrediente').value)).toFixed(2)},
            "stock":${parseInt(document.getElementById('quantidadeingrediente').value)},
            "unit":"${document.getElementById('unidademedidaingrediente').value}",
            "description":"${document.getElementById('descricaoingrediente').value}"
        }`

        await aguardeCarregamento(true)
        await requisicaoPOST(`ingredients`, JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso("Cadastrado com sucesso!");
        document.getElementById('modal').innerHTML = ''
        await telaIngrediente('cadastrar', null)
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar o produto!')
    }
}

//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaIngrediente(id) {
    try {
        const json = VETORDEINGREDIENTESCLASSEINGREDIENTE.find((element) => element._id == id);
        json.name = document.getElementById('nomeingrediente').value
        json.price = (parseFloat(document.getElementById('precocustoingrediente').value)).toFixed(2)
        json.stock = parseInt(document.getElementById('quantidadeingrediente').value)
        json.unit = document.getElementById('unidademedidaingrediente').value
        json.description = document.getElementById('descricaoingrediente').value
        delete json._id
        delete json.createdAt
        delete json.updatedAt
        delete json.__v
        delete json.priceUnit

        await aguardeCarregamento(true)
        await requisicaoPUT(`ingredients/${id}`, json, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso('Atualizado com sucesso!');
        document.getElementById('modal').innerHTML = ''
        await telaBuscarIngrediente();
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}