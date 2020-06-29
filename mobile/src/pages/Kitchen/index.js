import React, { useState, useEffect, useMemo } from 'react';
import { View, ScrollView, Text, FlatList } from 'react-native';
import { Icon, ListItem, Button, Overlay } from 'react-native-elements';

import socketio from 'socket.io-client';
import api from '../../services/api';

import Item from './Item';

import { Container } from './styles';

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);
  const [note, setNote] = useState('');

  const [showModal, setShowModal] = useState(false);

  // usar refresh par novas alterações como pedidios finalizados
  // badge para indicar, disparo atravez da função finished
  // criar um estado no order context
  // quando disparar a finished ele fica true
  // aprarece o badge
  // ao dar refresh ele e setado como false

  function showInformations(l) {
    setNote(l.note);
    setItems(l.items);
    setShowModal(true);
  }

  useMemo(() => {
    async function loadOrders() {
      const response = await api.get('orders');
      setOrders(response.data);
      setLoading(false);
    }
    loadOrders();
  }, []);

  const socket = useMemo(() => socketio.connect(`${api.defaults.baseURL}`), []);

  useEffect(() => {
    let mounted = true;
    if (!loading) {
      socket.on('newOrder', (data) => {
        const alreadyOrder = orders.findIndex(
          (order) => order.identification === data.identification
        );
        if (alreadyOrder >= 0) {
          orders[alreadyOrder] = data;
          setOrders(orders);
        } else {
          setOrders([...orders, data]);
        }
      });
    }
    return () => (mounted = false);
  }, [socket, loading]);

  useEffect(() => {
    if (!loading) {
      socket.on('payment', (data) => {
        const filteredOrders = orders.filter(
          (orders) => orders.identification != data.identification
        );
        setOrders(filteredOrders);
      });
    }
  }, [orders, loading]);

  return (
    <Container>
      <FlatList
        data={orders}
        keyExtractor={(order) => String(order._id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Item data={item} setOrders={setOrders} orders={orders} />
        )}
      />
      <Overlay isVisible={showModal}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 30,
            }}
          >
            Pedido
          </Text>
          <ScrollView style={{ flex: 1, backgroundColor: '#ffe' }}>
            <Text style={{ fontSize: 18, marginTop: 5, marginBottom: 10 }}>
              Descrição do pedido
            </Text>
            <View
              style={{ borderBottomColor: 'black', borderBottomWidth: 1 }}
            />
            <Text style={{ marginTop: 10, fontSize: 18 }}>Produtos:</Text>
            <ScrollView style={{ flex: 1, backgroundColor: '#ffe' }}>
              {items.map((l, i) => (
                <ListItem
                  key={i}
                  leftAvatar={<Icon name='touch-app' />}
                  title={` ${l.product.name}`}
                  subtitle={`Quantidade: ${l.quantity}\nDescrição: ${l.product.description}`}
                  bottomDivider
                />
              ))}
            </ScrollView>

            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 10,
              }}
            />
            <Text style={{ marginTop: 10, fontSize: 18 }}>Observação:</Text>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>{note}</Text>
          </ScrollView>
          <Button
            buttonStyle={{ marginTop: 40 }}
            type='outline'
            title='Fechar'
            onPress={() => setShowModal(false)}
          />
        </View>
      </Overlay>
    </Container>
  );
}
