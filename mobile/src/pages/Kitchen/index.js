import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { FlatList, View } from 'react-native';
import { Badge } from 'react-native-elements';
import socketio from 'socket.io-client';

import api from '../../services/api';
import { useOrder } from '../../contexts/order';

import Item from './Item';

import { Container } from './styles';

export default function Kitchen() {
  const [loading, setLoading] = useState(true);
  const { shouldRefresh, setShouldRefresh } = useOrder();
  const [refreshing, setRefreshing] = useState(false);
  const [kitchenOrders, setKitchenOrders] = useState([]);

  async function loadKitchenOrders() {
    const response = await api.get('orders');
    setKitchenOrders(response.data);
    setLoading(false);
  }

  const addOrders = useCallback(
    (data) => {
      setKitchenOrders((oldState) => [...oldState, data]);
    },
    [setKitchenOrders]
  );

  const updateOrders = useCallback(
    (data) => {
      if (loading) return;
      setKitchenOrders((oldState) =>
        oldState.map((order) => {
          return order._id == data._id ? data : order;
        })
      );
    },
    [setKitchenOrders, loading]
  );
  const removeOrders = useCallback(
    (data) => {
      setKitchenOrders((oldState) =>
        oldState.filter((order) => data.identification != order.identification)
      );
    },
    [setKitchenOrders]
  );

  async function refreshList() {
    setRefreshing(true);
    await loadKitchenOrders();
    setRefreshing(false);
    setShouldRefresh(0);
  }

  useEffect(() => {
    loadKitchenOrders();
  }, []);

  const socket = useMemo(() => socketio(`${api.defaults.baseURL}`), []);

  useMemo(() => {
    socket.on('newOrder', (data) => {
      addOrders(data);
    });
  }, [addOrders]);

  useMemo(() => {
    if (kitchenOrders === 0) return;
    socket.on('updatedOrder', (data) => {
      updateOrders(data);
    });
  }, [updateOrders]);

  useMemo(() => {
    socket.on('payment', (data) => {
      removeOrders(data);
    });
  }, [removeOrders]);

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
        data={kitchenOrders}
        keyExtractor={(order) => String(order._id)}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Item
            data={item}
            setOrders={setKitchenOrders}
            orders={kitchenOrders}
            socket={socket}
          />
        )}
      />
    </Container>
  );
}
