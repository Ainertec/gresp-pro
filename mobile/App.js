import React,{ useEffect }  from 'react';
import { YellowBox, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import * as Updates from 'expo-updates';
import Routes from './src/routes';

import { AuthProvider } from './src/contexts/auth';
import { OrderProvider } from './src/contexts/order';


YellowBox.ignoreWarnings(['Unrecognized WebSocket']);
export default function App() {
  useEffect(() =>{
    async function updateApp(){
      const {isAvailable} = await Updates.checkForUpdateAsync();
      if(isAvailable){
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    }
    updateApp();

  },[])
  return (
    <>
      <StatusBar backgroundColor={'#3F173F'} translucent />
      <NavigationContainer>
        <AuthProvider>
          <OrderProvider>
            <Routes />
          </OrderProvider>
        </AuthProvider>
      </NavigationContainer>
    </>
  );
}
