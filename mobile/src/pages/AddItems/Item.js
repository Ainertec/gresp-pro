import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native';

import { useOrder } from '../../contexts/order';

import {
  Item as ItemContent,
  ItemContentQuantity,
  Quantity,
  QuantityLabel,
  ItemContainer,
} from './styles';

const Item = ({ item }) => {
  const { addItem, removeItem, order, setOrder } = useOrder();
  const [quantity, setQuantity] = useState(1);

  function handleSelect(data) {
    data.quantity = quantity;

    const alrearySelected = order.items.findIndex(
      (item) => item.product._id === data._id
    );

    if (alrearySelected >= 0) {
      removeItem(data);
    } else {
      addItem(data);
    }
  }

  function existItem(item) {
    return order.items.find((itemData) => itemData.product._id === item._id);
  }

  useEffect(() => {
    const existentItem = existItem(item);
    if (existentItem) {
      setQuantity(Number(existentItem.quantity));
    }
  }, []);

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
    <ItemContent
      style={existItem(item) && styles.selectedItem}
      leftAvatar={<Icon name={!item.drink ? 'local-dining' : 'local-bar'} />}
      title={item.name}
      subtitle={`R$ ${item.price.toFixed(2)}`}
      rightElement={
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
      }
      chevron
      onPress={() => handleSelect(item)}
    />
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderColor: '#e72847',
    borderWidth: 2,
  },
});

export default Item;
