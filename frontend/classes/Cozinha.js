//funcao responsavel por geara a tela da peidos da cozinha
async function telaPedidosCozinha() {
    let codigoHTML = '', json = await requisicaoGET("orders", { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });

    codigoHTML += '<h4 class="text-center">Lista de pedidos</h4>'
    codigoHTML += '<div class="list-group col-10 mx-auto sm" style="margin-top:30px;">'
    json.data.forEach(function (item) {
        if (!item.finished) {
            codigoHTML += `<a onclick="confirmarAcao('Colocar pedido como disponível para entrega!', 'entregarPedido(${item.identification})', null);" href="#" class="list-group-item list-group-item-action">`
            codigoHTML += '<div class="d-flex w-100 justify-content-between">'
            codigoHTML += `<h5 class="mb-1">Pedido nº: ${item.identification}<h5>`
            codigoHTML += `<small>Data/Hora: ${(item.updatedAt).split('.')[0]}</small>`
            codigoHTML += '</div>'
            codigoHTML += `<small>Descrição: ${corrigirTamanhoString(60, item.note)}</small>`
            codigoHTML += '</a>'
        } else {
            codigoHTML += `<a onclick="confirmarAcao('Colocar pedido como disponível para entrega!', 'entregarPedido(${item.identification})', null);" href="#" class="list-group-item list-group-item-action disabled">`
            codigoHTML += '<div class="d-flex w-100 justify-content-between">'
            codigoHTML += `<h5 class="mb-1">Pedido nº: ${item.identification}<h5>`
            codigoHTML += `<small>Data/Hora: ${(item.updatedAt).split('.')[0]}</small>`
            codigoHTML += '</div>'
            codigoHTML += `<small>Descrição: ${corrigirTamanhoString(60, item.note)}</small>`
            codigoHTML += '</a>'
        }
    });
    codigoHTML += '</div>'

    document.getElementById('janela2').innerHTML = codigoHTML;

}

//funcao responsavel por avisar pelo sistema realtime que um pedido está pronto
async function entregarPedido(identificacao) {
    try {
        let json = `{"identification":${parseInt(identificacao)}}`
        await requisicaoPOST('kitchen/', JSON.parse(json), { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } })
        mensagemDeAviso('Enviado com succeso!')
        telaPedidosCozinha();
    } catch (error) {
        mensagemDeErro('Problemas ao enviar!')
    }
}
