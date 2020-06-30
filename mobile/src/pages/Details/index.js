import React from 'react';
import { FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

import {
  Container,
  Title,
  Header,
  HeaderLine,
  HeaderText,
  HeaderTextLine,
  List,
  Item,
} from './styles';

const Details = () => {
  const order = useRoute().params;
  return (
    <Container>
      <Title>Detalhes do Pedido</Title>
      <Header>
        <HeaderLine>
          <HeaderTextLine>Identificação: {order.identification}</HeaderTextLine>
          <HeaderTextLine>Total: R$ {order.total.toFixed(2)}</HeaderTextLine>
        </HeaderLine>

        <HeaderText>
          Observações: {order.note === ' ' ? 'Nenhuma ' : order.note}
        </HeaderText>
      </Header>
      <List
        data={order.items}
        keyExtractor={(item) => String(item.product._id)}
        renderItem={({ item }) => (
          <Item
            leftIcon={{
              name: item.product.drink ? 'local-drink' : 'restaurant',
              color: '#000',
              size: 26,
            }}
            title={item.product.name}
            rightTitle={`R$ ${item.product.price}`}
            subtitle={item.product.description}
            rightSubtitle={`Quant. ${item.quantity}`}
          />
        )}
      />
    </Container>
  );
};

export default Details;
