import React, { memo } from 'react';
import { Icon } from 'react-native-elements';

import { useOrder } from '../../contexts/order';

import {
  ItemContainer,
  ItemContentQuantity,
  Quantity,
  QuantityLabel,
  RightContent,
  HomeItem,
} from './styles';

const Item = ({ item, setChanged, itemRemove }) => {
  const { order, setOrder } = useOrder();

  function changeQuantity(value) {
    setChanged(true);
    const existentItem = order.items.find(
      (itemData) => itemData.product._id === item.product._id
    );
    if (existentItem) {
      const position = order.items.findIndex(
        (item) => item.product._id === existentItem.product._id
      );
      const finalQuantity = existentItem.quantity + value;
      existentItem.quantity = finalQuantity > 0 ? finalQuantity : 1;
      const serializadItems = order.items;
      serializadItems[position] = existentItem;

      setOrder({ ...order, items: serializadItems });
    }
  }

  return (
    <HomeItem
      leftAvatar={
        item.product.drink ? (
          <Icon name='local-drink' size={28} />
        ) : (
          <Icon name='restaurant' size={28} />
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
                onPress={() => changeQuantity(-1)}
              />
              <Quantity>{item.quantity}</Quantity>
              <Icon
                name='add'
                raised
                size={12}
                onPress={() => changeQuantity(1)}
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
      bottomDivider
    />
  );
};

export default memo(Item);
