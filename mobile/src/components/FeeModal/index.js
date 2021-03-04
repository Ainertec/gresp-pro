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
  HeaderFee,
  TitleFee,
  SubtitleFee,
  TotalFee,
} from './styles';
import { Form, TextInput } from '../../pages/Home/styles';

const { height } = Dimensions.get('window');

const FeeModal = ({ showFee, setShowFee, setOrderPayment, setShowPay, order, goBack }) => {
  const { setOrder } = useOrder();
  const [checked, setChecked] = useState(false);
  const [cardFee, setCardFee] = useState(0.00)
  const [tip, setTip] = useState(0.00)
  const paymentFailRef = useRef(null);
  const successRef = useRef(null);

  const navigation = useNavigation();

  async function addFee() {
    await api
      .put(`/ordersfees/${order.identification}`,{cardfee:cardFee,tip}).then(response => {
        successRef.current.open();
        setOrder(response.data.order);
        if(setOrderPayment!=null){
          setOrderPayment(response.data.order);
        }
        setShowFee(false);
        setShowPay(true);
      })
      .catch(error => {
        paymentFailRef.current.open();
      });
  }

  function cardFeePercent(value){
    setCardFee((order.total*value)/100);
  }

  function tipPercent(value){
    setTip((order.total*value)/100);
  }

  function handleClosed() {
    setShowFee(false);
    // setOrder({});
    goBack && navigation.goBack();
  }

  return (
    <Modal isVisible={showFee}>
      <>
        <HeaderFee>
          <Icon
            name="x"
            size={28}
            color="darkred"
            onPress={() => setShowFee(false)}
          />
        </HeaderFee>
        <TitleFee>Taxas</TitleFee>

        <SubtitleFee>Adicionar taxas</SubtitleFee>
        
        <Check
            title="Porcentagem %"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checkedColor="#000"
            checked={checked}
            onPress={() => checked? setChecked(false):setChecked(true)}
            ></Check>

        <Form>
            <TextInput
                onChangeText={text => ( checked? cardFeePercent(text? parseFloat(text):0):setCardFee(text? parseFloat(text):0) )}
                editable={true}
                placeholder="Taxa cartão"
                />
        </Form>
        <Form>
            <TextInput
                onChangeText={text => ( checked? tipPercent(text? parseFloat(text):0):setTip(text? parseFloat(text):0) )}
                editable={true}
                placeholder="Taxa serviço/grojeta"
                />
        </Form>

        <TotalFee>
          Total de taxas: R$ { (cardFee+tip).toFixed(2) }
        </TotalFee>
        <TouchableOpacity onPress={addFee}>
          <Button
            style={{
              marginTop: 30,
              height: height * 0.06,
              backgroundColor: '#e72847',
            }}
            customSize={height * 0.06}
            iconName="dollar-sign"
            title="Proximo"
          />
        </TouchableOpacity>
        <Alert
          ref={paymentFailRef}
          title="Ops..."
          subtitle='Falha ao adicionar taxa!'
        />
        <Alert
          ref={successRef}
          title="Tudo certo"
          subtitle="Taxa adicionada!"
          success
          handleClosed={handleClosed}
        />
      </>
    </Modal>
  );
};

export default memo(FeeModal);