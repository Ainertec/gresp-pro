import React, { useState, useEffect, useMemo, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, AsyncStorage } from 'react-native';
import { Icon, ListItem, Button, Overlay } from 'react-native-elements';

import socketio from 'socket.io-client';
import api from '../../services/api';

export default function Kitchen() {
  const [openOrders, setOpenOrders] = useState([]);
  const [finishedOrders, setFinishedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([]);
  const [note, setNote] = useState('');

  const [showModal, setShowModal] = useState(false);

  function showInformations(l) {
    setNote(l.note);
    setItems(l.items);
    setShowModal(true);
  }
  async function finished(id) {
    const identification = Number.parseInt(id);
    const response = await api.post('/kitchen', {
      identification,
    });
    const index = openOrders.findIndex(
      (orders) => orders.identification == identification
    );
    console.log(index);
    openOrders[index] = response.data;
    setOpenOrders(openOrders);
  }

  useMemo(() => {
    async function loadOrders() {
      // const response = await api.get('orders');
      const responsefinisheds = await api.get('kitchen');
      setOpenOrders(responsefinisheds.data);
      // setFinishedOrders(responsefinisheds.data);
      setLoading(false);
    }
    loadOrders();
  }, []);

  const socket = useMemo(() => socketio.connect(`${api.defaults.baseURL}`), []);

  useEffect(() => {
    let mounted = true;
    if (!loading) {
      socket.on('newOrder', (data) => {
        const alreadyOrder = openOrders.findIndex(
          (order) => order.identification === data.identification
        );
        if (alreadyOrder >= 0) {
          openOrders[alreadyOrder] = data;
          setOpenOrders(openOrders);
        } else {
          setOpenOrders([...openOrders, data]);
        }
      });
    }
    return () => (mounted = false);
  }, [socket, loading]);

  useEffect(() => {
    if (!loading) {
      socket.on('payment', (data) => {
        const filteredOrders = openOrders.filter(
          (orders) => orders.identification != data.identification
        );
        setOpenOrders(filteredOrders);
      });
    }
  }, [openOrders, loading]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#3f173f' }}>
          {openOrders.map((orders) => (
            <ListItem
              containerStyle={{ borderRadius: 20, marginBottom: 10 }}
              key={orders._id}
              leftAvatar={<Icon name='touch-app' />}
              title={`Pedido N°: ${orders.identification}`}
              subtitle={`Total: ${orders.total.toFixed(2)}`}
              rightIcon={{
                name: orders.finished ? 'check-box' : 'close',
                onPress: () =>
                  orders.finished ? {} : finished(orders.identification),
              }}
              bottomDivider
              onPress={() => showInformations(orders)}
            />
          ))}
        </ScrollView>
      </View>
      <View style={{ marginTop: 15, backgroundColor: '#3F173F' }}></View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start',
  },
});
