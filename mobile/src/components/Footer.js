import React from 'react';
import { View, Text } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, } from 'react-native-elements';

export default function Footer({
  navigation,
  listaProduc,
  listaDrink,
  orders,
  setShowPay,
  sendOrder
}) {

  return (
    <View>
      <BottomNavigation hidden={true}>
        <BottomNavigation.Action
          key="Ler"
          icon="add-circle"
          label="Adicionar"
          onPress={() => navigation.navigate('ListaItens', { listaProduc, listaDrink })}
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>Pedido N°: {orders.identification}</Text>

        </View>
      </BottomNavigation>
      <Header containerStyle={{ backgroundColor: '#fff' }}
        leftComponent={
          <Icon
            style={{ marginBottom: 10 }}
            reverse raised color='#a46810'
            name='monetization-on'
            onPress={() => setShowPay(true)} />}

        centerComponent={
          <Text>Total: R${(orders.total == undefined) ? "0" : orders.total.toFixed(2)} </Text>}
        rightComponent={
          <Icon
            style={{ marginBottom: 10 }}
            reverse raised color='#7b1b53'
            name='send'
            onPress={() => sendOrder()} />}
      />
    </View>
  );
}
