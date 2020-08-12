import React, { useState, useEffect } from 'react';
import { Alert, FlatList, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { useOrder } from '../../contexts/order';

import api from '../../services/api';

import PaymentModal from './paymentModal';

import ItemList from './item';

import {
  Container,
  FooterContainer,
  FooterItems,
  FooterNavigation,
  OrderNumber,
  Total,
  AddIcon,
  AddIconLabel,
  TextInput,
  Form,
} from './styles';

export default function Home() {
  const { order, setOrder } = useOrder();
  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);

  const [showPay, setShowPay] = useState(false);
  const [changed, setChanged] = useState(false);

  const navigation = useNavigation();

  function handleNavigateItems() {
    if (!order.identification) {
      Alert.alert('Ops...', 'É necessário informar a identificação primeiro');
      navigation.navigate('QrReader');
      return;
    }

    navigation.navigate('Items');
  }

  async function itemRemove(id) {
    const filterdItem = order.items.filter((item) => item.product._id !== id);
    setOrder({ ...order, items: filterdItem });
  }

  function createOrder() {
    api
      .post(`orders`, {
        identification: Number(order.identification),
        items: order.items,
        note: order.note === '' || !order.note ? undefined : order.note,
      })
      .then((response) => {
        setOrder(response.data.order);
        setChanged(false);
        api
          .post('printer', {
            identification: order.identification,
            type: true,
          })
          .then(() => {
            return Alert.alert('Tudo certo!', 'Pedido criado');
          })
          .catch((error) => {
            if (error.request.status !== 200) {
              return Alert.alert('Ops...', 'Falha ao imprimir pedido');
            }
          });
      })
      .catch((error) => {
        if (error.request.status !== 200) {
          return Alert.alert('Ops...', 'Falha ao criar pedido');
        }
      });
    setIsSpinnerVisible(false);
  }

  function updateOrder() {
    console.log(order.note);
    api
      .put(`orders/${order.identification}`, {
        items: order.items,
        note: order.note === '' || !order.note ? undefined : order.note,
      })
      .then((response) => {
        setOrder(response.data.order);
        setChanged(false);
        api
          .post('printer', {
            identification: order.identification,
            type: false,
            oldItems: response.data.oldItems,
          })
          .then(() => {
            return Alert.alert('Tudo certo!', 'Pedido atualizado');
          })
          .catch((error) => {
            if (error.request.status !== 200) {
              return Alert.alert('Ops...', 'Falha ao imprimir pedido');
            }
          });
      })
      .catch((error) => {
        if (error.request.status !== 200) {
          return Alert.alert('Ops...', 'Falha ao atualizar pedido');
        }
      });
    setIsSpinnerVisible(false);
  }

  async function sendOrder() {
    if (!order.identification) {
      Alert.alert('Ops...', 'É necessário a identificação');
      navigation.navigate('QrReader');
      return;
    }
    if (order.items.length === 0 || order.items.length === undefined) {
      return Alert.alert('Ops...', 'Necessário inserir items');
    }
    setIsSpinnerVisible(true);

    if (order._id) {
      updateOrder();
    } else {
      createOrder();
    }

    setTimeout(() => {
      setIsSpinnerVisible(false);
    }, 3500);
  }

  async function handlePayment() {
    if (order.total === undefined || changed === true)
      return Alert.alert('Ops!', 'Crie ou atualize o pedido para paga-lo!');
    setShowPay(true);
  }

  return (
    <Container>
      <Spinner
        visible={isSpinnerVisible}
        textContent={'Carregando...'}
        animation='fade'
        textStyle={{ color: '#fff', alignSelf: 'center' }}
      />
      <FlatList
        style={{ paddingTop: 20 }}
        ListFooterComponentStyle={{ paddingBottom: 20 }}
        ListFooterComponent={<View style={{ flex: 1 }}></View>}
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

      <Form>
        <TextInput
          leftIcon={
            <Icon
              name='edit'
              size={29}
              color='#000'
              style={{ marginRight: 20 }}
              onPress={() =>
                Alert.alert(
                  'Observação',
                  'Digite uma observação caso necessário.'
                )
              }
            />
          }
          defaultValue={order.note}
          onChangeText={(text) => (order.note = text)}
          multiline={true}
          numberOfLines={2}
          editable={true}
          placeholder='Digite uma observação'
        />
      </Form>

      <FooterContainer>
        <FooterItems>
          <AddIcon>
            <Icon
              style={{ marginBottom: 10 }}
              color='black'
              size={26}
              name='add-circle'
              onPress={handleNavigateItems}
            />
            <AddIconLabel>Adicionar</AddIconLabel>
          </AddIcon>

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

      <PaymentModal showPay={showPay} setShowPay={setShowPay} />
    </Container>
  );
}
