import React from 'react';
import { View, StyleSheet, Image, ScrollView, Text} from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem, Input, Button} from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={{marginTop:30}}>
        <Text style={{marginBottom:10, color:"white", textAlign:"center", fontSize:22}}>Produtos</Text>
        <BottomNavigation hidden={true}>
          <BottomNavigation.Action
              key="Produtos"
              icon="local-dining"
              onPress={() => alert('Sou a tela com os produtos')}
          />
          <BottomNavigation.Action
              key="Bebidas"
              icon="local-bar"
              onPress={() => alert('Sou a tela com as bebidas')}
          />
        </BottomNavigation>
      </View>

      <View style={{marginTop:10,flexDirection:'row'}}>
          <Input containerStyle={{width:290}} inputStyle={{color:"white"}} placeholder='Nome'/>
          <Button containerStyle={{width:50}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="youtube-searched-for" size={15}/>} onPress={() => alert('Sou a busca por nome')} />
      </View>

      <View style={{flex:1,marginTop:15}}>
        <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={l.ico}
                title={l.name}
                subtitle={l.price}
                chevron={l.quantidade}
                bottomDivider
                onPress={() => alert('se apertar em mim adiciona esse produto no pedido com a quantidade solicitada')}
              />
            ))
          }
        </ScrollView>
      </View>
      <View>
          <BottomNavigation hidden={true}>
            <BottomNavigation.Action
                key="voltar"
                icon="arrow-back"
                label="Voltar"
                onPress={() => alert('Sou o voltar')}
            />
            <BottomNavigation.Action
                key="Finalizar"
                icon="done"
                label="Finalizar"
                onPress={() => alert('Sou o finalizar e confirmar o pedido')}
            />
          </BottomNavigation>
      </View>
    </View>
  );
}

const list = [
  {
    name: 'Product',
    ico: <Icon name='touch-app' />,
    price:<Text>R$ 0.00</Text>,
    quantidade:<Input containerStyle={{width:50}} keyboardType="numeric" placeholder='Qtd'/>
  },
  {
    name: 'Product',
    ico: <Icon name='touch-app' />,
    price:<Text>R$ 0.00</Text>,
    quantidade:<Input containerStyle={{width:50}} keyboardType="numeric" placeholder='Qtd'/>
  },
  {
    name: 'Product',
    ico: <Icon name='touch-app' />,
    price:<Text>R$ 0.00</Text>,
    quantidade:<Input containerStyle={{width:50}} keyboardType="numeric" placeholder='Qtd'/>
  },
  {
    name: 'Product',
    ico: <Icon name='touch-app' />,
    price:<Text>R$ 0.00</Text>,
    quantidade:<Input containerStyle={{width:50}} keyboardType="numeric" placeholder='Qtd'/>
  },
  {
    name: 'Product',
    ico: <Icon name='touch-app' />,
    price:<Text>R$ 0.00</Text>,
    quantidade:<Input containerStyle={{width:50}} keyboardType="numeric" placeholder='Qtd'/>
  },
]


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start'
  },
});
