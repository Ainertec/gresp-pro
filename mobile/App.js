import React from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';

import { AuthProvider } from './src/contexts/auth';

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
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
