import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Image, ScrollView, Text, Alert } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem, Input, Button } from 'react-native-elements';
import api from '../services/api';

import { useOrder } from '../contexts/order';

export default function ListaItens({ navigation }) {
  const { setOrder, order, addItem } = useOrder();
  const [items, setItems] = useState([]);
  const [selectedType, setSelectedType] = useState(0);
  const [name, setName] = useState('');

  async function search() {
    const Api = await api();
    if (selectedType == 1) {
      const response = await Api.get('/products', {
        params: { name },
      });

      setList(response.data);
    } else {
      const response = await Api.get('/drinkables', {
        params: { name },
      });
      setList(response.data);
    }
  }
  function addItens(l) {
    // if (producList == null) producList = navigation.getParam('listaProduc', []);
    // if (drinkableList == null)
    //   drinkableList = navigation.getParam('listaDrink', []);
    // if (l.quantity == undefined) {
    //   return Alert.alert('Atenção!', 'Selecione a quantidade!');
    // }
    // if (selectedType == 1) {
    //   var obj = {
    //     product: l,
    //     quantity: l.quantity,
    //   };
    //   for (const element of producList) {
    //     if (element.product._id == l._id) {
    //       return Alert.alert('Atenção!', `${l.name} já foi selecionado!`);
    //     }
    //   }
    //   producList.push(obj);
    //   return Alert.alert('Tudo Certo!', `O item ${l.name} foi adicionado!`);
    // } else {
    //   var obj = {
    //     drinkable: l,
    //     quantity: l.quantity,
    //   };
    //   for (const element of drinkableList) {
    //     if (element.drinkable._id == l._id) {
    //       return Alert.alert('Atenção', `O item ${l.name} já foi selecionado!`);
    //     }
    //   }
    //   drinkableList.push(obj);
    //   return Alert.alert('Tudo Certo!', `O item ${l.name} foi adicionado!`);
    // }
  }
  async function ending() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    async function load() {
      const response = await api.get('/items');

      setItems(response.data);
    }

    load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 10, flexDirection: 'row' }}>
        <Input
          containerStyle={{ width: 290 }}
          inputStyle={{ color: 'white' }}
          placeholder='Nome'
          onChangeText={(text) => setName(text)}
        />
        <Button
          containerStyle={{ width: 50 }}
          type='solid'
          buttonStyle={{ backgroundColor: 'white' }}
          icon={<Icon name='youtube-searched-for' size={15} />}
          onPress={() => search()}
        />
      </View>

      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#ffe' }}>
          {items.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={
                <Icon name={!l.drink ? 'local-dining' : 'local-bar'} />
              }
              title={l.name}
              subtitle={`R$ ${l.price}`}
              input={{
                inputContainerStyle: { width: 55 },
                defaultValue: l.quantity == undefined ? '' : `${l.quantity}`,
                placeholder: '0',
                label: 'Quantidade',
                onChangeText: (text) => {
                  l['quantity'] = text;
                },
                keyboardType: 'numeric',
              }}
              rightIcon={{ name: 'add', onPress: () => addItem(l), size: 30 }}
              bottomDivider
              onPress={() =>
                Alert.alert(
                  'Informações',
                  `Nome: ${l.name} 
Descrição: ${l.description}`

                  // [
                  //  {text: `Descrição: ${l.description}`},
                  // ]
                )
              }
            />
          ))}
        </ScrollView>
      </View>
      <View>
        <BottomNavigation hidden={true}>
          <BottomNavigation.Action
            key='voltar'
            icon='arrow-back'
            label='Voltar'
            onPress={() => navigation.navigate('Home')}
          />
          <BottomNavigation.Action
            key='Finalizar'
            icon='done'
            label='Finalizar'
            onPress={() => ending()}
          />
        </BottomNavigation>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start',
  },
});
