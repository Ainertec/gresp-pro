import React, { useState, useEffect } from 'react';
import { View, StyleSheet, AsyncStorage, ScrollView, Text, Alert } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem } from 'react-native-elements';
import api from '../services/api'

export default function ListOrder({ orders }) {
  const [listaDrink, setListaDrink] = useState([]);
  const [listaProduc, setListaProduc] = useState([]);
  //const [orders, setOrders] = useState([order]);
  
  

  async function  productRemove(id){
    var position; 
    for(var element of listaProduc){
       if(element._id == id){
         position = listaProduc.indexOf(element);
       }
      }
      await listaProduc.splice(position,position+1)
      setListaProduc(listaProduc.slice());

  }
  async function  drinkableRemove(id){
    var position; 
    for(var element of listaDrink){
       if(element._id == id){
         position = listaDrink.indexOf(element);
       }
      }
      await listaDrink.splice(position,position+1)
      setListaDrink(listaDrink.slice());

  }
  async function sendOrder(){
    const drinkables = [];
    const products = [];

    for(const element of listaProduc){ 
      var aux = {
        product:element.product._id,
        quantity:element.quantity,
      }; 
      products.push(aux);
    };
    for(const element of listaDrink){ 
      var aux = {
        drinkable:element.drinkable._id,
        quantity:element.quantity,
      }; 
      drinkables.push(aux);
    }

    const note = orders.note;
    const identification = await AsyncStorage.getItem('id');
    
    const response = await api.put(`/orders/${identification}`,{
      
      products,
      drinkables,
      note
      
    });
    if(response.status == 200)
      Alert.alert("pedido atualizado!")
    else
    Alert.alert("ocorreu um erro!")
    
  }
  


  useEffect(() => {
    async function getDrinkables(drinkables, products) {
       var temporaryListDrink = [];
       var temporaryListProduc = [];
       for (var element of drinkables) {
        temporaryListDrink.push(element);
       };
       for (var element of products) {
       temporaryListProduc.push(element);
        };
      setListaDrink(temporaryListDrink);
      setListaProduc(temporaryListProduc);
    }
    async function getList() {
      await getDrinkables(orders.drinkables, orders.products);
    };
    if(orders )
      getList();
       console.log("------------");

  }, [ orders])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#ffe" }}>
           {
            
            listaProduc.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='restaurant' />}
                title={l.product.name}
                 input={{inputContainerStyle:{width:50}, defaultValue:`${l.quantity}` ,placeholder:'0', label:"Quantidade", onChangeText:text =>{l.quantity = text}, keyboardType:"numeric",} }
                 subtitle={`R$ ${l.product.price}`}
                 //checkBox={ { onPress:()=> state(l._id,l), }}
                 rightIcon={{name:'clear', onPress:()=> productRemove(l._id)}}
                 
                
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
                input={{inputContainerStyle:{width:50}, defaultValue:`${l.quantity}` ,placeholder:'0', label:"Quantidade", onChangeText:text =>{l.quantity = text}, keyboardType:"numeric",} }
                subtitle={`R$ ${l.drinkable.price}`}
                rightIcon={{name:'clear', onPress:()=> drinkableRemove(l._id)}}
                
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
          leftComponent={<Icon style={{ marginBottom: 10 }} reverse raised color='#a46810' name='monetization-on' onPress={() => console.log("minha Lista:",listaDrink)} />}
          centerComponent={<Text>Total: R${orders.total} </Text>}
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
});
