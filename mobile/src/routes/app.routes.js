import React from 'react';
import { Image, View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';

import { useOrder } from '../contexts/order';

import Home from '../pages/Home/index';
import Setting from '../pages/Setting';
import Kitchen from '../pages/Kitchen';
import QrReader from '../pages/QrReader';
import AddItems from '../pages/AddItems/index';
import Details from '../pages/Details';

import logo from '../assets/logo.png';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <MatirialIcon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function HomeIconWithBadge(props) {
  const { shouldRefresh } = useOrder();

  return <IconWithBadge {...props} badgeCount={shouldRefresh} />;
}

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
    elevation: 25,
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
          elevation: 16,
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
      <Stack.Screen name='Cozinha' component={Kitchen} />
    </Stack.Navigator>
  );
};

const ReadStack = () => {
  return (
    <Stack.Navigator screenOptions={header}>
      <Stack.Screen name='ler' component={QrReader} />
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
            <HomeIconWithBadge name='kitchen' size={24} color={color} />
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
        name='QrReader'
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
      <Stack.Screen
        options={{ ...header, headerLeft: false }}
        name='Items'
        component={AddItems}
      />
      <Stack.Screen options={header} name='Setting' component={Setting} />
      <Stack.Screen options={header} name='Details' component={Details} />
    </Stack.Navigator>
  );
};

export default Routes;
