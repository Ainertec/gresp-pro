import React from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import { Header, Icon, ListItem,Input, Button, Overlay, CheckBox, Badge} from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      

      {/*####### modal para quando clicar no botao de pagamento
      
      
      
      <View style={{marginTop:15}}>
        <Overlay isVisible={true}>
          <Text style={{marginTop:40,textAlign:"center",fontSize:20, marginBottom:50}}>Pagamento</Text>
          <Badge status="success" value={<Text style={{color:"white", fontSize:16}}>  Total: R$ 200.00  </Text>}/>
          <CheckBox title="Dinheiro" checked={true}></CheckBox>
          <CheckBox title="Cartão"></CheckBox>
          <Button buttonStyle={{marginTop:70, backgroundColor:"green"}} type="solid" icon={{name: "send", size: 15, color:"white"}} title="Efetuar" onPress={() => alert('Eu efetuo o pagamento e fecho o modal')} />
        </Overlay>
      </View>*/}

      

      {/*########## modal para a tela da cozinha, quando clicar no item da lista em andamento abrira esse modal com as informacoes, obs: será o mesmo modal para lista de finalizados, porém no finalizados havera as lista com as bebidas tbm



      <View style={{marginTop:15}}>
        <Overlay isVisible={true}>
          <Text style={{marginTop:10,textAlign:"center",fontSize:20, marginBottom:30}}>Pedido</Text>
          <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
            <Text style={{fontSize:18, marginTop:5,marginBottom:10}}>Pedido Numero: 00000000</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}}/>
            <Text style={{marginTop:10, fontSize:18}}>Produtos:</Text>
            <Text style={{marginTop:5, fontSize:16}}>* Produto 1 - Quantidade: 2</Text>
            <Text style={{fontSize:16}}>* Produto 2 - Quantidade: 2</Text>
            <Text style={{fontSize:16}}>* Produto 3 - Quantidade: 2</Text>
            <Text style={{fontSize:16}}>* Produto 3 - Quantidade: 2</Text>
            <Text style={{fontSize:16}}>* Produto 3 - Quantidade: 2</Text>
            <Text style={{fontSize:16}}>* Produto 3 - Quantidade: 2</Text>
            <Text style={{fontSize:16}}>* Produto 3 - Quantidade: 2</Text>
            <Text style={{fontSize:16}}>* Produto 3 - Quantidade: 2</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop:10}}/>
            <Text style={{marginTop:10, fontSize:18}}>Observação:</Text>
            <Text style={{fontSize:16, marginBottom:10}}>Sem isso, sem aquilo, sem aquilo outro, mesa x</Text>
          </ScrollView>
          <Button buttonStyle={{marginTop:40}} type="outline" title="Fechar" onPress={() => alert('Eu fecho o modal apenas')} />
        </Overlay>
      </View>*/}



      {/*######## modal para o botao de configuracao de rota de IP



      <View style={{marginTop:15}}>
        <Overlay isVisible={true}>
          <Text style={{marginTop:60,textAlign:"center",fontSize:20, marginBottom:50}}>Configurar IP de Rota</Text>
          <Input keyboardType="numeric" placeholder='Exemplo 192.168.0.1'/>
          <Button buttonStyle={{marginTop:40}} type="solid" title="Salvar" onPress={() => alert('Sou a busca por nome')} />
        </Overlay>
      </View>*/}


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start'
  },
});
