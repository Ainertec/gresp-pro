import React from 'react';
import { View, StyleSheet, ScrollView, Text} from 'react-native';
import { Header, Icon, ListItem, Button} from 'react-native-elements';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Header 
          leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => alert('Sou o voltar')}/>}
          centerComponent={<Text style={{color:"white", textAlign:"center", fontSize:22}}>Cozinha</Text>} 
          containerStyle={{ backgroundColor: '#3F173F', justifyContent: 'space-around'}}/>
      </View>

      <View style={{flex:1,marginTop:15}}>
        <Text style={{color:"white"}}>Em andamento</Text>
        <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={l.ico}
                title={l.id}
                chevron={l.fechar}
                bottomDivider
                onPress={() => alert('se apertar em mim verá todos os itens solicitados neste pedido')}
              />
            ))
          }
        </ScrollView>
      </View>
      <View style={{flex:1,marginTop:15}}>
        <Text style={{color:"white"}}>Finalizado</Text>
        <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            list2.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={l.ico}
                title={l.id}
                chevron={l.fechar}
                bottomDivider
                onPress={() => alert('se apertar em mim verá todos os dados deste pedido')}
              />
            ))
          }
        </ScrollView>
      </View>
      <View style={{marginTop:15,backgroundColor:"#3F173F"}}>

      </View>
    </View>
  );
}

const list = [
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como Finalizado, pedidos finalizados n são mais mostrados nesta lista')} />
  },
]


const list2 = [
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
  {
    id: '0000000000',
    ico: <Icon name='touch-app' />,
    fechar:<Button containerStyle={{width:40}} type="solid" buttonStyle={{backgroundColor:"white"}} icon={<Icon name="close" size={20}/>} onPress={() => alert('Colocar esse pedido como entregue, pedidos entregues n são mais mostrados nesta lista')} />
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start'
  },
});
