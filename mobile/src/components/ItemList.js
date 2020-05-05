import React from 'react';

import { Icon, ListItem, } from 'react-native-elements';

export default function ItemList({
  listType,
  list,
  itemRemove,
  setChanged,
}) {
  return (
    <ListItem
      leftAvatar={<Icon name='restaurant' />}
      title={listType.name}
      input={{
        inputContainerStyle: { width: 50 },
        defaultValue: `${list.quantity}`,
        placeholder: '0',
        label: "Quantidade",
        onChangeText: text => { setChanged(true); list.quantity = text },
        keyboardType: "numeric",
      }}
      subtitle={`R$ ${listType.price}`}
      rightIcon={{ name: 'clear', onPress: () => itemRemove(listType._id) }}
      bottomDivider
    />
  );
}
