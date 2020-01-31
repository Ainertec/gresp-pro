import React,{useState, useEffect, useMemo} from 'react';
import { View, StyleSheet, ScrollView, Text,Alert} from 'react-native';
import { Header, Icon, ListItem, Button, Overlay} from 'react-native-elements';

import socketio from 'socket.io-client';
import api from '../services/api';

export default function Cozinha({navigation}) {
  const [openOrders,setOpenOrders] = useState([]);
  const [finishedOrders,setFinishedOrders] = useState([]);

  const [drinks,setDrinks] = useState([]);
  const [products,setProducts] = useState([]);
  const [note,setNote] = useState('');

  const [showModal,setShowModal] = useState(false);

  function showInformations(l){
    //alert(l.identification);
    setNote(l.note);
    setDrinks(l.drinkables);
    setProducts(l.products);
    setShowModal(true);

  }
  async function finished(id){
  
    var identification = Number.parseInt(id);
    let position;
    const response = await api.post("/kitchen/",{
      identification,
    });
    setFinishedOrders([...finishedOrders,response.data]);
    for(const element of openOrders){
      if(element.identification == identification)
        position = openOrders.indexOf(element);
    }
    openOrders.splice(position,1);
     setOpenOrders(openOrders.slice());
    

  }
  useEffect(()=>{
    async function loadOrders(){
      const response = await api.get("orders");
      const responsefinisheds = await api.get("/kitchen/");
      setOpenOrders(response.data);

      setFinishedOrders(responsefinisheds.data);
    }
    loadOrders();
  },[]);

  const socket = useMemo(()=> socketio('http://192.168.3.100:3333'), []);

  useEffect(()=>{
    socket.on('newOrder',data =>{
      setOpenOrders([...openOrders,data]);
      
      
    });
  },[openOrders, socket])
  return (
    <View style={styles.container}>
      <View>
        <Header 
          leftComponent={<Icon name='arrow-back' color='#fff' onPress={() => navigation.navigate('Home')}/>}
          centerComponent={<Text style={{color:"white", textAlign:"center", fontSize:22}}>Cozinha</Text>} 
          containerStyle={{ backgroundColor: '#3F173F', justifyContent: 'space-around'}}/>
      </View>

      <View style={{flex:1,marginTop:15}}>
        <Text style={{color:"white"}}>Em andamento</Text>
        <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            openOrders.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='touch-app' />}
                title={`Pedido N°: ${l.identification}`}
                subtitle = {`Total: ${l.total.toFixed(2)}`}
                rightIcon={{name:'close',onPress: ()=> finished(l.identification)}}
                bottomDivider
                onPress={() => showInformations(l)}
              />
            ))
          }
        </ScrollView>
      </View>
      <View style={{flex:1,marginTop:15}}>
        <Text style={{color:"white"}}>Finalizado</Text>
        <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            finishedOrders.map((l, i) => (
              <ListItem
              key={i}
              leftAvatar={<Icon name='touch-app' />}
              title={`Pedido N°: ${l.identification}`}
              subtitle = {`Total: ${l.total.toFixed(2)}`}
              //rightIcon={{name:'close', onPress: ()=> finished(l._id) }}
              bottomDivider
              onPress={() => showInformations(l)}
              
              />
            ))
          }
        </ScrollView>
      </View>
      <View style={{marginTop:15,backgroundColor:"#3F173F"}}>

      </View>
      <Overlay isVisible={showModal} >
          <Text style={{marginTop:10,textAlign:"center",fontSize:20, marginBottom:30}}>Pedido</Text>
          <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
            <Text style={{fontSize:18, marginTop:5,marginBottom:10}}>Descrição do pedido</Text>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1}}/>
            <Text style={{marginTop:10, fontSize:18}}>Produtos:</Text>
            <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            products.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='touch-app' />}
                title={` ${l.product.name}`}
                subtitle = {`Quantidade: ${l.quantity}\nDescrição: ${l.product.description}`}
                bottomDivider
                //onPress={() => showInformations(l)}
              />
            ))
          }
        </ScrollView>
        <Text style={{marginTop:10, fontSize:18}}>Bebidas:</Text>
        <ScrollView style={{flex:1,backgroundColor:"#ffe"}}>
          {
            drinks.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='touch-app' />}
                title={` ${l.drinkable.name}`}
                subtitle = {`Quantidade: ${l.quantity}\nDescrição: ${l.drinkable.description}`}
                bottomDivider
                //onPress={() => showInformations(l)}
              />
            ))
          }
        </ScrollView>
            <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginTop:10}}/>
            <Text style={{marginTop:10, fontSize:18}}>Observação:</Text>
        <Text style={{fontSize:16, marginBottom:10}}>{note}</Text>
          </ScrollView>
          <Button buttonStyle={{marginTop:40}} type="outline" title="Fechar" onPress={() => setShowModal(false)} />
        </Overlay>
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
