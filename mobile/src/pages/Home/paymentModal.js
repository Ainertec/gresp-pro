import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Overlay, CheckBox, Badge, Button } from 'react-native-elements';
import api from '../../services/api';

export default function PaymentModal({ showPay, total, setShowPay, payment }) {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [paymentKind, setPaymentKind] = useState('Dinheiro');

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
    const Api = await api();

    const identification = await AsyncStorage.getItem('id');
    if (identification == null) return Alert.alert('identificação invalida!');

    const response = await Api.delete(
      `/orders/${identification}/${paymentKind}`
    );

    setShowPay(false);
    await AsyncStorage.removeItem('id');
    Alert.alert('Pedido Pago!', `Número:${identification}`);
  }

  return (
    <Overlay isVisible={showPay}>
      <View>
        <Text
          style={{
            marginTop: 40,
            textAlign: 'center',
            fontSize: 20,
            marginBottom: 50,
          }}
        >
          Pagamento
        </Text>
        <Badge
          status='success'
          value={
            <Text style={{ color: 'white', fontSize: 16 }}>
              Total: R$
              {total == undefined ? '0' : total.toFixed(2)}
            </Text>
          }
        />
        <CheckBox
          title='Dinheiro'
          value='Dinheiro'
          checked={checked}
          onPress={() => selected(1)}
        ></CheckBox>
        <CheckBox
          title='Cartão'
          checked={checked2}
          onPress={() => selected(2)}
        ></CheckBox>
        <Button
          buttonStyle={{ marginTop: 70, backgroundColor: 'green' }}
          type='solid'
          icon={{ name: 'send', size: 15, color: 'white' }}
          title='Efetuar'
          onPress={() => payment()}
        />
        <Button
          buttonStyle={{ marginTop: 5, backgroundColor: 'red' }}
          type='solid'
          icon={{ name: 'close', size: 15, color: 'white' }}
          title='Cancelar'
          onPress={() => setShowPay(false)}
        />
      </View>
    </Overlay>
  );
}
