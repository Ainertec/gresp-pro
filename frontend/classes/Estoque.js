// --------------------------------------------- Classe Estoque -----------------------------------------------------

let VETORDEITENSESTOQUE = [];

//funcao responsavel por fazer a ligação necessaria com a tela de estoque
function ligacaoEstoqueFacede(tipo) {
    const situacao = autenticacaoLogin();

    if (JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum') {
        telaDeBuscarEstoque(tipo);
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

//funcao para gerar tela de busca de bebidas
function telaDeBuscarEstoque(tipo) {
    let codigoHTML = ``;

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">`
    if (tipo == 'produto') {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-boxes"></span> Buscar produtos</h4>`
    } else {
        codigoHTML += `<h4 class="text-center"><span class="fas fa-boxes"></span> Buscar ingredientes</h4>`
    }
    codigoHTML += `<div class="card-deck col-6 mx-auto d-block">
            <div class="input-group mb-3">
                <input id="nome" type="text" class="form-control form-control-sm mousetrap" placeholder="Nome do item">
                <button onclick="if(validaDadosCampo(['#nome'])){buscarEstoque('nome', '${tipo}');}else{mensagemDeErro('Preencha o campo nome!'); mostrarCamposIncorrreto(['nome']);}" type="button" class="btn btn-outline-info btn-sm">
                    <span class="fas fa-search"></span> Buscar
                </button>
                <br/>
                <button onclick="buscarEstoque('todos', '${tipo}');" type="button" class="btn btn-outline-info btn-block btn-sm" style="margin-top:10px;">
                    <span class="fas fa-search-plus"></span> Exibir todos
                </button>
            </div>
        </div>
    </div>
    <div id="resposta"></div>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}

//funcao para fazer busca via GET de todas as bebidas
async function buscarEstoque(tipoBusca, tipo) {
    let codigoHTML = ``, json = null;

    if (tipo == 'produto') {
        if (tipoBusca == 'nome') {
            await aguardeCarregamento(true)
            json = await requisicaoGET(`itemsDesk/${$("#nome").val()}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            json.data = json.data.filter((element) => element.stock != null)
            console.log(json.data)
            await aguardeCarregamento(false)
        } else if (tipoBusca == 'todos') {
            await aguardeCarregamento(true)
            json = await requisicaoGET(`itemsDesk`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            json.data = json.data.filter((element) => element.stock != null)
            await aguardeCarregamento(false)
        }
    } else if (tipo == 'ingrediente') {
        if (tipoBusca == 'nome') {
            await aguardeCarregamento(true)
            json = await requisicaoGET(`ingredients/${$("#nome").val()}`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            await aguardeCarregamento(false)
        } else if (tipoBusca == 'todos') {
            await aguardeCarregamento(true)
            json = await requisicaoGET(`ingredients`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
            await aguardeCarregamento(false)
        }
    }

    VETORDEITENSESTOQUE = [];

    codigoHTML += `<div class="shadow-lg p-3 mb-5 bg-white rounded">
            <div id="grafico" class="col-10 mx-auto" style="height: 50vh"></div>
        </div>
            <div class="shadow-lg p-3 mb-5 bg-white rounded">
            <h5 class="text-center">Atualizar estoque do produto ou bebida</h5>
            <table class="table table-bordered table-sm col-12 mx-auto" style="margin-top:10px">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço unidade</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Adicionar quantidade</th>
                        <th scope="col">Preço de custo</th>
                        <th scope="col">#</th>
                    </tr>
                </thead>
                <tbody>`
    for (let item of json.data) {
        VETORDEITENSESTOQUE.push(item);
        codigoHTML += '<tr>'
        if (item.drink) {
            codigoHTML += `<td class="table-warning text-dark" title="${item.name}"><strong><span class="fas fa-wine-glass-alt"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>`
        } else if (item.drink == false) {
            codigoHTML += `<td class="table-warning text-dark" title="${item.name}"><strong><span class="fas fa-utensils"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>`
        } else {
            codigoHTML += `<td class="table-warning text-dark" title="${item.name}"><strong><span class="fas fa-boxes"></span> ${corrigirTamanhoString(20, item.name)}</strong></td>`
        }
        codigoHTML += `<th class="table-warning text-dark" style="width:10vw">R$${(parseFloat(item.priceUnit ? item.priceUnit : item.cost)).toFixed(2)}</th>`
        if (item.unit == 'g') {
            codigoHTML += `<td class="table-${item.stock > 2000 ? 'success' : 'danger'} text-dark text-center"><strong>${item.stock} g</strong></td>`
        } else if (item.unit == 'ml') {
            codigoHTML += `<td class="table-${item.stock > 3000 ? 'success' : 'danger'} text-dark text-center"><strong>${item.stock} ml</strong></td>`
        } else {
            codigoHTML += `<td class="table-${item.stock > 5 ? 'success' : 'danger'} text-dark text-center"><strong>${item.stock} unid.</strong></td>`
        }
        codigoHTML += `<td class="table-warning text-dark" style="width:15vw">
                                <div class="input-group input-group-sm">
                                    <input class="form-control form-control-sm mousetrap" type="Number" id="quantidade${item._id}" value=10 />
                                    <div class="input-group-prepend">`
        if (item.unit == 'g') {
            codigoHTML += `<span class="input-group-text">g</span>`
        } else if (item.unit == 'ml') {
            codigoHTML += `<span class="input-group-text">ml</span>`
        } else {
            codigoHTML += `<span class="input-group-text">unid.</span>`
        }
        codigoHTML += `</div>
                                </div>                        
                            </td>
                            <td class="table-warning text-dark" style="width:15vw">
                                <div class="input-group input-group-sm">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">R$</span>
                                    </div>
                                    <input class="form-control form-control-sm mousetrap" type="Number" id="precocusto${item._id}" value=${tipo == 'produto' ? (parseFloat(item.cost)).toFixed(2) : (parseFloat(item.price)).toFixed(2)} />
                                </div>
                            </td>
                            <td class="table-secondary text-dark" style="width:7vw">
                                <button onclick="if(validaDadosCampo(['#quantidade${item._id}']) && validaValoresCampo(['#quantidade${item._id}'])){confirmarAcao('Atualizar quantidade!', 'atualizarEstoque(this.value,${tipo == 'produto' ? true : false})', '${item._id}');}else{mensagemDeErro('Preencha o campo quantidade com um valor válido!'); mostrarCamposIncorrreto(['quantidade${item._id}']);}" class="btn btn-success btn-sm">
                                    <span class="fas fa-sync"></span> Alterar
                                </button>
                            </td>
                        </tr>`
    }
    codigoHTML += `</tbody>
            </table>
        </div>`

    if (json.data[0] == null) {
        document.getElementById('resposta').innerHTML = `<h5 class="text-center" style="margin-top:20vh;"><span class="fas fa-exclamation-triangle"></span> Nenhum produto ou ingrediente encontrado!</h5>`;
    } else {
        document.getElementById('resposta').innerHTML = codigoHTML;
        setTimeout(function () { gerarGraficoEstoque(json); }, 300)
    }
}

//funcao para salvar atualizar quantidade de produtos no estoque
async function atualizarEstoque(id, tipo) {
    const dado = VETORDEITENSESTOQUE.find((element) => element._id == id);

    try {
        delete dado._id
        delete dado.createdAt
        delete dado.updatedAt
        delete dado.__v

        if (tipo) {
            delete dado.ingredients
            dado.cost = (parseFloat(document.getElementById(`precocusto${id}`).value)).toFixed(2)
        } else {
            delete dado.priceUnit
            dado.price = (parseFloat(document.getElementById(`precocusto${id}`).value)).toFixed(2)
        }


        if (dado.stock) {
            dado.stock = parseInt(dado.stock) + parseInt($(`#quantidade${id}`).val())
        } else {
            dado.stock = parseInt($(`#quantidade${id}`).val())
        }

        await aguardeCarregamento(true)
        if (tipo) {
            await requisicaoPUT(`items/${id}`, dado, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        } else {
            await requisicaoPUT(`ingredients/${id}`, dado, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        }
        await aguardeCarregamento(false)
        await mensagemDeAviso('Atualizado com sucesso!');
        if (tipo) {
            await telaDeBuscarEstoque('produto');
        } else {
            await telaDeBuscarEstoque('ingrediente');
        }
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