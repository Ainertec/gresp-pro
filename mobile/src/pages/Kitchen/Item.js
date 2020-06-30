import React, { useRef } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
  ListItemStyled,
  RigthContentLabel,
  RigthContentListItem,
} from './styles';

const AnimatableItem = Animatable.createAnimatableComponent(ListItemStyled);

const Item = ({ data, orders, setOrders, socket }) => {
  const itemRef = useRef(null);
  const navigation = useNavigation();

  function handelNavigation() {
    navigation.navigate('Details', data);
  }

  async function finished(identification) {
    const response = await api.post('/kitchen', {
      identification,
    });
    itemRef.current.bounceOut().then((endState) => {
      const index = orders.findIndex(
        (orders) => orders.identification == identification
      );
      const filteredOrders = orders.filter(
        (order) => order.identification != identification
      );

      setOrders([...filteredOrders, response.data]);
      itemRef.current.bounceIn();
      socket.emit('newFinished', 1);
    });
  }

  return (
    <AnimatableItem
      ref={itemRef}
      leftAvatar={<Icon name='touch-app' color='#000' size={30} />}
      title={`Pedido N°: ${data.identification}`}
      subtitle={`Total: ${data.total.toFixed(2)}`}
      rightAvatar={
        <RigthContentListItem>
          <FeatherIcon
            name={data.finished ? 'check-circle' : 'x-circle'}
            size={26}
            color={data.finished ? '#3F173F' : '#000'}
            onPress={() => (data.finished ? {} : finished(data.identification))}
          />
          <RigthContentLabel>
            {data.finished ? 'Finalizado' : 'Finalizar'}
          </RigthContentLabel>
        </RigthContentListItem>
      }
      bottomDivider
      onPress={handelNavigation}
    />
  );
};

export default Item;
