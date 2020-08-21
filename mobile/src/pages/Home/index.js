import React, { useState, useRef } from 'react';
import { FlatList, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { useOrder } from '../../contexts/order';
import Alert from '../../components/Alert';

import api from '../../services/api';

import PaymentModal from '../../components/PaymentModal';

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

  const orderErrorRef = useRef(null);
  const printerErrorRef = useRef(null);
  const identificationErrorRef = useRef(null);
  const itemsErrorRef = useRef(null);
  const paymentErroRef = useRef(null);
  const successRef = useRef(null);

  const navigation = useNavigation();

  function handleNavigateItems() {
    if (!order.identification) {
      identificationErrorRef.current.open();
      navigation.navigate('QrReader');
      return;
    }

    navigation.navigate('Items');
  }

  async function itemRemove(id) {
    const filteredItem = order.items.filter(item => item.product._id !== id);
    setOrder({ ...order, items: filteredItem });
  }

  function createOrder() {
    const serializedItems = order.items.map(item => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        courtesy: item.courtesy,
      };
    });
    api
      .post(`orders`, {
        identification: Number(order.identification),
        items: serializedItems,
        note: order.note === '' || !order.note ? undefined : order.note,
      })
      .then(response => {
        setOrder(response.data.order);
        setChanged(false);
        api
          .post('printer', {
            identification: order.identification,
            type: true,
          })
          .then(() => {
            return successRef.current.open();
          })
          .catch(error => {
            if (error.request.status !== 200) {
              return printerErrorRef.current.open();
            }
          });
      })
      .catch(error => {
        if (error.request.status !== 200) {
          return orderErrorRef.current.open();
        }
      });
    setIsSpinnerVisible(false);
  }

  function updateOrder() {
    const serializedItems = order.items.map(item => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        courtesy: item.courtesy,
      };
    });
    api
      .put(`orders/${order.identification}`, {
        items: serializedItems,
        note: order.note === '' || !order.note ? undefined : order.note,
      })
      .then(response => {
        setOrder(response.data.order);
        setChanged(false);
        api
          .post('printer', {
            identification: order.identification,
            type: false,
            oldItems: response.data.oldItems,
          })
          .then(() => {
            return successRef.current.open();
          })
          .catch(error => {
            if (error.request.status !== 200) {
              return printerErrorRef.current.open();
            }
          });
      })
      .catch(error => {
        if (error.request.status !== 200) {
          return orderErrorRef.current.open();
        }
      });
    setIsSpinnerVisible(false);
  }

  async function sendOrder() {
    if (!order.identification) {
      identificationErrorRef.current.open();
      navigation.navigate('QrReader');
      return;
    }
    if (order.items.length === 0 || order.items.length === undefined) {
      return itemsErrorRef.current.open();
    }
    setIsSpinnerVisible(true);
    setTimeout(() => {
      if (order._id) {
        updateOrder();
      } else {
        createOrder();
      }
    }, 350);

    setTimeout(() => {
      setIsSpinnerVisible(false);
    }, 3500);
  }

  async function handlePayment() {
    if (order.total === undefined || changed === true)
      return paymentErroRef.current.open();
    setShowPay(true);
  }
  return (
    <Container>
      <Spinner
        visible={isSpinnerVisible}
        textContent={'Carregando...'}
        animation="fade"
        textStyle={{ color: '#fff', alignSelf: 'center' }}
      />
      <FlatList
        style={{ paddingTop: 20 }}
        ListFooterComponentStyle={{ paddingBottom: 20 }}
        ListFooterComponent={<View style={{ flex: 1 }}></View>}
        data={order.items}
        keyExtractor={item => String(item.product._id)}
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
              name="edit"
              size={29}
              color="#000"
              style={{ marginRight: 20 }}
            />
          }
          defaultValue={order.note}
          onChangeText={text => (order.note = text)}
          multiline={true}
          numberOfLines={2}
          editable={true}
          placeholder="Digite uma observação"
        />
      </Form>

      <FooterContainer>
        <FooterItems>
          <AddIcon>
            <Icon
              style={{ marginBottom: 10 }}
              color="black"
              size={26}
              name="add-circle"
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
            color="#a46810"
            name="monetization-on"
            onPress={handlePayment}
          />
          <Total>Total: R$ {order.total}</Total>
          <Icon
            style={{ marginBottom: 10 }}
            reverse
            raised
            color="#7b1b53"
            name="send"
            onPress={sendOrder}
          />
        </FooterNavigation>
      </FooterContainer>

      <PaymentModal showPay={showPay} setShowPay={setShowPay} order={order} />
      <Alert
        ref={identificationErrorRef}
        title="Ops..."
        subtitle="É necessário informar a identificação"
      />
      <Alert
        ref={printerErrorRef}
        title="Ops..."
        subtitle="Falha ao imprimir o pedido"
      />
      <Alert
        ref={orderErrorRef}
        title="Ops..."
        subtitle="Ocorreu um erro ao criar o pedido"
      />
      <Alert
        ref={itemsErrorRef}
        title="Ops..."
        subtitle="É necessário inserir items para criar o pedido"
      />
      <Alert
        ref={paymentErroRef}
        title="Ops..."
        subtitle="Crie ou atualize o pedido para paga-lo"
      />
      <Alert
        ref={successRef}
        title="Tudo certo"
        subtitle="Pedido criado com sucesso"
        success
      />
    </Container>
  );
}
