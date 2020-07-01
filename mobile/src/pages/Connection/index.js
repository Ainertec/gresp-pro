import { useNavigation } from '@react-navigation/native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useRef } from 'react';
import { KeyboardAvoidingView, AsyncStorage } from 'react-native';
import * as Yup from 'yup';
import { Button, Input, Label } from '../../components/Form';
import Scanner from '../../components/QrReader';
import api from '../../services/api';
import { useOrder } from '../../contexts/order';
import { Container, Scroll, FormCode } from './styles';

export default function Connection() {
  const formRef = useRef(null);
  const navigation = useNavigation();

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});
      const schema = Yup.object().shape({
        ipAddress: Yup.string().required('O ip é obrigatório.'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      api.defaults.baseURL = `http://${data.ipAddress}:3333`;
      await AsyncStorage.setItem('@RN:ip', data.ipAddress);

      navigation.goBack();
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {};
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
        });
        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    async function loadIpAddress() {
      // const ipAddress = await AsyncStorage.getItem('@RN:ip');
      const ipAddress = await api.defaults.baseURL.split('//')[1].split(':')[0];

      formRef.current.setData({ ipAddress });
    }
    loadIpAddress();
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        behavior='height'
        enable
        keyboardVerticalOffset={100}
      >
        <Scroll>
          <Scanner formRef={formRef} cameraSide />

          <FormCode ref={formRef} onSubmit={handleSubmit}>
            <Label>Endereço ip:</Label>
            <Input
              name='ipAddress'
              iconName='leak-add'
              placeholder='Digite endereço ip'
            />
            <Button
              style={{ backgroundColor: '#e72847' }}
              onPress={() => formRef.current.submitForm()}
            />
          </FormCode>
        </Scroll>
      </KeyboardAvoidingView>
    </Container>
  );
}
