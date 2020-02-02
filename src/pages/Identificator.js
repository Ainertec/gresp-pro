import React, { useState } from 'react';
import { View, AsyncStorage, Image } from 'react-native';

import Dialog from 'react-native-dialog'

import api from '../services/api'

export default function Identificator({ navigation }) {
  var [identification, setIdentification] = useState('');
  async function handleSubmit() {

    await AsyncStorage.setItem('id', identification);
    navigation.navigate('Home');
  }
  return (
     <View style={{ flex: 1, backgroundColor: '#3F173F',  alignItems:"center" }}>
       <Image style={{width: 160, height: 60, marginTop:80}} source={require('../../img/logo.png')}/>
      <Dialog.Container visible={true}  >
        <Dialog.Title style={{fontWeight:"bold"}}>Número do pedido</Dialog.Title>
        <Dialog.Description>Digie o número do pedido</Dialog.Description>
        <Dialog.Input type='number' keyboardType="numeric"  placeholder="digite aqui" wrapperStyle="underlined" onChangeText={setIdentification} />
        <Dialog.Button label='cancelar' onPress={()=> navigation.navigate('Home') }color="red" />
        <Dialog.Button label='enviar' onPress={handleSubmit} />
      </Dialog.Container>
    </View>
  )
}