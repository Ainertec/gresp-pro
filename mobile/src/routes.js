import React from 'react';
import { Image } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Home from './pages/Home';
import Identificator from './pages/Identificator';
import Cozinha from './pages/Cozinha';
import LeituraQrCode from './pages/LeituraQrCode';
import ListaItens from './pages/ListaItens';

import Header from './components/HomeHeader';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitle: 'Opas',
        headerStyle: {
          backgroundColor: '#3F173F',
        },
      }}
    >
      <Stack.Screen name='Home' component={Home} />
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
        component={Cozinha}
        options={{
          tabBarLabel: 'Cozinha',
          tabBarIcon: ({ color }) => (
            <Icon name='tags' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name='search' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='LeituraQrCode'
        component={LeituraQrCode}
        options={{
          tabBarLabel: 'LeituraQrCode',
          tabBarIcon: ({ color }) => (
            <Icon name='cog' size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Routes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerShown: false,
        // header: (props) => <Header />,
        headerStyle: {
          backgroundColor: '#3F173F',
        },
      }}
      initialRouteName='Home'
    >
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerLeft: false,
        }}
        name='Home'
        component={HomeTabs}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerBackTitleVisible: false,
        }}
        name='ListaItens'
        component={ListaItens}
      />
    </Stack.Navigator>
  );
};

export default Routes;
