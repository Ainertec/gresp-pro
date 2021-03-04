import styled from 'styled-components/native';

import { Overlay, CheckBox } from 'react-native-elements';

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

export const HeaderFee = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;
export const TitleFee = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: bold;
  color: #fff;
`;
export const SubtitleFee = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
  color: #fff;
`;
export const TotalFee = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;
