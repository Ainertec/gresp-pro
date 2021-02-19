//------------------------------------------ Classe Categoria -----------------------------------------------------------

let VETORDECATEGORIACLASSECATEGORIA = [];

//funcao responsavel por fazer a ligação necessaria com a tela de categoria
function ligacaoCategoriaFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        if (tipo == 'cadastrar') {
            telaCategoria(tipo, null)
        } else if (tipo == 'atualizar') {
            telaBuscarCategoria();
        }
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

// tela de visualizacao da lista de categorias
function telaBuscarCategoria() {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
        <h4 class="text-center"><span class="fas fa-filter"></span> Lista de categorias</h4>
        <div id="resposta"></div>
    </div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
    buscarCategoria();
}

//funcao responsavel por buscar as categorias selecionadas
async function buscarCategoria() {
    let codigoHTML = ``, json = null;

    VETORDECATEGORIACLASSECATEGORIA = []

    await aguardeCarregamento(true)
    json = await requisicaoGET("categories", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
    await aguardeCarregamento(false)

    codigoHTML += `<table style="margin-top:5vh;" class="table table-light table-sm">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Cor de referencia</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Excluir</th>
                </tr>
            </thead>
            <tbody>`

    for (let item of json.data) {
        VETORDECATEGORIACLASSECATEGORIA.push(item)
        codigoHTML += `<tr>
                <th title="${item.name}">
                    <span class="fas fa-filter"></span> ${corrigirTamanhoString(20, item.name)}
                </th>
                <th>
                    <div style="background-color:${item.color}; width:60px; height:20px; border-radius:5px;"></div>
                </th>
                <th class="table-light" style="width:10vw;">
                    <button class="btn btn-primary btn-sm" onclick="carregarDadosCategoria('${item._id}');">
                        <span class="fas fa-pencil-alt iconsTam"></span> Editar
                    </button>
                </td>
                <th class="table-light" style="width:10vw;">
                    <button class="btn btn-outline-danger btn-sm" onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${item._id}');" >
                        <span class="fas fa-trash-alt iconsTam"></span> Excluir
                    </button>
                </td>
            </tr>`
    }
    codigoHTML += `</tbody>
        </table>`

    if (json.data[0] == null) {
        document.getElementById('resposta').innerHTML = `<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto encontrado!</h5>`;
    } else {
        document.getElementById('resposta').innerHTML = codigoHTML;
    }
    setTimeout(function () {
        animacaoSlideDown(['#resposta']);
    }, 300);

}

//funcao responsavel por gerar a tela de dados da categoria
function telaCategoria(tipoRequisicao, id) {
    let codigoHTML = ``;

    codigoHTML += `<div class="modal" id="modaltelacategoria">
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title"><span class="fas fa-filter"></span> Dados da categoria</h5>
            <button type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">`
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-filter"></span> Cadastrar categoria</h4>`
    } else {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-filter"></span> Atualizar categoria</h4>`
    }
    codigoHTML += `<form class="card-deck col-11 mx-auto d-block" style="margin-top:30px;">
                    <div class="row shadow-lg p-3 mb-4 bg-white rounded">
                        <div class="col-6">
                            <label>Nome da categoria: </label>
                            <input id="nome" type="text" class="form-control mousetrap" placeholder="Nome da categoria">
                        </div>
                        <div class="col-6">
                            <label>Cor da categoria: </label>
                            <input id="color" type="color" class="form-control mousetrap">
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">`
    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#color'])){cadastrarCategoria(); $('#modaltelacategoria').modal('hide');}else{mensagemDeErro('Preencha os campos nome e preço com valores válidos!'); mostrarCamposIncorrreto(['nome','color']);}" type="button" class="btn btn-primary"><span class="fas fa-save"></span> Salvar</button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#color'])){confirmarAcao('Atualizar os dados do produto!', 'atualizaCategoria(this.value)','${id}'); $('#modaltelacategoria').modal('hide');}else{mensagemDeErro('Preencha todos os campos com valores válidos!'); mostrarCamposIncorrreto(['nome', 'color']);}" type="button" class="btn btn-success"><span class="fas fa-pencil-alt"></span> Atualizar</button>`
        codigoHTML += `<button onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarCategoria(this.value)', '${id}'); $('#modaltelacategoria').modal('hide');" type="button" class="btn btn-outline-danger"><span class="fas fa-trash-alt"></span> Excluir</button>`
    }
    codigoHTML += `</div>
        </div>
        </div>
    </div>`


    document.getElementById('modal').innerHTML = codigoHTML;
    $('#modaltelacategoria').modal('show')
}

//funcao responsavel por carregar os dados da categoria
async function carregarDadosCategoria(id) {

    await aguardeCarregamento(true)
    await telaCategoria('atualizar', id);
    await aguardeCarregamento(false)
    const dado = VETORDECATEGORIACLASSECATEGORIA.find((element) => element._id == id);
    try {
        document.getElementById('nome').value = dado.name
        document.getElementById('color').value = dado.color
    } catch (error) {
        mensagemDeErro('Não foi possível carregar os dados do produto!')
    }
}

//chamada de funcao de requisicao delete enviando Id da opcao selecionada
async function deletarCategoria(id) {
    if (id != null) {
        try {
            await aguardeCarregamento(true)
            await requisicaoDELETE(`categories/`, (id).toString(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
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
async function cadastrarCategoria() {
    try {
        var json = `{
            "name": "${document.getElementById('nome').value}",
            "color": "${document.getElementById('color').value}",
            "products":[]
        }`

        await aguardeCarregamento(true)
        await requisicaoPOST(`categories`, JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso("Cadastrado com sucesso!");
        document.getElementById('modal').innerHTML = ''
        await telaCategoria('cadastrar', null)
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar o produto!')
    }
}

//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaCategoria(id) {
    try {
        const json = VETORDECATEGORIACLASSECATEGORIA.find((element) => element._id == id);
        json.name = document.getElementById('nome').value
        json.color = document.getElementById('color').value
        delete json._id
        delete json.createdAt
        delete json.updatedAt
        delete json.__v

        await aguardeCarregamento(true)
        await requisicaoPUT(`categories/${id}`, json, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso('Atualizado com sucesso!');
        document.getElementById('modal').innerHTML = ''
        await telaBuscarCategoria();
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}