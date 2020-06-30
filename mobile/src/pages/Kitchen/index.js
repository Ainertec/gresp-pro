import React, { useState, useMemo } from 'react';
import { FlatList, Alert } from 'react-native';
import { Badge } from 'react-native-elements';
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

  useMemo(() => {
    socket.on('hasFinished', (data) => {
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
    </Container>
  );
}
