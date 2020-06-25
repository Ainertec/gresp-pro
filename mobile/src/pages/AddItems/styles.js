import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
const deviceWidth = Dimensions.get('window').width;

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

export const ActionButton = styled.TouchableOpacity`
  position: absolute;
  width: ${deviceWidth * 0.15}px;
  height: ${deviceWidth * 0.15}px;
  align-items: center;
  justify-content: center;
  right: ${deviceWidth * 0.02}px;
  bottom: ${deviceWidth * 0.02}px;
  /* background: #080705; */
  background: #7b1b53;
  border-radius: ${deviceWidth * 0.2}px;
`;
