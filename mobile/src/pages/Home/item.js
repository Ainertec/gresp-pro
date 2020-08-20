import React, { memo, useState } from 'react';
import { Icon } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import { useOrder } from '../../contexts/order';
import { useAuth } from '../../contexts/auth';

import {
  ItemContainer,
  ItemContentQuantity,
  Quantity,
  QuantityLabel,
  RightContent,
  HomeItem,
} from './styles';
import { Text, View, Alert } from 'react-native';

const Item = ({ item, setChanged, itemRemove }) => {
  const { order, setOrder } = useOrder();
  const { user } = useAuth();
  const [courtesy, setCourtesy] = useState(false);

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
      const serializedItems = order.items;
      serializedItems[position] = existentItem;

      setOrder({ ...order, items: serializedItems });
    }
  }

  function handleToggleCourtesy(value) {
    setCourtesy(value);
    console.log(value);
    setChanged(true);
    const existentItem = order.items.find(
      (itemData) => itemData.product._id === item.product._id
    );
    if (existentItem) {
      const position = order.items.findIndex(
        (item) => item.product._id === existentItem.product._id
      );
      existentItem.courtesy = value;
      const serializedItems = order.items;
      serializedItems[position] = existentItem;

      setOrder({ ...order, items: serializedItems });
    }
  }

  return (
    <HomeItem
      leftAvatar={
        // user.admin ? (
        courtesy ? (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <FontAwesome5
              name='creative-commons-nc'
              size={28}
              onPress={() => handleToggleCourtesy(false)}
            />
            <Text>Cortesia</Text>
          </View>
        ) : (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon
              name={item.product.drink ? 'local-bar' : 'local-dining'}
              size={28}
              onPress={() => {
                user.admin
                  ? handleToggleCourtesy(true)
                  : Alert.alert(
                      'Ops...',
                      'Vocẽ não tem permissão para cortesia'
                    );
              }}
            />
            <Text>Add</Text>
            <Text>Cortesia</Text>
          </View>
        )
        // ) : (
        //   <Icon
        //     name={item.product.drink ? 'local-bar' : 'local-dining'}
        //     size={28}
        //   />
        // )
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
