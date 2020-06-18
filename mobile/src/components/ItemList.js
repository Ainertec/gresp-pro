import React from 'react';

import { Icon, ListItem } from 'react-native-elements';

export default function ItemList({ item, setChanged, itemRemove }) {
  return (
    <ListItem
      style={{ borderRadius: 40 }}
      containerStyle={{ borderRadius: 30, marginBottom: 10 }}
      leftAvatar={
        item.product.drink ? (
          <Icon name='local-drink' />
        ) : (
          <Icon name='restaurant' />
        )
      }
      title={item.product.name}
      input={{
        inputContainerStyle: { width: 50 },
        defaultValue: `${item.quantity}`,
        placeholder: '0',
        label: 'Quantidade',
        onChangeText: (text) => {
          setChanged(true);
          item.quantity = text;
        },
        keyboardType: 'numeric',
      }}
      subtitle={`R$ ${item.product.price}`}
      rightIcon={{ name: 'clear', onPress: () => itemRemove(item.product._id) }}
      bottomDivider
    />
  );
}
