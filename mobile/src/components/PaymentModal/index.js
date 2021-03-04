import React, { useState, memo, useRef } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { useOrder } from '../../contexts/order';

import { Button } from '../Form';
import Alert from '../Alert';
import api from '../../services/api';

import {
  Modal,
  Check,
  HeaderPayment,
  TitlePayment,
  SubtitlePayment,
  TotalPayment,
} from './styles';

const { height } = Dimensions.get('window');

const PaymentModal = ({ showPay, setShowPay, order, goBack }) => {
  const [checked, setChecked] = useState(true);
  const [checked2, setChecked2] = useState(false);
  const [paymentKind, setPaymentKind] = useState('Dinheiro');
  const { setOrder } = useOrder();
  const paymentFailRef = useRef(null);
  const successRef = useRef(null);

  const navigation = useNavigation();

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
    await api
      .delete(`/orders/${order.identification}/${paymentKind}`)
      .catch(error => {
        paymentFailRef.current.open();
      });

    successRef.current.open();
    // setShowPay(false);
    setOrder({});
    // goBack && navigation.goBack();
  }

  function handleClosed() {
    setShowPay(false);
    // setOrder({});
    goBack && navigation.goBack();
  }

  return (
    <Modal isVisible={showPay}>
      <>
        <HeaderPayment>
          <Icon
            name="x"
            size={28}
            color="darkred"
            onPress={() => setShowPay(false)}
          />
        </HeaderPayment>
        <TitlePayment>Pagamento</TitlePayment>
        <SubtitlePayment>Escolha a forma de pagamento.</SubtitlePayment>

        <Check
          title="Dinheiro"
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="#000"
          checked={checked}
          onPress={() => selected(1)}
        ></Check>
        <Check
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="#000"
          title="Cartão"
          checked={checked2}
          onPress={() => selected(2)}
        ></Check>

        <TotalPayment>
          Total: R$ {order.total == undefined ? '0' : (order.total + ((order.cardfee? order.cardfee:0) + (order.tip? order.tip:0))).toFixed(2)}
        </TotalPayment>
        <TouchableOpacity onPress={payment}>
          <Button
            style={{
              marginTop: 30,
              height: height * 0.06,
              backgroundColor: '#e72847',
            }}
            customSize={height * 0.06}
            iconName="dollar-sign"
            title="Efetuar Pagamento"
          />
        </TouchableOpacity>
        <Alert
          ref={paymentFailRef}
          title="Ops..."
          subtitle="Falha ao pagar pedido"
        />
        <Alert
          ref={successRef}
          title="Tudo certo"
          subtitle="Pedido pago com sucesso"
          success
          handleClosed={handleClosed}
        />
      </>
    </Modal>
  );
};

export default memo(PaymentModal);
