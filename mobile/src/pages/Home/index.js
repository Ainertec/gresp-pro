import React, { useState, useEffect } from 'react';
import { AsyncStorage, Alert, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { useOrder } from '../../contexts/order';

import api from '../../services/api';

import PaymentModal from './paymentModal';

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
  const { order, setOrder } = useOrder();

  const [showPay, setShowPay] = useState(false);

  const [note, setNote] = useState('');
  const [changed, setChanged] = useState(false);

  const navigation = useNavigation();

  async function itemRemove(id) {
    const filterdItem = order.items.filter((item) => item._id !== id);
    setOrder(filterdItem);
  }

  // async function sendOrder() {

  //   const identification = Number.parseInt(await AsyncStorage.getItem('id'));
  //   const newOrder = await AsyncStorage.getItem('newOrder');
  //   await AsyncStorage.removeItem('newOrder');
  //   const Api = await api();

  //   let haveDrink = drinkables.toString();
  //   let haveProduct = products.toString();

  //   if (!identification)
  //     return Alert.alert('Ops!', 'É necessário informar o número do pedido.');
  //   if (haveDrink == '' && haveProduct == '')
  //     return Alert.alert(
  //       'Ops!',
  //       'É necessário informar uma bebida ou produto.'
  //     );
  //   var response;

  //   if (newOrder) {
  //     response = await Api.post('/order/', {
  //       identification,
  //       products,
  //       drinkables,
  //       note,
  //     });

  //     // await Api.get(`/printer/?identification=${identification}`);

  //     if (response.alert) {
  //       Alert.alert(`${response.alert}`);
  //     }

  //     if (response.status == 200) Alert.alert('Tudo Certo!', 'pedido criado!');
  //     else Alert.alert('ocorreu um erro!');
  //   } else {
  //     // var jsonDid = await Api.get(`/order/?identification=${identification}`);

  //     response = await Api.put(`/order/${identification}`, {
  //       products,
  //       drinkables,
  //       note,
  //     });

  //     // await Api.put(`/printerupdate/?identification=${identification}`, jsonDid.data);

  //     if (response.alert) {
  //       Alert.alert(`${response.alert}`);
  //     }
  //     if (response.status == 200)
  //       Alert.alert('Tudo Certo!', 'Pedido atualizado!');
  //     else Alert.alert('ocorreu um erro!');
  //   }
  //   setChanged(false);
  //   await getDrinkablesAndProducts(
  //     response.data.order.drinkables,
  //     response.data.order.products
  //   );
  //   setOrder(response.data.order);
  // }

  async function handlePayment() {
    if (order.total === undefined || changed === true)
      return Alert.alert('Ops!', 'Crie ou atualize o pedido para paga-lo!');
    setShowPay(true);
  }
  useEffect(() => {
    console.log('order', order);
  }, [order]);

  useEffect(() => {
    if (!showPay) {
      setOrder([]);
    }
  }, [showPay]);

  return (
    <Container>
      <ObsevationContainer>
        <ObservationNote>Observação:</ObservationNote>
        <ObservationInput
          placeholder='Digite uma observação'
          defaultValue={order.note}
          onChangeText={(text) => setNote(text)}
          multiline={true}
          numberOfLines={3}
          editable={true}
        ></ObservationInput>
      </ObsevationContainer>

      <FlatList
        style={{ paddingTop: 20 }}
        data={order.items}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <ItemList
            key={item._id}
            item={item}
            setChanged={setChanged}
            itemRemove={itemRemove}
          />
        )}
      />

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
            onPress={() => navigation.navigate('Items')}
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
            onPress={handlePayment}
          />
          <Total>Total: R$ {order.total}</Total>
          <Icon
            style={{ marginBottom: 10 }}
            reverse
            raised
            color='#7b1b53'
            name='send'
            onPress={() => {}}
          />
        </FooterNavigation>
      </FooterContainer>

      <PaymentModal
        showPay={showPay}
        total={order.total}
        setShowPay={setShowPay}
      />
    </Container>
  );
}
