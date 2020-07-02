import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  useReducer,
} from 'react';
import { FlatList, Alert } from 'react-native';
import { Badge } from 'react-native-elements';
import socketio from 'socket.io-client';

import api from '../../services/api';
import { useOrder } from '../../contexts/order';

import Item from './Item';

import { Container } from './styles';
import { View } from 'react-native-animatable';

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { shouldRefresh, setShouldRefresh } = useOrder();
  const [refreshing, setRefreshing] = useState(false);

  const loadOrders = useCallback(async () => {
    const response = await api.get('orders');
    setOrders(response.data);
    setLoading(false);
  }, []);

  async function refreshList() {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
    setShouldRefresh(0);
  }

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const socket = useMemo(() => socketio.connect(`${api.defaults.baseURL}`), []);

  useEffect(() => {
    console.log(loading);
    if (!loading) {
      socket.on('newOrder', async (data) => {
        console.log('uma vez');
        const alreadyOrder = orders.findIndex((order) => order._id == data._id);
        if (alreadyOrder >= 0) {
          orders[alreadyOrder] = data;
          setOrders(orders);
        } else {
          setOrders((oldState) => [...oldState, data]);
        }
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      socket.on('payment', (data) => {
        console.log('opa', orders.length);
        const filteredOrders = orders.filter(
          (order) => order.identification != data.identification
        );
        setOrders(filteredOrders);
      });
    }
  }, [loading]);

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
          status='error'
          onPress={refreshList}
          badgeStyle={{ marginVertical: 4, height: 25, paddingHorizontal: 10 }}
          containerStyle={{
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 10,
          }}
        />
      )}

      <FlatList
        style={{ paddingTop: 15 }}
        ListFooterComponentStyle={{ paddingBottom: 15 }}
        ListFooterComponent={<View />}
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
