import React, { useState, useEffect, useCallback } from 'react';
import { Icon, ListItem } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';

import { useOrder } from '../../contexts/order';

import {
  ItemContainer,
  ItemContentQuantity,
  Quantity,
  QuantityLabel,
  RightContent,
} from './styles';

export default function Item({ item, setChanged, itemRemove }) {
  const [quantity, setQuantity] = useState(0);
  const { order, setOrder } = useOrder();

  function existItem(item) {
    return order.items.find(
      (itemData) => itemData.product._id === item.product._id
    );
  }

  useEffect(() => {
    console.log('ajdfhasoidfua');
    const existentItem = existItem(item);
    if (existentItem) {
      setQuantity(Number(existentItem.quantity));
    }
  }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     const existentItem = existItem(item);

  //     if (existentItem) {
  //       setQuantity(Number(existentItem.quantity));
  //     }
  //   }, [])
  // );

  useEffect(() => {
    const existentItem = existItem(item);
    if (existentItem) {
      const position = order.items.findIndex(
        (item) => item.product._id === existentItem.product._id
      );
      existentItem.quantity = quantity;
      const serializadItems = order.items;
      serializadItems[position] = existentItem;

      setOrder({ ...order, items: serializadItems });
    }
  }, [quantity]);

  return (
    <ListItem
      style={{ borderRadius: 40 }}
      containerStyle={{
        borderRadius: 30,
        marginBottom: 10,
        marginHorizontal: 8,
      }}
      leftAvatar={
        item.product.drink ? (
          <Icon name='local-drink' />
        ) : (
          <Icon name='restaurant' />
        )
      }
      title={item.product.name}
      rightElement={
        <RightContent>
          <ItemContainer>
            <ItemContentQuantity>
              <Icon
                // reverse
                raised
                name='remove'
                size={12}
                onPress={() => setQuantity((state) => state - 1)}
              />
              <Quantity>{quantity}</Quantity>
              <Icon
                name='add'
                raised
                size={12}
                onPress={() => setQuantity((state) => state + 1)}
              />
            </ItemContentQuantity>
            <QuantityLabel>Quantidade</QuantityLabel>
          </ItemContainer>
          <Icon
            name='clear'
            size={26}
            onPress={() => itemRemove(item.product._id)}
          />
        </RightContent>
      }
      subtitle={`R$ ${item.product.price}`}
      // rightIcon={{ name: 'clear',  }}
      bottomDivider
    />
  );
}
