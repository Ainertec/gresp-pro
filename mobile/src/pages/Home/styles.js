import styled from 'styled-components/native';
import { Input, ListItem, Overlay, CheckBox } from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
  background: #3f173f;
  /* background: #fff; */
  justify-content: flex-start;
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

export const Total = styled.Text`
  font-weight: bold;
  font-size: 17px;
`;

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

export const TextInput = styled(Input).attrs({
  containerStyle: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  inputStyle: {
    color: '#000',
  },
})``;

export const Form = styled.View`
  margin: 10px 10px;
`;

export const Modal = styled(Overlay).attrs({
  overlayStyle: {
    borderRadius: 20,
    paddingBottom: 0,
    height: 450,
    backgroundColor: '#3f173f',
  },
})``;
export const Check = styled(CheckBox).attrs({
  containerStyle: { borderRadius: 20, backgroundColor: '#fff' },
  textStyle: { color: '#000' },
})``;

export const HeaderPayment = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
export const TitlePayment = styled.Text`
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #fff;
`;
export const SubtitlePayment = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
  color: #fff;
`;
export const TotalPayment = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
