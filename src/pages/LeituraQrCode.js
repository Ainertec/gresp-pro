import React, { useState, useEffect } from 'react';
import { Text, View, Image,AsyncStorage } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Header, Icon, Button} from 'react-native-elements';

export default function LeituraQrCode({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    /////////////////////////////////////////////////// aqui pega o código ohhhhhh //////////////////////////////////////////////////////////
    await AsyncStorage.setItem('id',data);
    navigation.navigate('Home');
  };

  if (hasPermission === null) {
    return <Text>É necessario permissão para acessar a camera!</Text>;
  }
  if (hasPermission === false) {
    return <Text>Não é possivel acessar a camera!</Text>;
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start'}}>
      <Header 
          leftComponent={<Image style={{ width: 100, height: 30}} source={require('../../img/logo.png')}/>} 
          rightComponent={<View><Icon name='arrow-forward' color='#fff' onPress={() => navigation.navigate('Home')}/><Text style={{color:"#fff"}} onPress={() => navigation.navigate('Home')}>Voltar</Text></View>} 
          containerStyle={{ backgroundColor: '#3F173F', justifyContent: 'space-around'}}/>
      <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={{height:450, marginTop:30}}/>
      {/* <View style={{marginTop:15, alignItems:"center"}}>
        {scanned && <Button title={'Atualizar'} buttonStyle={{width:300 ,backgroundColor:'#3F173F'}} onPress={() => setScanned(false)} />}
      </View> */}
    </View>
  );
}
