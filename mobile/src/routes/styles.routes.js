import React from 'react';
import { Image, View, Text } from 'react-native';
import MatirialIcon from 'react-native-vector-icons/MaterialIcons';
import { useOrder } from '../contexts/order';
import logo from '../assets/logo.png';

export const header = {
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

export const headerButtomBack = ({ navigation }) => ({
  ...header,
  headerLeft: () => (
    <MatirialIcon
      name='arrow-back'
      onPress={() => navigation.goBack()}
      color='#fff'
      size={30}
    />
  ),
  headerLeftContainerStyle: { paddingLeft: 10 },
});

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

export const HomeIconWithBadge = (props) => {
  const { shouldRefresh } = useOrder();

  return <IconWithBadge {...props} badgeCount={shouldRefresh} />;
};
