// --------------------------------------------- Classe Bebida -----------------------------------------------------



let VETORDEBEBIDASCLASSEBEBIDA = []



//funcao responsavel por fazer a ligação necessaria com a tela de bebida
function ligacaoBebidaFacede(tipo) {
    if (tipo == 'cadastrar') {
        telaBebida(tipo, null);
    } else if (tipo == 'atualizar') {
        telaBuscarBebida();
    }
}



// tela de visualizacao de bebida
function telaBuscarBebida() {
    let codigoHTML = '';

    codigoHTML += '<h4 class="text-center">Buscar</h4>'
    codigoHTML += '<div class="card-deck col-8 mx-auto d-block">'
    codigoHTML += '<div class="input-group mb-3">'
    codigoHTML += '<input id="nome" type="text" class="form-control mousetrap" placeholder="Nome Produto">'
    codigoHTML += `<button onclick="if(validaDadosCampo(['#nome'])){buscarBebida('nome'); animacaoSlideUp(['#resposta']);}else{mensagemDeErro('Preencha o campo de busca!'); mostrarCamposIncorrreto(['nome'])}" type="button" class="btn btn-outline-info">`
    codigoHTML += '<span class="fas fa-search"></span> Buscar'
    codigoHTML += '</button>'
    codigoHTML += '<br/>'
    codigoHTML += `<button onclick="buscarBebida('todos'); animacaoSlideUp(['#resposta']);" type="button" class="btn btn-outline-info btn-block" style="margin-top:10px;">`
    codigoHTML += '<span class="fas fa-search-plus"></span> Exibir todos'
    codigoHTML += '</button>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<div id="resposta"></div>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}



//funcao responsavel por buscar as bebidas e exibir a lista
async function buscarBebida(tipoBusca) {
    let codigoHTML = '', json = null;

    if (tipoBusca == 'nome') {
        json = await requisicaoGET("drinkables/?name=" + $('#nome').val())
    } else if (tipoBusca == 'todos') {
        json = await requisicaoGET("drinkables/")
    }

    codigoHTML += '<h4 class="text-center" style="margin-top:40px;">Lista</h4>'
    codigoHTML += '<table style="margin-top:10px;" class="table table-light table-sm">'
    codigoHTML += '<thead class="thead-dark">'
    codigoHTML += '<tr><th scope="col">Nome</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th><th scope="col">Editar</th><th scope="col">Excluir</th></tr>'
    codigoHTML += '</thead>'
    codigoHTML += '<tbody>'
    json.data.forEach(function (item) {
        VETORDEBEBIDASCLASSEBEBIDA.push(item)
        codigoHTML += '<tr>'
        codigoHTML += `<th class="table-info">${corrigirTamanhoString(20, item.name)}</th>`
        codigoHTML += `<td class="table-info">${corrigirTamanhoString(40, item.description)}</td>`
        codigoHTML += `<td class="table-primary"><strong>${item.stock}</strong></td>`
        codigoHTML += `<td class="table-warning text-danger"><strong>R$${(item.price).toFixed(2)}<strong></td>`
        codigoHTML += `<th class="table-light"><button class="btn btn-primary" onclick="telaBebida('atualizar', '${item._id}'); carregarDadosBebida('${item._id}')"><span class="fas fa-pencil-alt iconsTam"></span></button></td>`
        codigoHTML += `<th class="table-light"><button class="btn btn-outline-danger" onclick="confirmarAcao('Excluir os dados da bebida permanentemente!', 'deleteBebida(this.value)', '${item._id}');" ><span class="fas fa-trash-alt iconsTam"></span></button></td>`
        codigoHTML += '</tr>'
    });
    codigoHTML += '</tbody>'
    codigoHTML += '</table>'


    document.getElementById('resposta').innerHTML = codigoHTML;
    setTimeout(function () {
        animacaoSlideDown(['#resposta'])
    })
}



//funcao responsavel por gerar a tela de dados da bebida
function telaBebida(tipoRequisicao, id) {
    let codigoHTML = '';

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += '<h3 class="text-center">Cadastrar</h3>'
    } else {
        codigoHTML += '<h3 class="text-center">Atualizar</h3>'
    }
    codigoHTML += '<form class="card-deck col-9 mx-auto d-block" style="margin-top:30px;">'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col-6" style="margin-top:25px">'
    codigoHTML += '<label>Nome: </label><input id="nome" type="text" class="form-control mousetrap" placeholder="Nome">'
    codigoHTML += '</div>'
    codigoHTML += '<div class="col-3" style="margin-top:25px">'
    codigoHTML += '<label>Quantidade: </label><input id="quantidade" type="Number" class="form-control mousetrap" placeholder="Quantidade">'
    codigoHTML += '</div>'
    codigoHTML += '<div class="col-3" style="margin-top:25px">'
    codigoHTML += '<label>Preço: </label><input id="preco" type="Number" class="form-control mousetrap" placeholder="Preço">'
    codigoHTML += '</div>'
    codigoHTML += '</div>'
    codigoHTML += '<div class="row">'
    codigoHTML += '<div class="col" style="margin-top:25px">'
    codigoHTML += '<label>Descrição: </label><textArea type="text" id="descricao" class="form-control mousetrap" placeholder="Descrição"></textArea>'
    codigoHTML += '</div>'
    codigoHTML += '</div>'

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#quantidade']) && validaValoresCampo(['#preco','#quantidade'])){cadastrarBebida();}else{mensagemDeErro('Preencha os campos nome, preço e estoque com valores válidos!'); mostrarCamposIncorrreto(['nome','preco','quantidade']);}" type="button" class="btn btn-primary" style="margin:15px"><span class="fas fa-save"></span> Salvar</button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#quantidade']) && validaValoresCampo(['#preco','#quantidade'])){confirmarAcao('Atualizar os dados da bebida!','atualizaBebida(this.value)', '${id}');}else{mensagemDeErro('Preencha os campos nome, preço e estoque com valores válidos!'); mostrarCamposIncorrreto(['nome','preco','quantidade']);}" type="button" class="btn btn-success" style="margin:15px"><span class="fas fa-pencil-alt"></span> Atualizar</button>`
        codigoHTML += `<button onclick="confirmarAcao('Excluir os dados da bebida permanentemente!', 'deleteBebida(this.value)', '${id}');" type="button" class="btn btn-outline-danger" style="margin:15px"><span class="fas fa-trash-alt"></span> Excluir</button>`
    }

    codigoHTML += '</form>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}



//funcao responsavel por carregar os dados da bebida
function carregarDadosBebida(id) {
    VETORDEBEBIDASCLASSEBEBIDA.forEach(function (item) {
        if (item._id == id) {
            setTimeout(function () {
                document.getElementById('nome').value = item.name
                document.getElementById('quantidade').value = item.stock
                document.getElementById('preco').value = item.price
                document.getElementById('descricao').value = item.description
            }, 300)
        }
    });
}




//chamada de funcao de requisicao delete enviando Id da opcao selecionada
function deleteBebida(id) {

    if (id != null) {
        try {
            requisicaoDELETE('drinkables/', (id).toString());
            mensagemDeAviso('Excluido com sucesso!');
            telaBuscarBebida();
        } catch (error) {
            mensagemDeErro('Não foi possível excluir!')
        }
    } else {
        mensagemDeErro('Preencha o campo id!')
    }
}




//chamada de funcao de requisicao create enviando dados em formato JSON para gravura
async function cadastrarBebida() {
    try {
        var json = `{"name": "${($('#nome').val()).toString()}",`
        json += `"price": ${parseFloat($('#preco').val())},`
        json += `"description": "${($('#descricao').val()).toString()}",`
        json += `"stock": ${parseInt($('#quantidade').val())}}`

        await requisicaoPOST('drinkables/', JSON.parse(json));
        mensagemDeAviso('Cadastrado com sucesso!');
        telaBebida('cadastrar', null);
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar!')
    }

}




//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaBebida(id) {
    try {
        var json = `{"name": "${($('#nome').val()).toString()}",`
        json += `"price": ${parseFloat($('#preco').val())},`
        json += `"description": "${($('#descricao').val()).toString()}",`
        json += `"stock": ${parseInt($('#quantidade').val())}}`

        await requisicaoPUT('drinkables/' + id, JSON.parse(json));
        mensagemDeAviso('Atualizado com sucesso!');
        telaBuscarBebida();
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}
