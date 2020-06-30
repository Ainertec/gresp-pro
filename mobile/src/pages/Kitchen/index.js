import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, ScrollView, Text, FlatList, Alert } from 'react-native';
import { Icon, ListItem, Button, Overlay, Badge } from 'react-native-elements';
import socketio from 'socket.io-client';

import api from '../../services/api';
import { useOrder } from '../../contexts/order';

import Item from './Item';

import { Container } from './styles';

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { shouldRefresh, setShouldRefresh } = useOrder();
  const [refreshing, setRefreshing] = useState(false);

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

  async function loadOrders() {
    const response = await api.get('orders');
    setOrders(response.data);
    setLoading(false);
  }

  async function refreshList() {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
    setShouldRefresh(0);
  }

  useMemo(() => {
    loadOrders();
  }, []);

  const socket = useMemo(() => socketio.connect(`${api.defaults.baseURL}`), []);

  useMemo(() => {
    socket.on('newOrder', (data) => {
      const alreadyOrder = orders.findIndex(
        (order) => order.identification === data.identification
      );
      if (alreadyOrder >= 0) {
        console.log('atualizado');
        orders[alreadyOrder] = data;
        setOrders(orders);
      } else {
        console.log('novo', data);
        setOrders((oldState) => [...oldState, data]);
      }
    });
  }, []);

  useMemo(() => {
    socket.on('payment', (data) => {
      console.log('opa');
      const filteredOrders = orders.filter(
        (order) => order.identification != data.identification
      );
      setOrders(filteredOrders);
    });
  }, []);

  // useEffect(() => {
  //   let mounted = true;
  //   if (!loading) {
  //     useSocket();
  //   }
  //   return () => (mounted = false);
  // }, [loading]);

  // useEffect(() => {
  //   let mounted = true;
  //   if (!loading) {
  //     socket.on('payment', (data) => {
  //       const filteredOrders = orders.filter(
  //         (orders) => orders.identification != data.identification
  //       );
  //       setOrders(filteredOrders);
  //     });
  //   }
  //   return () => (mounted = false);
  // }, [orders, loading]);

  useMemo(() => {
    socket.on('hasFinished', (data) => {
      console.log(shouldRefresh);
      Alert.alert(
        'Novos pedidos prontos!',
        'Na tela cozinha,arraste para baixo para atualizar a lista.'
      );
      setShouldRefresh((oldState) => oldState + 1);
    });
  }, []);

  return (
    <Container>
      {shouldRefresh > 0 && (
        <Badge
          value='Refresh necessário!'
          status='warning'
          badgeStyle={{ marginVertical: 10 }}
        />
      )}

      <FlatList
        data={orders}
        keyExtractor={(order) => String(order._id)}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Item
            data={item}
            setOrders={setOrders}
            orders={orders}
            socket={socket}
          />
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
