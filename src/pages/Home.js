import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AsyncStorage, Image, ScrollView, Text, Alert } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem, Overlay, Input, Button } from 'react-native-elements';

import api from '../services/api'



export default function Home({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [listaDrink, setListaDrink] = useState([]);
  const [listaProduc, setListaProduc] = useState([]);

  async function productRemove(id) {
    var position;
    for (var element of listaProduc) {
      if (element.product._id == id) {
        position = listaProduc.indexOf(element);
      }
    }
    await listaProduc.splice(position, 1);
    console.log("Lista product Home:", listaProduc);
    setListaProduc(listaProduc.slice());

  }
  async function drinkableRemove(id) {
    var position;
    for (var element of listaDrink) {
      if (element.drinkable._id == id) {
        position = listaDrink.indexOf(element);
      }
    }
    await listaDrink.splice(position, 1)

    setListaDrink(listaDrink.slice());

  }
  async function sendOrder() {
    const drinkables = [];
    const products = [];

    for (const element of listaProduc) {
      var aux = {
        product: element.product._id,
        quantity: element.quantity,
      };
      products.push(aux);
    };
    for (const element of listaDrink) {
      var aux = {
        drinkable: element.drinkable._id,
        quantity: element.quantity,
      };
      drinkables.push(aux);
    }

    const note = orders.note;
    const identification = Number.parseInt(await AsyncStorage.getItem('id'));
    const newOrder = await AsyncStorage.getItem("newOrder");
    await AsyncStorage.removeItem("newOrder");
    var response;

    if (newOrder) {
      response = await api.post("/orders/", {
        identification,
        products,
        drinkables,

      });
      if(response.alert){
        Alert.alert(`${response.alert}`);
      }

      if (response.status == 200)
        Alert.alert("Tudo Certo!","pedido criado!");
      else
        Alert.alert("ocorreu um erro!");

    } else {
      response = await api.put(`/orders/${identification}`, {

        products,
        drinkables,
        note

      });
      if(response.alert){
        Alert.alert(`${response.alert}`);
      }
      if (response.status == 200)
        Alert.alert("Tudo Certo!","Pedido atualizado!")
      else
        Alert.alert("ocorreu um erro!")

    }
    await getDrinkablesAndProducts(response.data.order.drinkables, response.data.order.products);
    setOrders(response.data.order);

  }
  async function getDrinkablesAndProducts(drinkables, products) {
    var temporaryListDrink = [];
    var temporaryListProduc = [];
    console.log("chegou as bebidas:", drinkables);
    console.log("chegou os produtos:", products);
    if (drinkables == undefined || drinkables == null)
      drinkables = [];
    if (products == undefined || products == null)
      products = [];

    for (var element of drinkables) {
      temporaryListDrink.push(element);
    };

    for (var element of products) {
      temporaryListProduc.push(element);
    };

    setListaDrink(temporaryListDrink);
    setListaProduc(temporaryListProduc);

  }
  async function loadOrders() {
    const identification = await AsyncStorage.getItem("id");

    const response = await api.get('/order/', {
      params: { identification }
    })

    console.log("resposta: ", response.data);
    if (response.data == null) {
      await AsyncStorage.setItem("newOrder", "true");
      response.data = [];
    }

    await getDrinkablesAndProducts(response.data.drinkables, response.data.products);

    setOrders(response.data);


  }

  useEffect(() => {
    const teste = navigation.getParam('producList', null);
    const teste2 = navigation.getParam('drinkableList', null);
    console.log(teste);
    if (teste == null)
      loadOrders();
    else
      getDrinkablesAndProducts(teste2, teste);
    console.log("-------");


  }, []);


  return (

    <View style={styles.container}>
      <View style={{ height: 60, justifyContent: "center", marginTop: 10 }}>
        <Header
          leftComponent={<Image style={{ width: 100, height: 30 }} source={require('../../img/logo.png')} />}
          rightComponent={<Icon name='settings-applications' color='#fff' onPress={() => navigation.navigate('Configs')} />}
          containerStyle={{ backgroundColor: '#3F173F', justifyContent: 'space-around' }} />

      </View>
      <View style={{ marginTop: 10 }}>
        <BottomNavigation hidden={false}>
          <BottomNavigation.Action
            key="Ler"
            icon="center-focus-strong"
            onPress={() => navigation.navigate('LeituraQrCode')}
          />
          <BottomNavigation.Action
            key="Pedido"
            icon="description"
            onPress={() => navigation.navigate('Cozinha')}
          />
          <BottomNavigation.Action
            key="Digitar"
            icon="create"
            onPress={() => navigation.navigate('Identificator')

            }

          />

        </BottomNavigation>

      </View>

      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#ffe" }}>
          {

            listaProduc.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='restaurant' />}
                title={l.product.name}
                input={{ inputContainerStyle: { width: 50 }, defaultValue: `${l.quantity}`, placeholder: '0', label: "Quantidade", onChangeText: text => { l.quantity = text }, keyboardType: "numeric", }}
                subtitle={`R$ ${l.product.price}`}
                //checkBox={ { onPress:()=> state(l._id,l), }}
                rightIcon={{ name: 'clear', onPress: () => productRemove(l.product._id) }}


                bottomDivider
              />
            ))

          }
          {
            listaDrink.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='restaurant' />}
                title={l.drinkable.name}
                input={{ inputContainerStyle: { width: 50 }, defaultValue: `${l.quantity}`, placeholder: '0', label: "Quantidade", onChangeText: text => { l.quantity = text }, keyboardType: "numeric", }}
                subtitle={`R$ ${l.drinkable.price}`}
                rightIcon={{ name: 'clear', onPress: () => drinkableRemove(l.drinkable._id) }}

                bottomDivider
              />
            ))

          }
          <Text>Observações:{orders.note}</Text>


        </ScrollView>
      </View>

      <View>
        <BottomNavigation hidden={true}>
          <BottomNavigation.Action
            key="Ler"
            icon="add-circle"
            label="Adicionar"
            onPress={() => navigation.navigate('ListaItens', { listaProduc, listaDrink })}
          />
          <BottomNavigation.Action
            key="Pedido"
            icon="delete"
            label="Remover"
            onPress={() => alert('Sou o remover')}
          />
        </BottomNavigation>
        <Header containerStyle={{ backgroundColor: '#fff' }}
          leftComponent={<Icon style={{ marginBottom: 10 }} reverse raised color='#a46810' name='monetization-on' onPress={() => console.log("minha Lista:", listaDrink)} />}
          centerComponent={<Text>Total: R${(orders.total == undefined) ? "0" : orders.total.toFixed(2)} </Text>}
          rightComponent={<Icon style={{ marginBottom: 10 }} reverse raised color='#7b1b53' name='send' onPress={() => sendOrder()} />}
        />
      </View>
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
