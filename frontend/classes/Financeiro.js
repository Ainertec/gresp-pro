//-------------------------------- Classe Modulo Financeiro -----------------------------------

async function telaModuloFinanceiro() {
    let codigoHTML = ``;

    try {

        await aguardeCarregamento(true)
        let json = await requisicaoGET('reports/productsmes', { headers: { Authorization: `Bearer ${buscarSessionUser().token}` } });
        await aguardeCarregamento(false)

        console.log(json);

        codigoHTML += `<h5>Informações gerais</h5>
            <table class="table table-dark table-bordered text-center">
                <thead class="thead-dark">
                    <tr>
                        <td scope="col"><small>Informação</small></td>
                        <td scope="col"><small>Valor</small></td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Valor recebido bruto(Dia)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Valor recebido bruto(Mês)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Receitas menos custos(Dia)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Gastos com cortesia(Dia)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Custos com pedidos(Dia)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$</strong></small></td>
                    </tr>
                    <tr class="table-light text-dark">
                        <td scope="col"><small><strong>Valor total em estoque(Total)</strong></small></td>
                        <td scope="col" class="text-danger"><small><strong>R$</strong></small></td>
                    </tr>
                </tbody>
            </table>`

        document.getElementById('janela2').innerHTML = `Não implementado!`;

    } catch (error) {

        document.getElementById('listaDadosGerais').innerHTML = 'Não foi possivel carregar a lista!' + error
    }
}