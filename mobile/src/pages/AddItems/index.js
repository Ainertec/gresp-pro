import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
// import { Icon } from 'react-native-elements';
import { Form } from '@unform/core';

import api from '../../services/api';

import { SearchBar } from '../../components/Form';

import { Container, ItemList } from './styles';
import Item from './Item';

const deviceHeight = Dimensions.get('window').height;

export default function ListaItens({ navigation }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  const formRef = useRef(null);

  async function handleSubmit(data) {
    setName(data.name);
    loadProducts(1, data.name, true);
  }

  async function loadProducts(pageNumber = page, data = name, newItems) {
    if (loading) {
      return;
    }

    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api
      .get(`items/${data}`, {
        params: {
          page: pageNumber,
        },
      })
      .catch((error) => {});
    console.log(response);

    setItems(newItems ? response.data : [...items, ...response.data]);
    setTotal(Math.ceil(Number(response.headers['x-total-count']) / 10));
    newItems ? setPage(pageNumber + 1) : setPage(page + 1);
    setLoading(false);
  }

  async function ending() {
    navigation.navigate('Home');
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const SEARCH_TRANSLATE = deviceHeight * 0.2;
  const scrollFlatlist = new Animated.Value(0);

  const ScrollDiff = scrollFlatlist.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolateLeft: 'clamp',
  });
  const clampScroll = Animated.diffClamp(ScrollDiff, 0, SEARCH_TRANSLATE);
  const heightSearch = clampScroll.interpolate({
    inputRange: [0, SEARCH_TRANSLATE],
    outputRange: [0, -SEARCH_TRANSLATE],
    extrapolate: 'clamp',
  });

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <SearchBar
          style={{
            transform: [{ translateY: heightSearch }],
          }}
          name='name'
          onSubmitEditing={() => formRef.current.submitForm()}
        />
      </Form>

      <ItemList
        ListFooterComponentStyle={{ paddingBottom: 80 }}
        ListFooterComponent={
          <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator color='#ddd' size='large' />}
          </View>
        }
        data={items}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadProducts()}
        onEndReachedThreshold={0.2}
        keyExtractor={(itemKey) => String(itemKey._id)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollFlatlist } },
            },
          ],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => <Item item={item} />}
      />

      {/* <View>
        <BottomNavigation hidden={true}>
          <BottomNavigation.Action
            key='voltar'
            icon='arrow-back'
            label='Voltar'
            onPress={() => loadProducts()}
          />
          <BottomNavigation.Action
            key='Finalizar'
            icon='done'
            label='Finalizar'
            onPress={() => ending()}
          />
        </BottomNavigation>
      </View> */}
    </Container>
  );
}
