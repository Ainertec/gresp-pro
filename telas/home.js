import React from 'react';
import { View, StyleSheet, Image, ScrollView, Text} from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem, Overlay, Input,Button} from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{height: 60,justifyContent:"center",marginTop:10}}>
         <Header 
          leftComponent={<Image style={{ width: 100, height: 30}} source={require('./img/logo.png')}/>} 
          rightComponent={<Icon name='settings-applications' color='#fff' onPress={() => alert('Sou as configuracoes')}/>} 
          containerStyle={{ backgroundColor: '#3F173F', justifyContent: 'space-around'}}/>
      </View>
      <View style={{marginTop:10}}>
        <BottomNavigation hidden={true}>
          <BottomNavigation.Action
              key="Ler"
              icon="center-focus-strong"
              onPress={() => alert('Sou a leitura qr')}
          />
          <BottomNavigation.Action
              key="Pedido"
              icon="description"
              onPress={() => alert('Sou o pedido')}
          />
          <BottomNavigation.Action
              key="Digitar"
              icon="create"
              onPress={() => alert('Sou a digitacao do codigo')}
          />
        </BottomNavigation>
      </View>
      <View style={{flex:1,marginTop:15}}>
        <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={l.ico}
                title={l.name}
                chevron={l.price}
                bottomDivider
              />
            ))
          }
        </ScrollView>
      </View>
      <View>
          <BottomNavigation hidden={true}>
            <BottomNavigation.Action
                key="Ler"
                icon="add-circle"
                label="Adicionar"
                onPress={() => alert('Sou o adicionar')}
            />
            <BottomNavigation.Action
                key="Pedido"
                icon="delete"
                label="Remover"
                onPress={() => alert('Sou o remover')}
            />
          </BottomNavigation>
          <Header containerStyle={{ backgroundColor: '#fff'}}
            leftComponent={<Icon style={{marginBottom:10}} reverse raised color='#a46810' name='monetization-on' onPress={() => alert('Sou o pagamento')}/>}
            centerComponent={<Text>Total: R$ 3.00</Text>}
            rightComponent={<Icon style={{marginBottom:10}} reverse raised color='#7b1b53' name='send' onPress={() => alert('Sou o chat')}/>}
          />
      </View>
      <Overlay>
        <Text style={{marginTop:60,textAlign:"center",fontSize:20, marginBottom:50}}>Configurar IP de Rota</Text>
        <Input keyboardType="numeric" placeholder='Exemplo 192.168.0.1'/>
        <Button buttonStyle={{marginTop:40}} type="solid" title="Salvar" onPress={() => alert('Sou a busca por nome')} />
      </Overlay>
    </View>
  );
}

const list = [
  {
    name: 'Product',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
  {
    name: 'Product',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
  {
    name: 'Product',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
  {
    name: 'Product',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
  {
    name: 'Product',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
  {
    name: 'Drinkable',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
  {
    name: 'Drinkable',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
  {
    name: 'Drinkable',
    ico: <Icon name='restaurant' />,
    price:<Text>R$ 0.00</Text>
  },
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start'
  },
});
