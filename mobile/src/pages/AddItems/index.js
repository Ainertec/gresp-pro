import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, FlatList } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Icon, ListItem, Input, Button } from 'react-native-elements';

import { useOrder } from '../contexts/order';
import api from '../services/api';
import { Container, ItemList } from './styles';

export default function ListaItens({ navigation }) {
  const { addItem } = useOrder();
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
    <Container>
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

      <ItemList
        data={items}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <ListItem
            contentContainerStyle={{ marginTop: 20 }}
            leftAvatar={
              <Icon name={!item.drink ? 'local-dining' : 'local-bar'} />
            }
            title={item.name}
            subtitle={`R$ ${l.price}`}
            input={{
              inputContainerStyle: { width: 55 },
              defaultValue:
                item.quantity == undefined ? '' : `${item.quantity}`,
              placeholder: '0',
              label: 'Quantidade',
              onChangeText: (text) => {
                l['quantity'] = text;
              },
              keyboardType: 'numeric',
            }}
            rightIcon={{ name: 'add', onPress: () => addItem(item), size: 30 }}
            bottomDivider
            onPress={() =>
              Alert.alert(
                'Informações',
                `Nome: ${item.name} 
Descrição: ${item.description}`
              )
            }
          />
        )}
      />

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
    </Container>
  );
}
