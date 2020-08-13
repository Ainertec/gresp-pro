//funcao responsavel por exibir todas as ajudas necessarias
function ajudaInformacoes() {
    let codigoHTML = ``;

    codigoHTML += `<p>========================</p> 
       <h2>Teclas de atalho geral</h2> 
       <p>------------------------</p> 
       <p><strong>ctrl+1</strong> -> Abre a tela de pagamento.</p> 
       <p><strong>ctrl+2</strong> -> Abre a tela de pedido.</p> 
       <p><strong>ctrl+3</strong> -> Abre a tela de Cozinha.</p> 
       <p><strong>ctrl+4</strong> -> Abre a tela de estoque.</p> 
       <p><strong>ctrl+5</strong> -> Abre a tela de produto e bebida.</p> 
       <p><strong>ctrl+6</strong> -> Abre a tela de administrador.</p> 
       <p><strong>ctrl+7</strong> -> Abre a tela de relatório de caixa.</p> 
       <p><strong>ctrl+8</strong> -> Abre a tela de impressão.</p> 
       <p><strong>ctrl+9</strong> -> Abre a tela de dispositivo.</p> 
       <p><strong>esc</strong> -> Efetuar logout.</p> 
       <p>========================</p>`

    document.getElementById('janela2').innerHTML = codigoHTML;
}