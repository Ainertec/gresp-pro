// ------------------------------------- Classe Caixa ----------------------------------

//funcao responsavel por verificar se o usuario e admin
function autorizacaoCaixa() {
    const situacao = autenticacaoLogin()

    if (JSON.parse(situacao).tipo == 'Administrador') {
        modalGerenciarCaixa();
    } else {
        mensagemDeErro('Usuário não autorizado!')
    }
}

//funcao responsavel por gerar o modal de abertura e fechamento de caixa
function modalAbrireFecharCaixa(){
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalAbrireFecharCaixa" tabindex="-1" role="dialog" aria-labelledby="modalDispositivo" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDispositivo">
                        <span class="fas fa-wallet"></span> Abertura de caixa
                    </h5>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>Troco em caixa:</h5>`
                if(!localStorage.getItem('@caixagresppro')){
                    codigoHTML+=`<div class="shadow p-3 mb-3 bg-white rounded">
                        <input id="troco" type="text" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="Troco em caixa" onkeypress="return permiteApenasNumeros();" onkeyup="this.value = mascara(this.value);">
                    </div>    
                    <div class="shadow p-3 mb-5 bg-white rounded">
                        <button onclick="if(validaValoresCampo(['#troco']) && validaDadosCampo(['#troco'])){ confirmarAcao('Abrir caixa!','cadastrarCaixa()','');}else{mensagemDeErro('Preencha o valor de troco!');}" type="button" class="btn btn-primary btn-block btn-sm" data-dismiss="modal">
                            <span class="fas fa-check"></span> Abrir caixa
                        </button>
                    </div>`
                }else{
                    codigoHTML+=`<div class="shadow p-3 mb-3 bg-white rounded">
                        <input id="troco" type="text" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="Valor em caixa" onkeypress="return permiteApenasNumeros();" onkeyup="this.value = mascara(this.value);">
                    </div>    
                    <div class="shadow p-3 mb-5 bg-white rounded">
                        <button onclick="if(validaValoresCampo(['#troco']) && validaDadosCampo(['#troco'])){ confirmarAcao('Fechar caixa!','fechamentoCaixa()','');}else{mensagemDeErro('Preencha o valor de em caixa!');}" type="button" class="btn btn-danger btn-block btn-sm" data-dismiss="modal">
                            <span class="fas fa-check"></span> Fechar caixa
                        </button>
                    </div>`
                }
                `</div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalAbrireFecharCaixa').modal('show');
}

//funcao responsavel por gerar o modal de saida de caixa
function modalSaidasCaixa(){
    let codigoHTML = ``;

    codigoHTML += `<div class="modal fade" id="modalAbrireFecharCaixa" tabindex="-1" role="dialog" aria-labelledby="modalDispositivo" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDispositivo">
                        <span class="fab fa-creative-commons-nc"></span> Saída de caixa
                    </h5>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="shadow p-3 mb-3 bg-white rounded">
                        <input id="descricao" type="text" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="Descrição">
                        <input id="saida" type="text" class="form-control form-control-sm mx-auto mousetrap" style="margin:20px;" placeholder="Valor: R$ 0.00" onkeypress="return permiteApenasNumeros();" onkeyup="this.value = mascara(this.value);">
                    </div>    
                    <div class="shadow p-3 mb-5 bg-white rounded">
                        <button onclick="if(validaValoresCampo(['#saida']) && validaDadosCampo(['#descricao','#saida'])){ confirmarAcao('Adicionar saída de caixa!','adicionarSaidasCaixa()','');}else{mensagemDeErro('Preencha os campos descrição e valor!');}" type="button" class="btn btn-primary btn-block btn-sm" data-dismiss="modal">
                            <span class="fas fa-check"></span> Adicionar saída
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalAbrireFecharCaixa').modal('show');
}

//funcao responsavel por gerar o modal de gerenciamento de caixa
async function modalGerenciarCaixa(){
    let codigoHTML = ``;

    const result = await buscarCaixas();

    codigoHTML += `<div class="modal fade" id="modalAbrireFecharCaixa" tabindex="-1" role="dialog" aria-labelledby="modalDispositivo" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalDispositivo">
                        <span class="fas fa-file-invoice-dollar"></span> Saída de caixa
                    </h5>
                    <button onclick="limparModal();" type="button" class="close btn-outline-danger" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">`
                for (const iterator of result.data) {
                    codigoHTML+=`<div class="shadow p-3 mb-3 bg-white rounded">
                        <h5>Troco em caixa: <span class="badge badge-success">R$ ${(iterator.thing).toFixed(2)}</span></h5>
                        <h5>Total em crédito: <span class="badge badge-success">R$ ${(iterator.credit).toFixed(2)}</span></h5>
                        <h5>Total em débito: <span class="badge badge-success">R$ ${(iterator.debit).toFixed(2)}</span></h5>
                        <h5>Total em dinheiro: <span class="badge badge-success">R$ ${(iterator.cash).toFixed(2)}</span></h5>
                        <h5>Fechamento caixa: <span class="badge badge-warning">R$ ${(iterator.closure).toFixed(2)}</span></h5>
                    </div>
                    <div class="shadow p-3 mb-3 bg-white rounded">
                        <h5>Saídas de caixa:</h5>
                        <table class="table table-dark table-bordered text-center table-sm">
                            <thead>
                                <tr class="table-primary text-dark">
                                    <th>Login</th>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                </tr>
                            </thead>
                            <tbody>`
                        for (const iterator2 of iterator.exits) {
                            codigoHTML+=`<tr class="table-light text-dark">
                                <td>${iterator2.login}</td>
                                <td>${iterator2.description}</td>
                                <td><span class="badge badge-danger">R$ ${(iterator2.value).toFixed(2)}</span></td>
                            </tr>`
                        }
                        `</tbody>
                        </table>
                    </div>`
                }
                `</div>
            </div>
        </div>
    </div>`

    document.getElementById('modal').innerHTML = codigoHTML;

    $('#modalAbrireFecharCaixa').modal('show');
}

//funcao responsavel por cadastrar caixa
async function cadastrarCaixa() {
    try {
        const caixa = {
            thing: document.getElementById('troco').value
        }

        await aguardeCarregamento(true)
        const result = await requisicaoPOST(`cashregister`, caixa, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        localStorage.setItem('@caixagresppro', JSON.stringify(result.data));
        await aguardeCarregamento(false)
        await mensagemDeAviso(`Caixa aberto com sucesso códigoº ${result.data._id}!`);
    } catch (error) {
        mensagemDeErro('Não foi possível !')
    }
}

//funcao responsavel por adicionar saidas
async function adicionarSaidasCaixa() {
    try {
        const caixa = localStorage.getItem('@caixagresppro');
        const user = JSON.parse(autenticacaoLogin())

        let newCaixa = JSON.parse(caixa);
        newCaixa.exits.map(element => {
            element._id = undefined;
        })
        newCaixa.exits.push({
            login: user.nome,
            description: document.getElementById('descricao').value,
            value: parseFloat(document.getElementById('saida').value)
        })

        await aguardeCarregamento(true)
        const result = await requisicaoPUT(`cashregisterexits/${newCaixa._id}`, { thing:newCaixa.thing, exits:newCaixa.exits}, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        localStorage.setItem('@caixagresppro', JSON.stringify(result.data));
        await aguardeCarregamento(false)
        await mensagemDeAviso(`Saída adicionada com sucesso!`);
    } catch (error) {
        mensagemDeErro('Não foi possível adicionar a saída!')
    }
}

//funcao responsavel por fechar o caixa
async function fechamentoCaixa() {
    try {
        const caixa = localStorage.getItem('@caixagresppro');

        let newCaixa = JSON.parse(caixa);
        newCaixa.exits.map(element => {
            element._id = undefined;
        })
        newCaixa.closure = document.getElementById('troco').value;

        await aguardeCarregamento(true)
        const result = await requisicaoPUT(`cashregisterclosure/${newCaixa._id}`, { thing:newCaixa.thing, exits:newCaixa.exits, closure:newCaixa.closure}, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso(`Caixa nº ${result.data._id} fechado com sucesso!`);
        localStorage.removeItem('@caixagresppro');
    } catch (error) {
        mensagemDeErro('Não foi possível fechar o caixa!')
    }
}

//funcao responsavel por exibir todos os caixas
async function buscarCaixas() {
    try {
        await aguardeCarregamento(true)
        await requisicaoDELETE(`cashregister`, '', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        const result = await requisicaoGET(`cashregister`, { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)
        await mensagemDeAviso(`Caixa carregado com sucesso!`);
        return result;
    } catch (error) {
        mensagemDeErro('Não foi possível carregar o caixa!')
    }
}