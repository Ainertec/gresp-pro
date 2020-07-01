import React from 'react';
import { Image, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SignIn from '../pages/SignIn';
import Connection from '../pages/Connection';

const AuthRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SignIn' component={SignIn} />
      <Stack.Screen name='Connection' component={Connection} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
