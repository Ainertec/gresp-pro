//funcao responsavel por exibir todas as ajudas necessarias
function ajudaInformacoes() {
    var codigoHTML = ''

    codigoHTML += '<p>========================</p>'
    codigoHTML += '<h2>Teclas de atalho geral</h2>'
    codigoHTML += '<p>------------------------</p>'
    codigoHTML += '<p><strong>ctrl+1</strong> -> Abre a tela de pagamento.</p>'
    codigoHTML += '<p><strong>ctrl+2</strong> -> Abre a tela de pedido.</p>'
    codigoHTML += '<p><strong>ctrl+3</strong> -> Abre a tela de Cozinha.</p>'
    codigoHTML += '<p><strong>ctrl+4</strong> -> Abre a tela de estoque.</p>'
    codigoHTML += '<p><strong>ctrl+5</strong> -> Abre a tela de produto e bebida.</p>'
    codigoHTML += '<p><strong>ctrl+6</strong> -> Abre a tela de administrador.</p>'
    codigoHTML += '<p><strong>ctrl+7</strong> -> Abre a tela de relatório de caixa.</p>'
    codigoHTML += '<p><strong>ctrl+8</strong> -> Abre a tela de impressão.</p>'
    codigoHTML += '<p><strong>ctrl+9</strong> -> Abre a tela de dispositivo.</p>'
    codigoHTML += '<p><strong>esc</strong> -> Efetuar logout.</p>'
    codigoHTML += '<p>========================</p>'

    document.getElementById('janela2').innerHTML = codigoHTML;
}