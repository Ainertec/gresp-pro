// --------------------------------------------- Classe Estoque -----------------------------------------------------

let VETORDEITENSESTOQUE = [];

//funcao responsavel por fazer a ligação necessaria com a tela de estoque
function ligacaoEstoqueFacede() {
    const situacao = autenticacaoLogin();

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        telaDeBuscarEstoque();
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

//funcao para gerar tela de busca de bebidas
function telaDeBuscarEstoque() {
    let codigoHTML = ``;

    codigoHTML += `<h4 class="text-center"><span class="fas fa-boxes"></span> Buscar produto ou bebida</h4>
        <div class="card-deck col-8 mx-auto d-block">
            <div class="input-group mb-3">
                <input id="nome" type="text" class="form-control mousetrap" placeholder="Nome do produto ou bebida">
                <button onclick="if(validaDadosCampo(['#nome'])){buscarEstoque('nome');}else{mensagemDeErro('Preencha o campo nome!'); mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info">
                    <span class="fas fa-search"></span> Buscar
                </button>
                <br/>
                <button onclick="buscarEstoque('todos');" type="button" class="btn btn-outline-info btn-block" style="margin-top:10px;">
                    <span class="fas fa-search-plus"></span> Exibir todos
                </button>
            </div>
        </div>
        <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para fazer busca via GET de todas as bebidas
async function buscarEstoque(tipoBusca) {
    let codigoHTML = ``, json = null;

    if (tipoBusca == 'nome') {
        await aguardeCarregamento(true)
        json = await requisicaoGET("items/" + $("#nome").val(), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    } else if (tipoBusca == 'todos') {
        await aguardeCarregamento(true)
        json = await requisicaoGET("items", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        await aguardeCarregamento(false)
    }

    VETORDEITENSESTOQUE = [];

    codigoHTML += `<div id="grafico" class="col-10 mx-auto" style="margin-top:30px; height: 50vh"></div>
        <h5 class="text-center" style="margin-top:50px">Atualizar estoque do produto ou bebida</h5>
        <table class="table table-bordered table-sm col-12 mx-auto" style="margin-top:10px">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Quantidade</th>
                    <th scope="col">Adicionar</th>
                    <th scope="col">#</th>
                </tr>
            </thead>
            <tbody>`
    for (let item of json.data) {
        VETORDEITENSESTOQUE.push(item);
        codigoHTML += '<tr>'
        if (item.drink) {
            codigoHTML += `<td class="table-secondary text-dark" title="${item.name}"><strong><span class="fas fa-wine-glass-alt"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>`
        } else {
            codigoHTML += `<td class="table-secondary text-dark" title="${item.name}"><strong><span class="fas fa-utensils"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>`
        }
        codigoHTML += `<td class="table-secondary text-dark" title="${item.description}">${corrigirTamanhoString(40, item.description)}</td>`
        if (item.stock) {
            if (parseInt(item.stock) > 5) {
                codigoHTML += `<td class="table-success text-dark text-center"><strong>${item.stock} Unid.</strong></td>`
            } else {
                codigoHTML += `<td class="table-danger text-dark text-center"><strong>${item.stock} Unid.</strong></td>`
            }
        } else {
            codigoHTML += `<td class="table-danger text-dark text-center"><strong>0 Unid.</strong></td>`
        }
        codigoHTML += `<td class="table-warning text-dark" style="width:10vw">
                            <input class="form-control form-control-sm mousetrap" type="Number" id="quantidade${item._id}" value=1 />
                        </td>
                        <td class="table-secondary text-dark" style="width:10vw">
                            <button onclick="if(validaDadosCampo(['#quantidade${item._id}']) && validaValoresCampo(['#quantidade${item._id}'])){confirmarAcao('Atualizar quantidade!', 'atualizarEstoque(this.value)', '${item._id}');}else{mensagemDeErro('Preencha o campo quantidade com um valor válido!'); mostrarCamposIncorrreto(['quantidade${item._id}']);}" class="btn btn-success btn-sm">
                                <span class="fas fa-sync"></span> Alterar
                            </button>
                        </td>
                    </tr>`
    }
    codigoHTML += `</tbody>
        </table>`

    if (json.data[0] == null) {
        document.getElementById('resposta').innerHTML = `<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto ou bebida encontrado!</h5>`;
    } else {
        document.getElementById('resposta').innerHTML = codigoHTML;
        setTimeout(function () { gerarGraficoEstoque(json); }, 300)
    }
}

//funcao para salvar atualizar quantidade de produtos no estoque
async function atualizarEstoque(id) {
    const dado = VETORDEITENSESTOQUE.find((element) => element._id == id);

    try {
        delete dado._id
        delete dado.createdAt
        delete dado.updatedAt
        delete dado.__v
        if (dado.stock) {
            dado.stock = parseInt(dado.stock) + parseInt($('#quantidade' + id).val())
        } else {
            dado.stock = parseInt($('#quantidade' + id).val())
        }

        await aguardeCarregamento(true)
        await requisicaoPUT('items/' + id, dado, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso('Atualizado com sucesso!');
        await telaDeBuscarEstoque();
    } catch (error) {
        mensagemDeErro('Não foi possível atualizar a quantidade do produto!')
    }
}

//function para gerar grafico de estoque
function gerarGraficoEstoque(json) {
    let vetorNome = [], vetorQuantidade = [];

    for (let item of json.data) {
        vetorNome.push(corrigirTamanhoString(10, item.name))
        vetorQuantidade.push(item.stock)
    }

    Highcharts.chart('grafico', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Gráfico Estoque'
        },
        xAxis: {
            categories: vetorNome
        },
        yAxis: {
            title: 'Quantidade'
        },
        series: [{
            name: 'Quantidade',
            data: vetorQuantidade
        }]
    });
}