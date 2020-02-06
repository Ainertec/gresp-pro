import React, { useState, useEffect,useMemo } from 'react';
import { View, StyleSheet, AsyncStorage, Image, ScrollView, Text, Alert, TextInput } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem, Overlay, Input, Button, Badge, CheckBox } from 'react-native-elements';

import api from '../services/api'



export default function Home({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [listaDrink, setListaDrink] = useState([]);
  const [listaProduc, setListaProduc] = useState([]);
  const [showPay, setShowPay] = useState(false);
  const [showConfigs, setShowConfigs] = useState(false);
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [paymentKind, setPaymentKind] = useState('Dinheiro');
  const [ip, setIp] = useState('');
  const [note, setNote] = useState('');
  const [changed, setChanged] = useState(false);

  async function config() {
    await AsyncStorage.setItem("ip", ip);
    Alert.alert("Ip configurado");
    setShowConfigs(false);
    Location.reload();
  }
  function selected(number) {
    if (number === 1) {
      setChecked2(false);
      setChecked(true);
      setPaymentKind("Dinheiro");
    } else {
      setChecked(false);
      setChecked2(true);
      setPaymentKind("Cartão");
    }
  }
  async function productRemove(id) {
    var position;
    for (var element of listaProduc) {
      if (element.product._id == id) {
        position = listaProduc.indexOf(element);
      }
    }
    await listaProduc.splice(position, 1);
    setListaProduc(listaProduc.slice());
    setOrders(orders.total = 0);

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
    setOrders(orders.total = 0);

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

    const identification = Number.parseInt(await AsyncStorage.getItem('id'));
    const newOrder = await AsyncStorage.getItem("newOrder");
    await AsyncStorage.removeItem("newOrder");
    const Api = await api();

    let haveDrink = drinkables.toString();
    let haveProduct = products.toString();

    if (!identification)
      return Alert.alert("Ops!", "É necessário informar o número do pedido.");
    if ((haveDrink == '') && (haveProduct == ''))
      return Alert.alert("Ops!", "É necessário informar uma bebida ou produto.");
    var response;

    if (newOrder) {
      response = await Api.post("/orders/", {
        identification,
        products,
        drinkables,
        note

      });
      if (response.alert) {
        Alert.alert(`${response.alert}`);
      }

      if (response.status == 200)
        Alert.alert("Tudo Certo!", "pedido criado!");
      else
        Alert.alert("ocorreu um erro!");

    } else {
      response = await Api.put(`/orders/${identification}`, {

        products,
        drinkables,
        note

      });
      if (response.alert) {
        Alert.alert(`${response.alert}`);
      }
      if (response.status == 200)
        Alert.alert("Tudo Certo!", "Pedido atualizado!")
      else
        Alert.alert("ocorreu um erro!")

    }
    setChanged(false);
    await getDrinkablesAndProducts(response.data.order.drinkables, response.data.order.products);
    setOrders(response.data.order);

  }
  async function getDrinkablesAndProducts(drinkables, products) {
    var temporaryListDrink = [];
    var temporaryListProduc = [];
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
    const Api = await api();
    const response = await Api.get('/order/', {
      params: { identification }
    })
    

    if (response.data == null) {
      await AsyncStorage.setItem("newOrder", "true");
      response.data = [];
    }

    await getDrinkablesAndProducts(response.data.drinkables, response.data.products);

    setOrders(response.data);


  }
  async function payment() {
    const Api = await api();
    if (orders.total === undefined || changed === true)
      return Alert.alert("Ops!", "Crie ou atualize o pedido para paga-lo!");
    const identification = await AsyncStorage.getItem("id");
    
    const response = await Api.delete(`/orders/${identification}/${paymentKind}`);
    
    setShowPay(false);
    await AsyncStorage.removeItem('id');
    Alert.alert("Pedido Pago!", `Número:${identification}`);
  }

  useEffect(() => {
    const teste = navigation.getParam('producList', null);
    const teste2 = navigation.getParam('drinkableList', null);
    
    if (teste == null)
      loadOrders();
    else
      getDrinkablesAndProducts(teste2, teste);
    


  }, []);


  return (

    <View style={styles.container}>
      <View style={{ height: 60, justifyContent: "center", marginTop: 10 }}>
        <Header
          leftComponent={<Image style={{ width: 100, height: 30 }} source={require('../../img/logo.png')} />}
          rightComponent={<Icon name='settings-applications' color='#fff' onPress={() => setShowConfigs(true)} />}
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
            icon="kitchen"
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
      <View style={styles.form}>
        <Text style={styles.note}>Observação:</Text>
        <TextInput style={styles.input}
          placeholder="Digite uma observação"
          defaultValue={orders.note}
          onChangeText={(text) => setNote(text)}
          multiline={true} numberOfLines={3} editable={true}></TextInput>
      </View>

      <View style={{ flex: 1, marginTop: 5 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#ffe" }}>
          {

            listaProduc.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name='restaurant' />}
                title={l.product.name}
                input={{ inputContainerStyle: { width: 50 }, defaultValue: `${l.quantity}`, placeholder: '0', label: "Quantidade", onChangeText: text => { setChanged(true); l.quantity = text }, keyboardType: "numeric", }}
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
                input={{ inputContainerStyle: { width: 50 }, defaultValue: `${l.quantity}`, placeholder: '0', label: "Quantidade", onChangeText: text => { setChanged(true); l.quantity = text }, keyboardType: "numeric", }}
                subtitle={`R$ ${l.drinkable.price}`}
                rightIcon={{ name: 'clear', onPress: () => drinkableRemove(l.drinkable._id) }}

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
            onPress={() => navigation.navigate('ListaItens', { listaProduc, listaDrink })}
          />
        </BottomNavigation>
        <Header containerStyle={{ backgroundColor: '#fff' }}
          leftComponent={<Icon style={{ marginBottom: 10 }} reverse raised color='#a46810' name='monetization-on' onPress={() => setShowPay(true)} />}
          centerComponent={<Text>Total: R${(orders.total == undefined) ? "0" : orders.total.toFixed(2)} </Text>}
          rightComponent={<Icon style={{ marginBottom: 10 }} reverse raised color='#7b1b53' name='send' onPress={() => sendOrder()} />}
        />
      </View>

      <Overlay isVisible={showPay}>
        <View>
          <Text style={{ marginTop: 40, textAlign: "center", fontSize: 20, marginBottom: 50 }}>Pagamento</Text>
          <Badge status="success" value={<Text style={{ color: "white", fontSize: 16 }}> Total: R${(orders.total == undefined) ? "0" : orders.total.toFixed(2)} </Text>} />
          <CheckBox title="Dinheiro" value="Dinheiro" checked={checked} onPress={() => selected(1)}></CheckBox>
          <CheckBox title="Cartão" checked={checked2} onPress={() => selected(2)}></CheckBox>
          <Button buttonStyle={{ marginTop: 70, backgroundColor: "green" }} type="solid" icon={{ name: "send", size: 15, color: "white" }} title="Efetuar" onPress={() => payment()} />
          <Button buttonStyle={{ marginTop: 5, backgroundColor: "red" }} type="solid" icon={{ name: "close", size: 15, color: "white" }} title="Cancelar" onPress={() => setShowPay(false)} />
        </View>
      </Overlay>

      <Overlay isVisible={showConfigs} overlayStyle={{ height: 350, justifyContent: "center" }}>
        <View>
          <Text style={{ marginTop: 60, textAlign: "center", fontSize: 20, marginBottom: 50 }}>Configurar IP de Rota</Text>
          <Input keyboardType="numeric" placeholder='Exemplo 192.168.0.1' onChangeText={(text) => setIp(text)} />
          <Button buttonStyle={{ marginTop: 40 }} type="solid" title="Salvar" onPress={() => config()} />
        </View>
      </Overlay>

    </View >
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
  note: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginLeft: 5,

  },
  form: {
    alignSelf: 'stretch',
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 0,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 12,
    borderRadius: 2,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    height: 44
  }
});
