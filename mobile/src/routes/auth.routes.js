import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();

import SignIn from '../pages/SignIn';
import Connection from '../pages/Connection';

import { header, headerButtomBack } from './styles.routes';

const AuthRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name='SignIn'
        component={SignIn}
      />
      <Stack.Screen
        options={headerButtomBack}
        name='Connection'
        component={Connection}
      />
    </Stack.Navigator>
  );
};

export default AuthRoute;
