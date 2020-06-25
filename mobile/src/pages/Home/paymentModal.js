import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Overlay, CheckBox, Badge, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { useOrder } from '../../contexts/order';
import api from '../../services/api';

export default function PaymentModal({ showPay, setShowPay }) {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [paymentKind, setPaymentKind] = useState('Dinheiro');
  const { setOrder, order } = useOrder();

  function selected(number) {
    if (number === 1) {
      setChecked2(false);
      setChecked(true);
      setPaymentKind('Dinheiro');
    } else {
      setChecked(false);
      setChecked2(true);
      setPaymentKind('Cartão');
    }
  }

  async function payment() {
    const response = await api
      .delete(`/orders/${order.identification}/${paymentKind}`)
      .catch((error) => {
        console.log(error.request);
      });
    setShowPay(false);
    setOrder({});
    Alert.alert('Pedido Pago!', `Número:${identification}`);
  }

  return (
    <Overlay
      isVisible={showPay}
      overlayStyle={{
        borderRadius: 20,
        paddingBottom: 0,
        height: 450,
        backgroundColor: '#3f173f',
      }}
    >
      <View style={{ justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Icon
            name='x'
            size={28}
            color='darkred'
            onPress={() => setShowPay(false)}
          />
        </View>
        <Text
          style={{
            marginTop: 30,
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 30,
            fontWeight: 'bold',
            color: '#fff',
          }}
        >
          Pagamento
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 10,
            textAlign: 'center',
            color: '#fff',
          }}
        >
          Escolha a forma de pagamento.
        </Text>

        <CheckBox
          containerStyle={{ borderRadius: 20, backgroundColor: '#fff' }}
          textStyle={{ color: '#000' }}
          title='Dinheiro'
          value='Dinheiro'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='#000'
          uncheckedColor='#fff'
          checked={checked}
          onPress={() => selected(1)}
        ></CheckBox>
        <CheckBox
          containerStyle={{ borderRadius: 20, backgroundColor: '#fff' }}
          textStyle={{ color: '#000' }}
          title='Cartão'
          checked={checked2}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='#000'
          onPress={() => selected(2)}
        ></CheckBox>

        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Total: R$
          {order.total == undefined ? '0' : order.total.toFixed(2)}
        </Text>

        <Button
          buttonStyle={{
            marginTop: 30,
            backgroundColor: '#e72847',
            borderRadius: 20,
          }}
          titleStyle={{ color: '#fff' }}
          type='solid'
          // icon={{ name: 'send', size: 15, color: 'white' }}
          title='Efetuar Pagamento'
          onPress={() => payment()}
        />
      </View>
    </Overlay>
  );
}
