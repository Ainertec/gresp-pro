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
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [paymentTip, setPaymentTip] = useState(true);
  const [paymentKind, setPaymentKind] = useState('dinheiro');
  const [paymentTotal,setPaymentTotal] = useState(0)
  const { setOrder } = useOrder();
  const paymentFailRef = useRef(null);
  const successRef = useRef(null);

  const navigation = useNavigation();

  function selected(number) {
    if (number === 1) {
      setChecked2(false);
      setChecked(true);
      setChecked3(false);
      setPaymentKind('dinheiro');
      setPaymentTotal(order.total == undefined ? 0 : (order.total + (order.tip && paymentTip? order.tip:0)) )
    } else if(number === 2){
      setChecked(false);
      setChecked2(true);
      setChecked3(false);
      setPaymentKind('credito');
      setPaymentTotal(order.total == undefined ? 0 : (order.total + (order.tip && paymentTip? order.tip:0) + (order.customerfee? order.cardcreditfee:0)) )
    }else{
      setChecked(false);
      setChecked2(false);
      setChecked3(true);
      setPaymentKind('debito');
      setPaymentTotal(order.total == undefined ? 0 : (order.total + (order.tip && paymentTip? order.tip:0) + (order.customerfee? order.carddebitfee:0)) )
    }
  }

  async function payment() {
    await api
      .delete(`/orders/${order.identification}/${paymentKind}/${paymentTip}`)
      .catch(error => {
        paymentFailRef.current.open();
      });

    successRef.current.open();
    // setShowPay(false);
    setOrder({});
    // goBack && navigation.goBack();
  }

  function handlePaymentTip(tipo) {
    if(tipo){
      setPaymentTip(true);
      setPaymentTotal(paymentTotal + (order.tip? order.tip:0) );
    }else{
      setPaymentTip(false);
      setPaymentTotal(paymentTotal - (order.tip? order.tip:0));
    }
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
          title="Crédito"
          checked={checked2}
          onPress={() => selected(2)}
        ></Check>
        <Check
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="#000"
          title="Débito"
          checked={checked3}
          onPress={() => selected(3)}
        ></Check>
        <Check
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="#000"
          title="Adicionar gorjeta"
          checked={paymentTip}
          onPress={() => {paymentTip? handlePaymentTip(false):handlePaymentTip(true)}}
        ></Check>

        <TotalPayment>
          Total: R$ {(paymentTotal).toFixed(2)}
        </TotalPayment>
        {
          checked || checked2 || checked3?(
            <TouchableOpacity onPress={payment}>
              <Button
                style={{
                  marginTop: 30,
                  height: height * 0.06,
                  backgroundColor: '#008000',
                }}
                customSize={height * 0.06}
                iconName="dollar-sign"
                title="Pago"
              />
            </TouchableOpacity>
          ):(
            <></>
          )         
        }
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
