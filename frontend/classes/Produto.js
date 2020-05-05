//------------------------------------------ SELECT -----------------------------------------------------------

// tela de visualizacao de produto
function telaVisualizarProduto(){
    escopoTelaDeBusca("telaRespostaBuscarTodosProdutos()", "telaRespostaBuscarProdutos()",'janela2');
}

//funcao para gerar tela de resposta com todos os produtos
async function telaRespostaBuscarTodosProdutos(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("products/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th>','<th class="table-info">','<td class="table-info">',null,'<td class="table-danger">R$',null,null);
}

//funcao para gerar tela de resposta com produto
async function telaRespostaBuscarProdutos(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("products/?name="+$('#nome').val()),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th>','<th class="table-info">','<td class="table-info">',null,'<td class="table-danger">R$',null,null);
}

//-------------------------------------------- DELETE ---------------------------------------------------------


// tela de deletar produto
function telaDeletarProduto(){
    escopoTelaDeBusca("telaRespostaBuscarTodosProdutosDeletar()", "telaRespostaBuscarProdutosDeletar()", 'janela2');
}

//funcao para gerar tela de resposta com todos os produtos para deletar
async function telaRespostaBuscarTodosProdutosDeletar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("products/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">',null,'<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-danger" onclick="deleteProdutoPorID(this.value)"','fas fa-trash-alt iconsTam');
}

//funcao para gerar tela de resposta com produtos para deletar
async function telaRespostaBuscarProdutosDeletar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("products/?name="+$('#nome').val()),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">',null,'<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-danger" onclick="deleteProdutoPorID(this.value)"','fas fa-trash-alt iconsTam');
}

//chamada de funcao de requisicao delete enviando Id da opcao selecionada
function deleteProdutoPorID(id){
    requisicaoDELETE("products/",String(id));
    mensagemDeAviso("Excluido com sucesso!");
    telaDeletarProduto();
}

//--------------------------------------------- INSERT ------------------------------------------------------


//tela de cadastrar produto
function telaCadastrarProduto(){
    telaCadastrarOuAtualizarProduto("Cadastro",null,">",">",">","cadastrarProduto()");
}

//chamada de funcao de requisicao create enviando dados em formato JSON para gravura
async function cadastrarProduto(){
    await requisicaoPOST("products/",{"name":$('#nome').val(),"price":$('#preco').val(),"description":$('#descricao').val()});
    mensagemDeAviso("Cadastrado com sucesso!");
    telaCadastrarProduto();
}

//---------------------------------------------- UPDATE -----------------------------------------------------


//tela de atualizar produto
function telaListarProdutosAtualizar(){
    escopoTelaDeBusca("telaRespostaBuscarTodosProdutosAtualizar()", "telaRespostaBuscarProdutosAtualizar()",'janela2');
}

//funcao para gerar tela de resposta com todos os produtos para atualizar
async function telaRespostaBuscarTodosProdutosAtualizar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("products/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">',null,'<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-primary" onclick="telaAtualizarProduto(this.value)"','fas fa-pencil-alt iconsTam');
}

//funcao para gerar tela de resposta com produtos para atualizar
async function telaRespostaBuscarProdutosAtualizar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("products/?name="+$('#nome').val()),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">',null,'<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-primary" onclick="telaAtualizarProduto(this.value)"','fas fa-pencil-alt iconsTam');
}

//tela atualizar produto
async function telaAtualizarProduto(id){
    var cont=0, json=await requisicaoGET("products/");
    while(json.data[cont]){
            if(json.data[cont]._id==id){
                telaCadastrarOuAtualizarProduto("Atualizar",id,'value="'+json.data[cont].name+'">','value="'+json.data[cont].price+'">','>'+json.data[cont].description+'',"atualizaProdutoPorID()");  
            }
        cont++;
    }
}

//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaProdutoPorID(){
    await requisicaoPUT("products/"+$('#id').val(),{"name":$('#nome').val(),"price":$('#preco').val(),"description":$('#descricao').val()});
    mensagemDeAviso("Atualizado com sucesso!");
    telaAtualizarProduto($('#id').val());
}

//------------------------------------------------ EXTRA -------------------------------------------------


//funcao de escopo de tela para cadastro ou atualizacao de produtos
function telaCadastrarOuAtualizarProduto(cabecalho,id,opcao1,opcao2,opcao3,opcao4){
    var codigoHTML;

    codigoHTML='<h3 class="text-center">'+cabecalho+'</h3>'
    codigoHTML+='<form style="margin-top:30px;">'
        if(id){
            codigoHTML+='<div class="row">'
                codigoHTML+='<div class="col">'
                codigoHTML+='<fieldset disabled>'
                    codigoHTML+='<input type="text" id="id" class="form-control my-3" placeholder="ID" value="'+id+'">'
                codigoHTML+='</fieldset>'
                codigoHTML+='</div>'
            codigoHTML+='</div>'
        }
        codigoHTML+='<div class="row">'
            codigoHTML+='<div class="col">'
                codigoHTML+='<label>Nome: </label><input id="nome" type="text" class="form-control" placeholder="Nome" '+opcao1
            codigoHTML+='</div>'
            codigoHTML+='<div class="col">'
                codigoHTML+='<label>Preço: </label><input id="preco" type="Number" class="form-control" placeholder="Preço" '+opcao2
            codigoHTML+='</div>'
        codigoHTML+='</div>'
        codigoHTML+='<div class="row">'
            codigoHTML+='<div class="col">'
                codigoHTML+='<label>Descrição: </label><textarea id="descricao" class="form-control my-3" row="10" placeholder="Descrição" '+opcao3+'</textarea>'
            codigoHTML+='</div>'        
       codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<button onclick="'+opcao4+'" type="button" class="btn btn-outline-primary btn-lg btn-block my-3"><span class="fas fa-save"></span> Salvar</button>'
    document.getElementById('janela2').innerHTML = codigoHTML;
}