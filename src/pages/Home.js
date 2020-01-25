import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AsyncStorage, FlatList, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem } from 'react-native-elements';

import Dialog from 'react-native-dialog';
import ListOrder from '../components/ListOrder'
import api from '../services/api'
import Identificator from './Identificator.js'


export default function Home({ navigation }) {
  const [orders, setOrders] = useState([]);
 
  useEffect(() => {

    async function loadOrders() {
      const identification = await AsyncStorage.getItem("id");

      const response = await api.get('/order/', {
        params: { identification }
      })
      if (response.data == null)
        response.data = [];
      if(!response.data){
        console.log("oi")
      }  

      return response.data;
      
    }
    loadOrders().then(ordersData =>{
      setOrders(ordersData);
    });

  }, [orders])




  return (

    <View style={styles.container}>
      <View style={{ height: 60, justifyContent: "center", marginTop: 10 }}>
        <Header
          leftComponent={<Image style={{ width: 100, height: 30 }} source={require('../../img/logo.png')} />}
          rightComponent={<Icon name='settings-applications' color='#fff' onPress={() => alert('Sou as configuracoes')} />}
          containerStyle={{ backgroundColor: '#3F173F', justifyContent: 'space-around' }} />

      </View>
      <View style={{ marginTop: 10 }}>
        <BottomNavigation hidden={false}>
          <BottomNavigation.Action
            key="Ler"
            icon="center-focus-strong"
            onPress={() => alert('Sou a leitura qr')}
          />
          <BottomNavigation.Action
            key="Pedido"
            icon="description"
            onPress={() => navigation.navigate('Home')}
          />
          <BottomNavigation.Action
            key="Digitar"
            icon="create"
            onPress={() => navigation.navigate('Identificator')

            }

          />

        </BottomNavigation>

      </View>




      {/* <View style={{ flex: 1, marginTop: 15 }}>
        <FlatList
          style={styles.list}
          data={lista}
          keyExtractor={ list =>list._id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) =>(
            <View style={{flex:1,flexDirection:'row'}}>
            <Text>{item.name}</Text>
            <Text >R$:{item.price}</Text>
            <Text>Quantidade: {item.quantity}</Text>

            </View>
          )}
        />
      </View> */}
      {/* <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#ffe" }}>
          {
            lista.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='restaurant' />}
                title={l.name}
                chevron={(<Text>R$:{l.price}</Text>)}
                onLongPress={() => alert(l._id)}
                bottomDivider
              //rightTitle ={l.price}



              />
            ))
          }
        </ScrollView>
      </View> */}
      <ListOrder orders={orders} />


      {/* <View>
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
        <Header containerStyle={{ backgroundColor: '#fff' }}
          leftComponent={<Icon style={{ marginBottom: 10 }} reverse raised color='#a46810' name='monetization-on' onPress={() => alert('Sou o pagamento')} />}
          centerComponent={<Text> Total: R${orders.total} </Text>}
          rightComponent={<Icon style={{ marginBottom: 10 }} reverse raised color='#7b1b53' name='send' onPress={() => alert('Sou o chat')} />}
        />
      </View> */}

    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start'
  },
  list: {
    flex: 1,
    backgroundColor: "#ffe"
  },
});
