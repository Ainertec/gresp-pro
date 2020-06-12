import React from 'react';
import { Text, View, Button, YellowBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import Dialog from 'react-native-dialog';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket',
  'componentWillReceiveProps',
  'Possible Unhandled Promise',
]);
export default function App() {
  return (
    <>
      <StatusBar backgroundColor={'#3F173F'} translucent />
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </>
  );
}
