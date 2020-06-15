import React from 'react';
import { Image, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import SignIn from '../pages/SignIn';

const AuthRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SignIn' component={SignIn} />
    </Stack.Navigator>
  );
};

export default AuthRoute;
