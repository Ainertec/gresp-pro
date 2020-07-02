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
import { useOrder, OrderProvider } from '../../contexts/order';

import Item from './Item';

import { Container } from './styles';
import { View } from 'react-native-animatable';

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

  useEffect(() => {
    loadOrders();
  }, []);

  const socket = useMemo(() => socketio.connect(`${api.defaults.baseURL}`), []);

  useEffect(() => {
    if (!loading) {
      socket.on('newOrder', async (data) => {
        console.log('uma vez');
        const alreadyOrder = orders.findIndex(
          (order) => order._id === data._id
        );
        if (alreadyOrder >= 0) {
          orders[alreadyOrder] = data;
          setOrders(orders);
        } else {
          orders.push(data);
          setOrders(orders);
        }
      });
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      console.log('qunatas');
      socket.on('payment', (data) => {
        console.log('pagamento');
        const position = orders.findIndex(
          (order) => data.identification == order.identification
        );
        console.log(position);
        orders.splice(position, 1);
        setOrders(orders);
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
