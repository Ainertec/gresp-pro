import React,{useState,} from 'react';
import {View,Text, AsyncStorage} from 'react-native';
import {Overlay, Input, Button} from 'react-native-elements';

export default function Configs({navigation}){
  const [ip,setIp] = useState('');
  async function hendleSubmit(){
    await AsyncStorage.setItem('ip',ip);
  
    navigation.navigate('Home');
  }
  return (
    <View style={{ marginTop: 15, backgroundColor:'3F173F' }}>
      <Overlay isVisible={true} >
        <Text style={{ marginTop: 60, textAlign: "center", fontSize: 20, marginBottom: 50 }}>Configurar IP de Rota</Text>
        <Input keyboardType="numeric" placeholder='Exemplo 192.168.0.1' onChangeText={text=>setIp(text)} />
        <Button buttonStyle={{ marginTop: 40 }} type="solid" title="Salvar" onPress={() => hendleSubmit()} />
      </Overlay>
    </View>
  );
}