import styled from 'styled-components/native';
import { Icon, ListItem } from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
  background: #3f173f;
  /* background: #fff; */
  justify-content: flex-start;
`;

export const ObsevationContainer = styled.View`
  /* align-self: stretch;
  background: #fff;
  margin-top: 5px;
  margin-bottom: 0px; */
  border-radius: 20px;
`;

export const ObservationNote = styled.Text`
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
  margin-left: 5px;
`;

export const ObservationInput = styled.TextInput`
  border-width: 1px;
  border-color: #ddd;
  font-size: 15px;
  border-radius: 21px;
  padding-left: 8px;
  margin-bottom: 10px;
  height: 44px;
`;
export const FooterContainer = styled.View`
  background: #fff;
  margin: 0 6px;
  /* background: #3f173f; */
  border-radius: 30px;
  justify-content: center;
  margin-bottom: 10px;
`;

export const FooterItems = styled.View`
  flex-direction: row;
  padding: 6px 0;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;

  border-bottom-color: #000;
  border-bottom-width: 1px;
`;

export const OrderNumber = styled.Text`
  font-weight: bold;
`;

export const FooterNavigation = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Total = styled.Text``;

export const RightContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ItemContentQuantity = styled.View`
  align-items: center;
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
  margin-right: 10px;
`;

export const HomeItem = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 30,
    marginBottom: 10,
    marginHorizontal: 8,
  },
})``;

export const AddIcon = styled.View`
  text-align: center;
  justify-content: flex-end;
`;
export const AddIconLabel = styled.Text`
  text-align: center;
  font-size: 12px;
  color: black;
`;
