import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  AsyncStorage,
  ScrollView,
  Alert,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import PaymentModal from '../../components/PaymentModal';
import ConfigModal from '../../components/ConfigModal';
import Footer from '../../components/Footer';
import ItemList from '../../components/ItemList';

import {
  Container,
  ObsevationContainer,
  ObservationInput,
  ObservationNote,
  FooterContainer,
  FooterItems,
  FooterNavigation,
  OrderNumber,
  Total,
} from './styles';

export default function Home() {
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

  const navigation = useNavigation();

  async function config() {
    await AsyncStorage.setItem('ip', ip);
    Alert.alert('Ip configurado');
    setShowConfigs(false);
    Location.reload();
  }
  function selected(number) {
    if (number === 1) {
      setChecked2(false);
      setChecked(true);
      setPaymentKind('Dinheiro');
    } else {
      setChecked(false);
      setChecked2(true);
      setPaymentKind('Cartão');
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
    setOrders((orders.total = 0));
  }
  async function drinkableRemove(id) {
    var position;
    for (var element of listaDrink) {
      if (element.drinkable._id == id) {
        position = listaDrink.indexOf(element);
      }
    }
    await listaDrink.splice(position, 1);

    setListaDrink(listaDrink.slice());
    setOrders((orders.total = 0));
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
    }
    for (const element of listaDrink) {
      var aux = {
        drinkable: element.drinkable._id,
        quantity: element.quantity,
      };
      drinkables.push(aux);
    }

    const identification = Number.parseInt(await AsyncStorage.getItem('id'));
    const newOrder = await AsyncStorage.getItem('newOrder');
    await AsyncStorage.removeItem('newOrder');
    const Api = await api();

    let haveDrink = drinkables.toString();
    let haveProduct = products.toString();

    if (!identification)
      return Alert.alert('Ops!', 'É necessário informar o número do pedido.');
    if (haveDrink == '' && haveProduct == '')
      return Alert.alert(
        'Ops!',
        'É necessário informar uma bebida ou produto.'
      );
    var response;

    if (newOrder) {
      response = await Api.post('/orders/', {
        identification,
        products,
        drinkables,
        note,
      });

      // await Api.get(`/printer/?identification=${identification}`);

      if (response.alert) {
        Alert.alert(`${response.alert}`);
      }

      if (response.status == 200) Alert.alert('Tudo Certo!', 'pedido criado!');
      else Alert.alert('ocorreu um erro!');
    } else {
      // var jsonDid = await Api.get(`/order/?identification=${identification}`);

      response = await Api.put(`/orders/${identification}`, {
        products,
        drinkables,
        note,
      });

      // await Api.put(`/printerupdate/?identification=${identification}`, jsonDid.data);

      if (response.alert) {
        Alert.alert(`${response.alert}`);
      }
      if (response.status == 200)
        Alert.alert('Tudo Certo!', 'Pedido atualizado!');
      else Alert.alert('ocorreu um erro!');
    }
    setChanged(false);
    await getDrinkablesAndProducts(
      response.data.order.drinkables,
      response.data.order.products
    );
    setOrders(response.data.order);
  }
  async function getDrinkablesAndProducts(drinkables, products) {
    var temporaryListDrink = [];
    var temporaryListProduc = [];
    if (drinkables == undefined || drinkables == null) drinkables = [];
    if (products == undefined || products == null) products = [];

    for (var element of drinkables) {
      temporaryListDrink.push(element);
    }

    for (var element of products) {
      temporaryListProduc.push(element);
    }

    setListaDrink(temporaryListDrink);
    setListaProduc(temporaryListProduc);
  }
  async function loadOrders() {
    const identification = await AsyncStorage.getItem('id');
    const Api = await api();
    const response = await Api.get('/order/', {
      params: { identification },
    });

    if (response.data == null) {
      await AsyncStorage.setItem('newOrder', 'true');
      response.data = [];
    }

    await getDrinkablesAndProducts(
      response.data.drinkables,
      response.data.products
    );

    setOrders(response.data);
  }
  async function payment() {
    const Api = await api();
    if (orders.total === undefined || changed === true)
      return Alert.alert('Ops!', 'Crie ou atualize o pedido para paga-lo!');

    const identification = await AsyncStorage.getItem('id');
    if (identification == null) return Alert.alert('identificação invalida!');

    const response = await Api.delete(
      `/orders/${identification}/${paymentKind}`
    );

    setShowPay(false);
    await AsyncStorage.removeItem('id');
    Alert.alert('Pedido Pago!', `Número:${identification}`);
    setOrders([]);
    setListaDrink([]);
    setListaProduc([]);
  }

  // useEffect(() => {
  //   const teste = navigation.getParam('producList', null);
  //   const teste2 = navigation.getParam('drinkableList', null);

  //   if (teste == null) loadOrders();
  //   else getDrinkablesAndProducts(teste2, teste);
  // }, []);

  return (
    <Container>
      <ObsevationContainer>
        <ObservationNote>Observação:</ObservationNote>
        <ObservationInput
          style={styles.input}
          placeholder='Digite uma observação'
          defaultValue={orders.note}
          onChangeText={(text) => setNote(text)}
          multiline={true}
          numberOfLines={3}
          editable={true}
        ></ObservationInput>
      </ObsevationContainer>

      <View style={{ flex: 1, marginTop: 5 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#ffe' }}>
          {listaProduc.map((l, i) => (
            <ItemList
              key={i}
              listType={l.product}
              list={l}
              itemRemove={productRemove}
              setChanged={setChanged}
            />
          ))}
          {listaDrink.map((l, i) => (
            <ItemList
              key={i}
              listType={l.drinkable}
              list={l}
              itemRemove={drinkableRemove}
              setChanged={setChanged}
            />
          ))}
        </ScrollView>
      </View>

      {/* <Footer
        navigation={navigation}
        listaProduc={listaProduc}
        listaDrink={listaDrink}
        orders={orders}
        setShowPay={setShowPay}
        sendOrder={sendOrder}
      /> */}

      <FooterContainer>
        <FooterItems
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Icon
            style={{ marginBottom: 10 }}
            color='grey'
            size={26}
            name='add-circle'
            onPress={() =>
              navigation.navigate('Items', { listaProduc, listaDrink })
            }
          />
          <OrderNumber>Pedido N°</OrderNumber>
        </FooterItems>
        <FooterNavigation>
          <Icon
            style={{ marginBottom: 10 }}
            reverse
            raised
            color='#a46810'
            name='monetization-on'
            onPress={() => setShowPay(true)}
          />
          <Total>Total: R$ 10,00</Total>
          <Icon
            style={{ marginBottom: 10 }}
            reverse
            raised
            color='#7b1b53'
            name='send'
            onPress={() => sendOrder()}
          />
        </FooterNavigation>
      </FooterContainer>

      <PaymentModal
        showPay={showPay}
        orders={orders}
        selected={selected}
        payment={payment}
        setShowPay={setShowPay}
        checked={checked}
        checked2={checked2}
      />
      <ConfigModal
        showConfigs={showConfigs}
        setIp={setIp}
        config={config}
        setShowConfigs={setShowConfigs}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#ffe',
  },
});
