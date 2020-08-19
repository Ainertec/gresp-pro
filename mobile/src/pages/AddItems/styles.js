import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
import { ListItem } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';
const deviceWidth = Dimensions.get('window').width;

export const Container = styled.View`
  flex: 1;
  background-color: #3f173f;
  justify-content: flex-start;
`;

export const ItemList = styled(Animated.FlatList)`
  padding-top: 80px;
  /* margin-bottom: 20px; */
  /* padding-bottom: 180px; */
`;

export const Item = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 24,
    paddingRight: 30,
  },
})`
  border-radius: 24px;

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
  z-index: 4;
  justify-content: center;
  right: ${deviceWidth * 0.04}px;
  bottom: ${deviceWidth * 0.07}px;
  /* background: #080705; */
  background: #e72847;
  border-radius: ${deviceWidth * 0.2}px;
`;

export const CategoryContainer = styled(RectButton)`
  height: 80px;
  width: 80px;
  margin: 0 10px 20px 10px;
  align-items: center;
  justify-content: center;
  /* background: #e72847; */
  background: ${(props) => (props.color ? props.color : '#e72847')};
  border-radius: 10px;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  color: #fff;
`;
export const CategoryList = styled.FlatList`
  position: absolute;
  bottom: 0;
  margin-right: 90px;
  z-index: 1;
`;
