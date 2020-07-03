import React, { useState, memo } from 'react';
import { Dimensions, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useOrder } from '../../contexts/order';
// import { Button } from 'react-native-elements';

import api from '../../services/api';
import { Button, Input, Label } from '../../components/Form';

import {
  Modal,
  Check,
  HeaderPayment,
  TitlePayment,
  SubtitlePayment,
  TotalPayment,
} from './styles';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const PaymentModal = ({ showPay, setShowPay }) => {
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
    console.log('paymentt');
    const response = await api
      .delete(`/orders/${order.identification}/${paymentKind}`)
      .catch((error) => {
        console.log(error.request);
      });

    Alert.alert('Pedido Pago!', `Número:${order.identification}`);
    setShowPay(false);
    setOrder({});
  }

  return (
    <Modal isVisible={showPay}>
      <>
        <HeaderPayment>
          <Icon
            name='x'
            size={28}
            color='darkred'
            onPress={() => setShowPay(false)}
          />
        </HeaderPayment>
        <TitlePayment>Pagamento</TitlePayment>
        <SubtitlePayment>Escolha a forma de pagamento.</SubtitlePayment>

        <Check
          title='Dinheiro'
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='#000'
          checked={checked}
          onPress={() => selected(1)}
        ></Check>
        <Check
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checkedColor='#000'
          title='Cartão'
          checked={checked2}
          onPress={() => selected(2)}
        ></Check>

        <TotalPayment>
          Total: R$ {order.total == undefined ? '0' : order.total.toFixed(2)}
        </TotalPayment>
        <TouchableOpacity onPress={payment}>
          <Button
            style={{
              marginTop: 30,
              height: height * 0.06,
              backgroundColor: '#e72847',
            }}
            customSize={height * 0.06}
            iconName='dollar-sign'
            title='Efetuar Pagamento'
          />
        </TouchableOpacity>
      </>
    </Modal>
  );
};

export default memo(PaymentModal);
