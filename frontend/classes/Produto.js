//------------------------------------------ SELECT -----------------------------------------------------------



let VETORDEPRODUTOSCLASSEPRODUTO = [];




//funcao responsavel por fazer a ligação necessaria com a tela de produtos
function ligacaoProdutoFacede(tipo) {
    if (tipo == 'cadastrar') {
        telaProduto(tipo, null)
    } else if (tipo == 'atualizar') {
        telaBuscarProduto();
    }
}





// tela de visualizacao da lista de produto
function telaBuscarProduto() {
    let codigoHTML = '';

    codigoHTML += '<h4 class="text-center">Buscar</h4>'
    codigoHTML += '<div class="card-deck col-8 mx-auto d-block">'
    codigoHTML += '<div class="input-group mb-3">'
    codigoHTML += '<input id="nome" type="text" class="form-control mousetrap" placeholder="Nome Produto">'
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nome'])){buscarProdutos('nome'); animacaoSlideUp(['#resposta']);}else{mensagemDeErro('Preencha o campo nome!');  mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info">`
    codigoHTML += '<span class="fas fa-search"></span> Buscar'
    codigoHTML += '</button>'
    codigoHTML += '<br/>'
    codigoHTML += `<button onclick="buscarProdutos('todos'); animacaoSlideUp(['#resposta']);" type="button" class="btn btn-outline-info btn-block" style="margin-top:10px;">`
    codigoHTML += '<span class="fas fa-search-plus"></span> Exibir todos'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<div id="resposta"></div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}





//funcao responsavel por buscar os produtos selecionados
async function buscarProdutos(tipoBusca) {
    let codigoHTML = '', json = null;

    if (tipoBusca == 'nome') {
        json = await requisicaoGET("products/?name=" + $('#nome').val())
    } else if (tipoBusca == 'todos') {
        json = await requisicaoGET("products/")
    }

    codigoHTML += '<h4 class="text-center" style="margin-top:40px;">Lista</h4>'
    codigoHTML += '<table style="margin-top:10px;" class="table table-light table-sm">'
    codigoHTML += '<thead class="thead-dark">'
    codigoHTML += '<tr><th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th><th scope="col">Editar</th><th scope="col">Excluir</th></tr>'
    codigoHTML += '</thead>'
    codigoHTML += '<tbody>'
    json.data.forEach(function (item) {
        VETORDEPRODUTOSCLASSEPRODUTO.push(item)
        codigoHTML += '<tr>'
        codigoHTML += `<th class="table-info">${corrigirTamanhoString(20, item.name)}</th>`
        codigoHTML += `<td class="table-info">${corrigirTamanhoString(40, item.description)}</td>`
        codigoHTML += `<td class="table-warning text-danger"><strong>R$${(item.price).toFixed(2)}<strong></td>`
        codigoHTML += `<th class="table-light"><button class="btn btn-primary" onclick="telaProduto('atualizar', '${item._id}'); carregarDadosProduto('${item._id}');"><span class="fas fa-pencil-alt iconsTam"></span></button></td>`
        codigoHTML += `<th class="table-light"><button class="btn btn-outline-danger" onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${item._id}');" ><span class="fas fa-trash-alt iconsTam"></span></button></td>`
        codigoHTML += '</tr>'
    });
    codigoHTML += '</tbody>'
    codigoHTML += '</table>'


    document.getElementById('resposta').innerHTML = codigoHTML;
    setTimeout(function () {
        animacaoSlideDown(['#resposta']);
    }, 300);

}





//funcao responsavel por gerar a tela de dados do produto
function telaProduto(tipoRequisicao, id) {
    let codigoHTML = '';

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += '<h3 class="text-center">Cadastrar</h3>'
    } else {
        codigoHTML += '<h3 class="text-center">Atualizar</h3>'
    }
    codigoHTML += '<form class="card-deck col-8 mx-auto d-block" style="margin-top:30px;">'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col-8" style="margin-top:25px">'
    codigoHTML += '<label>Nome: </label><input id="nome" type="text" class="form-control mousetrap" placeholder="Nome">'
    codigoHTML += '</div>'
    codigoHTML += '<div class="col-4" style="margin-top:25px">'
    codigoHTML += '<label>Preço: </label><input id="preco" type="Number" class="form-control mousetrap" placeholder="Preço">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col" style="margin-top:25px">'
    codigoHTML += '<label>Descrição: </label><textArea type="text" id="descricao" class="form-control mousetrap" placeholder="Descrição"></textArea>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco']) && validaValoresCampo(['#preco'])){cadastrarProduto();}else{mensagemDeErro('Preencha os campos nome e preço com valores válidos!'); mostrarCamposIncorrreto(['nome', 'preco']);}" type="button" class="btn btn-primary" style="margin:15px"><span class="fas fa-save"></span> Salvar</button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco']) && validaValoresCampo(['#preco'])){confirmarAcao('Atualizar os dados do produto!', 'atualizaProduto(this.value)','${id}');}else{mensagemDeErro('Preencha todos os campos com valores válidos!');  mostrarCamposIncorrreto(['nome', 'preco']);}" type="button" class="btn btn-success" style="margin:15px"><span class="fas fa-pencil-alt"></span> Atualizar</button>`
        codigoHTML += `<button onclick="confirmarAcao('Excluir os dados do produto permanentemente!', 'deletarProduto(this.value)', '${id}');" type="button" class="btn btn-outline-danger" style="margin:15px"><span class="fas fa-trash-alt"></span> Excluir</button>`
    }

    codigoHTML += '</form>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}





//funcao responsavel por carregar os dados do produto
function carregarDadosProduto(id) {
    VETORDEPRODUTOSCLASSEPRODUTO.forEach(function (item) {
        if (item._id == id) {
            setTimeout(function () {
                document.getElementById('nome').value = item.name
                document.getElementById('preco').value = item.price
                document.getElementById('descricao').value = item.description
            }, 300)
        }
    });
}






//chamada de funcao de requisicao delete enviando Id da opcao selecionada
function deletarProduto(id) {
    if (id != null) {
        try {
            requisicaoDELETE("products/", (id).toString());
            mensagemDeAviso("Excluido com sucesso!");
            telaBuscarProduto();
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
        var json = `{"name": "${($('#nome').val()).toString()}",`
        json += `"price": ${parseFloat($('#preco').val())},`
        json += `"description": "${($('#descricao').val()).toString()}"}`

        await requisicaoPOST("products/", JSON.parse(json));
        mensagemDeAviso("Cadastrado com sucesso!");
        telaProduto('cadastrar', null)
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar!')
    }
}






//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaProduto(id) {
    try {
        var json = `{"name": "${($('#nome').val()).toString()}",`
        json += `"price": ${parseFloat($('#preco').val())},`
        json += `"description": "${($('#descricao').val()).toString()}"}`

        await requisicaoPUT("products/" + id, JSON.parse(json));
        mensagemDeAviso('Atualizado com sucesso!');
        telaBuscarProduto();
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}


