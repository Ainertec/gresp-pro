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

  function handleNavigateItems() {
    if (!order.identification) {
      alert('É necessário informar a identificação primeiro');
      navigation.navigate('QrReader');
      return;
    }

    navigation.navigate('Items');
  }

  async function itemRemove(id) {
    const filterdItem = order.items.filter((item) => item.product._id !== id);
    setOrder({ ...order, items: filterdItem });
  }

  async function sendOrder() {
    if (!order.identification) {
      alert('É necessário a identificação');
      navigation.navigate('QrReader');
      return;
    }
    if (order.items.length === 0 || order.items.length === undefined) {
      return alert('Necessário inserir items');
    }

    if (order._id) {
      const response = await api.put(`orders/${order.identification}`, {
        items: order.items,
        note: order.note,
      });

      return response.status === 200
        ? alert('Pedido atualizado')
        : alert('Falha ao atualizar pedido');
    } else {
      console.log('opa novo');
      const response = await api
        .post(`orders`, {
          identification: Number(order.identification),
          items: order.items,
          note: note,
        })
        .catch((error) => {
          console.log(error.response);
        });
      return response.status === 200
        ? alert('Pedido criado')
        : alert('Falha ao criar pedido');
    }
  }

  async function handlePayment() {
    if (order.total === undefined || changed === true)
      return Alert.alert('Ops!', 'Crie ou atualize o pedido para paga-lo!');
    setShowPay(true);
  }

  // useEffect(() => {
  //   console.log('order', order);
  // }, [order]);

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
        keyExtractor={(item) => String(item.product._id)}
        renderItem={({ item }) => (
          <ItemList
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
            onPress={handleNavigateItems}
          />
          <OrderNumber>Pedido N° {order.identification}</OrderNumber>
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
            onPress={sendOrder}
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
