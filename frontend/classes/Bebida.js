// --------------------------------------------- SELECT -----------------------------------------------------

// tela de visualizacao de bebida
function telaVisualizarBebida(){
    escopoTelaDeBusca("telaRespostaBuscarTodasBebidas()", "telaRepostaBuscarBebida()",'janela2');
}

// funcao para gerar tela de resposta com todas as bebidas
async function telaRespostaBuscarTodasBebidas(){

    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("drinkables/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th>','<th class="table-info">','<th class="table-info">','<td class="table-warning">','<td class="table-danger">R$',null);
}


// funcao para gerar tela de resposta com uma unica bebida
async function telaRepostaBuscarBebida(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("drinkables/?name="+$('#nome').val()),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th>','<th class="table-info">','<th class="table-info">','<td class="table-warning">','<td class="table-danger">R$',null);
}

// ---------------------------------------------- DELETE ----------------------------------------------------

// tela de deletar bebida
function telaDeletarBebida(){
    escopoTelaDeBusca("telaRespostaBuscarTodasBebidasDeletar()", "telaRespostaBuscarBebidasDeletar()",'janela2');
}

//funcao para gerar tela de resposta com todas as bebidas para deletar
async function telaRespostaBuscarTodasBebidasDeletar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("drinkables/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-danger" onclick="deleteBebidaPorID(this.value)"','fas fa-trash-alt iconsTam');
}

//funcao para gerar tela de resposta com bebidas para deletar
async function telaRespostaBuscarBebidasDeletar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("drinkables/?name="+$('#nome').val()),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-danger" onclick="deleteBebidaPorID(this.value)"','fas fa-trash-alt iconsTam');
}

//chamada de funcao de requisicao delete enviando Id da opcao selecionada
function deleteBebidaPorID(id){
    requisicaoDELETE("drinkables/",String(id));
    mensagemDeAviso("Excluido com sucesso!");
    telaDeletarBebida();
}

// --------------------------------------------- INSERT -----------------------------------------------------

//tela de cadastrar bebida
function telaCadastrarBebida(){
    telaCadastrarOuAtualizarBebidas("Cadastro",null,">",">",">",">","cadastrarBebida()");
}

//chamada de funcao de requisicao create enviando dados em formato JSON para gravura
async function cadastrarBebida(){
    await requisicaoPOST("drinkables/",{"name":$('#nome').val(),"price":$('#preco').val(),"description":$('#descricao').val(),"stock":$('#quantidade').val()});
    mensagemDeAviso("Cadastrado com sucesso!");
    telaCadastrarBebida();
}

// -------------------------------------------- UPDATE -----------------------------------------------------

//tela de atualizar bebida
function telaListarBebidasAtualizar(){
    escopoTelaDeBusca("telaRespostaBuscarTodasBebidasAtualizar()", "telaRespostaBuscarBebidasAtualizar()",'janela2');
}

//funcao para gerar tela de resposta com todos as bebidas para atualizar
async function telaRespostaBuscarTodasBebidasAtualizar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("drinkables/"),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-primary" onclick="telaAtualizarBebida(this.value)"','fas fa-pencil-alt iconsTam');
}

//funcao para gerar tela de resposta com bebidas para atualizar
async function telaRespostaBuscarBebidasAtualizar(){
    document.getElementById('resposta').innerHTML = escopoTabelaDeResposta(await requisicaoGET("drinkables/?name="+$('#nome').val()),'<th scope="col">Name</th><th scope="col">Descrição</th><th scope="col">Quantidade</th><th scope="col">Preço</th><th scope="col">#</th>','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">','<th class="table-secondary">R$','<th class="table-secondary"><button class="btn btn-primary" onclick="telaAtualizarBebida(this.value)"','fas fa-pencil-alt iconsTam');
}

//tela atualizar bebidas
async function telaAtualizarBebida(id){
    var cont=0, json=await requisicaoGET("drinkables/");
    while(json.data[cont]){
            if(json.data[cont]._id==id){
                telaCadastrarOuAtualizarBebidas("Atualizar",id,'value="'+json.data[cont].name+'">','value="'+json.data[cont].price+'">','value="'+json.data[cont].stock+'">','>'+json.data[cont].description+'',"atualizaBebidaPorID()");  
            }
        cont++;
    }
}

//chamada de funcao de requisicao put enviando os dados e o Id da opcao selecionada
async function atualizaBebidaPorID(){
    await requisicaoPUT("drinkables/"+$('#id').val(),{"name":$('#nome').val(),"price":$('#preco').val(),"description":$('#descricao').val(),"stock":$('#quantidade').val()});
    mensagemDeAviso("Atualizado com sucesso!");
    telaAtualizarBebida($('#id').val());
}


// -------------------------------------------- EXTRA -------------------------------------------------------

//funcao de escopo de tela para cadastro ou atualizacao de bebidas
function telaCadastrarOuAtualizarBebidas(cabecalho,id,opcao1,opcao2,opcao3,opcao4,opcao5){
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
            codigoHTML+='<div class="col">'
                codigoHTML+='<label>Quantidade: </label><input id="quantidade" type="Number" class="form-control" placeholder="Quantidade" '+opcao3
            codigoHTML+='</div>'
        codigoHTML+='</div>'
        codigoHTML+='<div class="row">'
            codigoHTML+='<div class="col">'
                codigoHTML+='<label>Descrição: </label><textarea id="descricao" class="form-control my-3" row="10" placeholder="Descrição" '+opcao4+'</textarea>'
            codigoHTML+='</div>'        
       codigoHTML+='</div>'
       codigoHTML+='<div class="row">'
            codigoHTML+='<div class="col">'
                
            codigoHTML+='</div>'        
       codigoHTML+='</div>'
    codigoHTML+='</form>'
    codigoHTML+='<button onclick="'+opcao5+'" type="button" class="btn btn-outline-primary btn-lg btn-block my-3"><span class="fas fa-save"></span> Salvar</button>'
    document.getElementById('janela2').innerHTML = codigoHTML;
}