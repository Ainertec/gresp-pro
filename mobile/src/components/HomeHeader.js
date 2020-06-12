import React from 'react';
import { View, Image } from 'react-native';
// import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon } from 'react-native-elements';

export default function HomeHeader({ navigation, left, setShowConfigs }) {
  console.log(left);
  return (
    <>
      <View style={{ alignItems: 'center', paddingTop: 10 }}>
        <Header
          centerComponent={
            <Image
              style={{ width: 100, height: 30 }}
              source={require('../../img/logo.png')}
            />
          }
          rightComponent={
            left && (
              <Icon
                name='leak-add'
                color='#fff'
                onPress={() => setShowConfigs(true)}
              />
            )
          }
          containerStyle={{
            backgroundColor: '#3F173F',
            // justifyContent: 'center',
          }}
        />
      </View>
      {/* <View style={{ marginTop: 10 }}>
        <BottomNavigation hidden={false}>
          <BottomNavigation.Action
            key="Ler"
            icon="center-focus-strong"
            onPress={() => navigation.navigate('LeituraQrCode')}
          />
          <BottomNavigation.Action
            key="Pedido"
            icon="kitchen"
            onPress={() => navigation.navigate('Cozinha')}
          />
          <BottomNavigation.Action
            key="Digitar"
            icon="create"
            onPress={() => navigation.navigate('Identificator')

            }

          />

        </BottomNavigation> */}

      {/* </View> */}
    </>
  );
}
