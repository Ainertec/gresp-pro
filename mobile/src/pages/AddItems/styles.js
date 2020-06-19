import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { ListItem } from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
  background-color: #3f173f;
  justify-content: flex-start;
`;

export const ItemList = styled(Animated.FlatList)`
  padding-top: 80px;
  /* padding-bottom: 80px; */
`;

export const Item = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 30,
    paddingRight: 30,
  },
})`
  border-radius: 30px;

  margin: 0 8px 10px;
`;

export const ItemContentQuantity = styled.View`
  align-items: center;
  /* justify-content: flex-end;
  margin-left: 10px; */
  flex-direction: row;
`;
export const Quantity = styled.Text`
  text-align: center;
  font-weight: bold;
  padding: 0 5px;
  font-size: 15px;
`;
export const QuantityLabel = styled.Text`
  text-align: center;
  color: gray;
  font-size: 15px;
`;
export const ItemContainer = styled.View`
  text-align: center;
`;
