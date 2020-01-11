import React from 'react';
import { StyleSheet, StatusBar, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Image style={{width: 160, height: 60}} source={require('./img/logo.png')}/>
      <Image style={{width: 50, height: 50}} source={require('./img/load.gif')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    alignItems: 'center',
    justifyContent: 'center',
  },

  texto:{
    color:'#fff',
    fontSize:30,
  }
});
