// --------------------------------------------- Classe Bebida -----------------------------------------------------

let VETORDEBEBIDASCLASSEBEBIDA = []

//funcao responsavel por fazer a ligação necessaria com a tela de bebida
function ligacaoBebidaFacede(tipo) {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        if (tipo == 'cadastrar') {
            telaBebida(tipo, null);
        } else if (tipo == 'atualizar') {
            telaBuscarBebida();
        }
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

// tela de visualizacao de bebida
function telaBuscarBebida() {
    let codigoHTML = '';

    codigoHTML += `'<h4 class="text-center">Buscar</h4>'
    '<div class="card-deck col-8 mx-auto d-block">'
    '<div class="input-group mb-3">'
    '<input id="nome" type="text" class="form-control mousetrap" placeholder="Nome Produto">'
    <button onclick="if(validaDadosCampo(['#nome'])){buscarBebida('nome'); animacaoSlideUp(['#resposta']);}else{mensagemDeErro('Preencha o campo de busca!'); mostrarCamposIncorrreto(['nome'])}" type="button" class="btn btn-outline-info">
    '<span class="fas fa-search"></span> Buscar'
    '</button>'
    '<br/>'
    <button onclick="buscarBebida('todos'); animacaoSlideUp(['#resposta']);" type="button" class="btn btn-outline-info btn-block" style="margin-top:10px;">
    '<span class="fas fa-search-plus"></span> Exibir todos'
    '</button>'
    '</div>'
    '</div>'
    '<div id="resposta"></div>'`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por buscar as bebidas e exibir a lista
async function buscarBebida(tipoBusca) {
    let codigoHTML = '', json = null;

    if (tipoBusca == 'nome') {
        await aguardeCarregamento(true);
        json = await requisicaoGET("items/" + $('#nome').val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    } else if (tipoBusca == 'todos') {
        await aguardeCarregamento(true)
        json = await requisicaoGET("items", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    }

    codigoHTML += `'<h4 class="text-center" style="margin-top:40px;">Lista</h4>'
      '<table style="margin-top:10px;" class="table table-light table-sm">'
      '<thead class="thead-dark">'
      '<tr><th scope="col">Nome</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th><th scope="col">Editar</th><th scope="col">Excluir</th></tr>'
      '</thead>'
      '<tbody>'`
    json.data.forEach(function (item) {
        if (item.drink) {
            VETORDEBEBIDASCLASSEBEBIDA.push(item)
            codigoHTML += `'<tr>'
              <th class="table-info"><span class="fas fa-wine-glass-alt"></span> ${corrigirTamanhoString(20, item.name)}</th>
              <td class="table-info">${corrigirTamanhoString(40, item.description)}</td>`
            if (item.stock != null) {
                codigoHTML += `<td class="table-primary"><strong>${item.stock}</strong></td>`
            } else {
                codigoHTML += `<td class="table-primary text-danger"><strong>0</strong></td>`
            }
            codigoHTML += `<td class="table-warning text-danger"><strong>R$${(item.price).toFixed(2)}<strong></td>
              <th class="table-light"><button class="btn btn-primary" onclick="telaBebida('atualizar', '${item._id}'); carregarDadosBebida('${item._id}')"><span class="fas fa-pencil-alt iconsTam"></span></button></td>
              <th class="table-light"><button class="btn btn-outline-danger" onclick="confirmarAcao('Excluir os dados da bebida permanentemente!', 'deleteBebida(this.value)', '${item._id}');" ><span class="fas fa-trash-alt iconsTam"></span></button></td>
              '</tr>'`
        }
    });
    codigoHTML += `'</tbody>'
      '</table>'`


    if (json.data[0] == null) {
        document.getElementById('resposta').innerHTML = '<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhuma bebida encontrada!</h5>';
    } else {
        document.getElementById('resposta').innerHTML = codigoHTML;
    }
    setTimeout(function () {
        animacaoSlideDown(['#resposta'])
    })
}

//funcao responsavel por gerar a tela de dados da bebida
function telaBebida(tipoRequisicao, id) {
    let codigoHTML = '';

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `'<h3 class="text-center">Cadastrar</h3>'`
    } else {
        codigoHTML += `'<h3 class="text-center">Atualizar</h3>'`
    }

    codigoHTML += `'<form class="card-deck col-9 mx-auto d-block" style="margin-top:30px;">'
    '<div class="row">'
    '<div class="col-6" style="margin-top:25px">'
    '<label>Nome: </label><input id="nome" type="text" class="form-control mousetrap" placeholder="Nome">'
    '</div>'
    '<div class="col-3" style="margin-top:25px">'
    '<label>Quantidade: </label><input id="quantidade" type="Number" class="form-control mousetrap" placeholder="Quantidade">'
    '</div>'
    '<div class="col-3" style="margin-top:25px">'
    '<label>Preço: </label><input id="preco" type="Number" class="form-control mousetrap" placeholder="Preço">'
    '</div>'
    '</div>'
    '<div class="row">'
    '<div class="col" style="margin-top:25px">'
    '<label>Descrição: </label><textArea type="text" id="descricao" class="form-control mousetrap" placeholder="Descrição" rows="10">Nenhuma.</textArea>'
    '</div>'
    '</div>'`

    if (tipoRequisicao == 'cadastrar') {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#descricao']) && validaValoresCampo(['#preco','#quantidade'])){cadastrarBebida();}else{mensagemDeErro('Preencha os campos nome, preço e estoque com valores válidos!'); mostrarCamposIncorrreto(['nome','preco','quantidade','descricao']);}" type="button" class="btn btn-primary" style="margin:15px"><span class="fas fa-save"></span> Salvar</button>`
    } else {
        codigoHTML += `<button onclick="if(validaDadosCampo(['#nome','#preco','#descricao']) && validaValoresCampo(['#preco','#quantidade'])){confirmarAcao('Atualizar os dados da bebida!','atualizaBebida(this.value)', '${id}');}else{mensagemDeErro('Preencha os campos nome, preço e estoque com valores válidos!'); mostrarCamposIncorrreto(['nome','preco','quantidade','descricao']);}" type="button" class="btn btn-success" style="margin:15px"><span class="fas fa-pencil-alt"></span> Atualizar</button>
            <button onclick="confirmarAcao('Excluir os dados da bebida permanentemente!', 'deleteBebida(this.value)', '${id}');" type="button" class="btn btn-outline-danger" style="margin:15px"><span class="fas fa-trash-alt"></span> Excluir</button>`
    }

    codigoHTML += `'</form>'`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao responsavel por carregar os dados da bebida
function carregarDadosBebida(id) {
    VETORDEBEBIDASCLASSEBEBIDA.forEach(function (item) {
        if (item._id == id) {
            setTimeout(function () {
                document.getElementById('nome').value = item.name
                document.getElementById('preco').value = item.price
                document.getElementById('quantidade').value = item.stock
                document.getElementById('descricao').value = item.description
            }, 300)
        }
    });
}

//chamada de funcao de requisicao delete enviando Id da opcao selecionada
async function deleteBebida(id) {

    if (id != null) {
        try {
            await aguardeCarregamento(true)
            await requisicaoDELETE('items/', (id).toString(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
            await aguardeCarregamento(false)
            await mensagemDeAviso('Excluido com sucesso!');
            await telaBuscarBebida();
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
        json += `"drink": true,`
        if (validaDadosCampo(['#quantidade']) && validaValoresCampo(['#quantidade'])) {
            json += `"stock": ${parseInt($('#quantidade').val())},`
        }
        json += `"description": "${($('#descricao').val()).toString()}"}`

        await aguardeCarregamento(true)
        await requisicaoPOST('items', JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso('Cadastrado com sucesso!');
        await telaBebida('cadastrar', null);
    } catch (error) {
        mensagemDeErro('Não foi possível cadastrar!')
    }

}

//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaBebida(id) {
    try {
        var json = `{"name": "${($('#nome').val()).toString()}",`
        json += `"price": ${parseFloat($('#preco').val())},`
        json += `"drink": true,`
        if (validaDadosCampo(['#quantidade']) && validaValoresCampo(['#quantidade'])) {
            json += `"stock": ${parseInt($('#quantidade').val())},`
        }
        json += `"description": "${($('#descricao').val()).toString()}"}`

        await aguardeCarregamento(true)
        await requisicaoPUT('items/' + id, JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso('Atualizado com sucesso!');
        await telaBuscarBebida();
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar!')
    }
}