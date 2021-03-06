import { Form } from '@unform/mobile';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Dimensions, View } from 'react-native';
import { SearchBar } from '../../components/Form';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import Item from './Item';
import CategoryItem from './CategoryItem';
import { Container, ItemList, CategoryList } from './styles';
import ActionButton from '../../components/ActionButton';

const deviceHeight = Dimensions.get('window').height;

export default function AddItems({ navigation }) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [hasCategory,setHasCategory] = useState(false);

  const formRef = useRef(null);

  async function handleSubmit(data) {
    setHasCategory(false);
    setName(data.name);
    await loadProducts(1, data.name, true);
  }

  async function loadProducts(pageNumber = page, data = name, newItems) {
    if (loading) {
      return;
    }
    if(hasCategory){
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
      .catch(error => {});

    setItems(newItems ? response.data : [...items, ...response.data]);
    setTotal(Math.ceil(Number(response.headers['x-total-count']) / 10));
    newItems ? setPage(pageNumber + 1) : setPage(page + 1);
    setLoading(false);
  }

  async function ending() {
    navigation.navigate('Home');
  }

  async function loadCategories() {
    const response = await api.get('/categories');
    setCategories(response.data);
  }

  async function handleLoadCategoryProducts(id) {
    setHasCategory(true);
    const response = await api.get(`/categories/${id}`);
    setItems(response.data);
  }

  useEffect(() => {
    loadProducts();
    loadCategories();
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
          name="name"
          onSubmitEditing={() => formRef.current.submitForm()}
        />
      </Form>

      <ItemList
        ListFooterComponentStyle={{ paddingBottom: 90 }}
        ListFooterComponent={
          <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator color="#ddd" size="large" />}
          </View>
        }
        data={items}
        showsVerticalScrollIndicator={false}
        onEndReached={() => loadProducts()}
        onEndReachedThreshold={0.2}
        keyExtractor={itemKey => String(itemKey._id)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollFlatlist } },
            },
          ],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}
        renderItem={({ item }) => <Item item={item} />}
      />
      <CategoryList
        horizontal
        data={categories}
        keyExtractor={itemKey => String(itemKey._id)}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            handleLoadCategoryProducts={handleLoadCategoryProducts}
            
          />
        )}
      />
      <ActionButton onPress={ending}>
        <Icon name="send" size={25} color={'#fff'} />
      </ActionButton>
    </Container>
  );
}
