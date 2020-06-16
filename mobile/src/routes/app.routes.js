import React from 'react';
import { Image, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';

import Home from '../pages/Home/index';
import Setting from '../pages/Setting';
import Cozinha from '../pages/Cozinha';
import LeituraQrCode from '../pages/LeituraQrCode';
import ListaItens from '../pages/ListaItens';

import logo from '../assets/logo.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const header = {
  headerTitleAlign: 'center',
  headerTitle: () => (
    <Image
      source={logo}
      resizeMode='contain'
      style={{ width: 120, paddingTop: 50 }}
    />
  ),
  headerStyle: {
    backgroundColor: '#3F173F',
    elevation: 15,
  },
  headerBackTitleStyle: {
    color: '#fff',
    bacbackgroundColor: '#fff',
  },
  gestureDirection: 'horizontal',
  gestureEnabled: true,
};

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Image
            source={logo}
            resizeMode='contain'
            style={{ width: 120, paddingTop: 50 }}
          />
        ),
        headerRight: () => (
          <Icon
            onPress={() => navigation.navigate('Setting')}
            name='cog'
            size={25}
            color='#fff'
          />
        ),
        headerRightContainerStyle: {
          paddingRight: 10,
        },
        headerStyle: {
          backgroundColor: '#3F173F',
          elevation: 1000,
        },
      })}
    >
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

const KitchenStack = () => {
  return (
    <Stack.Navigator screenOptions={header}>
      <Stack.Screen name='Cozinha' component={Cozinha} />
    </Stack.Navigator>
  );
};

const ReadStack = () => {
  return (
    <Stack.Navigator screenOptions={header}>
      <Stack.Screen name='ler' component={LeituraQrCode} />
    </Stack.Navigator>
  );
};

function HomeTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        tabStyle: { backgroundColor: '#3F173F' },
        activeTintColor: '#fff',
      }}
      initialRouteName='Home'
    >
      <Tab.Screen
        name='Cozinha'
        component={KitchenStack}
        options={{
          tabBarLabel: 'Cozinha',
          tabBarIcon: ({ color }) => (
            <MatirialIcon name='kitchen' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name='home' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='LeituraQrCode'
        component={ReadStack}
        options={{
          tabBarLabel: 'Qr code',
          tabBarIcon: ({ color }) => (
            <Icon name='camera' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name='Home'
        component={HomeTabs}
      />
      <Stack.Screen options={header} name='Items' component={ListaItens} />
      <Stack.Screen options={header} name='Setting' component={Setting} />
    </Stack.Navigator>
  );
};

export default Routes;
