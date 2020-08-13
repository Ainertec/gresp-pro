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

    codigoHTML += `<h4 class="text-center"><span class="fas fa-utensils"></span> Buscar produto</h4>
        <div class="card-deck col-8 mx-auto d-block">
            <div class="input-group mb-3">
                <input id="nome" type="text" class="form-control mousetrap" placeholder="Nome do produto">
                <button onclick="if(validaDadosCampo(['#nome'])){buscarProdutos('nome'); animacaoSlideUp(['#resposta']);}else{mensagemDeErro('Preencha o campo nome!');  mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info">
                    <span class="fas fa-search"></span> Buscar
                </button>
                <br/>
                <button onclick="buscarProdutos('todos'); animacaoSlideUp(['#resposta']);" type="button" class="btn btn-outline-info btn-block" style="margin-top:10px;">
                    <span class="fas fa-search-plus"></span> Exibir todos
                </button>
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

    codigoHTML += `<h4 class="text-center" style="margin-top:40px;">Lista de produtos</h4>
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

    json.data.forEach(function (item) {
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
    });
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

//funcao responsavel por gerar a tela de dados do produto
function telaProduto(tipoRequisicao, id) {
    let codigoHTML = ``;

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<h3 class="text-center"><span class="fas fa-utensils"></span> Cadastrar produto</h3>`
    } else {
        codigoHTML += `<h3 class="text-center"><span class="fas fa-utensils"></span> Atualizar produto</h3>`
    }
    codigoHTML += `<form class="card-deck col-9 mx-auto d-block" style="margin-top:30px;">
        <div class="row">
            <div class="col-6" style="margin-top:25px">
                <label>Nome: </label>
                <input id="nome" type="text" class="form-control mousetrap" placeholder="Nome do produto">
            </div>
            <div class="col-3" style="margin-top:25px">
                <label>Quantidade: </label>
                <div class="input-group">
                    <input id="quantidade" type="Number" class="form-control mousetrap" placeholder="Quantidade">
                    <div class="input-group-prepend">
                        <span class="input-group-text">Unid.</span>
                    </div>
                </div>
            </div>
            <div class="col-3" style="margin-top:25px">
                <label>Preço: </label>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">R$</span>
                    </div>
                    <input id="preco" type="Number" class="form-control mousetrap" placeholder="Preço">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col" style="margin-top:25px">
                <label>Descrição: </label>
                <textArea type="text" id="descricao" class="form-control mousetrap" placeholder="Descrição" rows="10">Nenhuma.</textArea>
            </div>
        </div>`

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#descricao']) && validaValoresCampo(['#preco','#quantidade'])){cadastrarProduto();}else{mensagemDeErro('Preencha os campos nome e preço com valores válidos!'); mostrarCamposIncorrreto(['nome','preco','descricao','quantidade']);}" type="button" class="btn btn-primary" style="margin:15px"><span class="fas fa-save"></span> Salvar</button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#descricao']) && validaValoresCampo(['#preco','#quantidade'])){confirmarAcao('Atualizar os dados do produto!', 'atualizaProduto(this.value)','${id}');}else{mensagemDeErro('Preencha todos os campos com valores válidos!');  mostrarCamposIncorrreto(['nome', 'preco','descricao','quantidade']);}" type="button" class="btn btn-success" style="margin:15px"><span class="fas fa-pencil-alt"></span> Atualizar</button>`
        codigoHTML += `<button onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${id}');" type="button" class="btn btn-outline-danger" style="margin:15px"><span class="fas fa-trash-alt"></span> Excluir</button>`
    }

    codigoHTML += `</form>`

    document.getElementById('janela2').innerHTML = codigoHTML;
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