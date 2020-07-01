import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #3f173f;
`;
export const Content = styled.TouchableOpacity`
  flex-direction: row;
  background: #fff;
  height: 56px;
  align-items: center;
  padding: 10px;
  border-radius: 16px;
  margin: 15px 10px;
`;
export const IconArea = styled.View`
  padding: 0 12px;
`;
export const ContentText = styled.Text`
  color: #000;
  font-size: 18px;
`;
export const Title = styled.Text`
  padding-top: 10px;
  color: #fff;
  align-self: center;
  font-weight: bold;
  font-size: 24px;
`;
export const Footer = styled.View`
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 10px;
`;
export const FooterText = styled.Text`
  font-size: 16px;
  color: gray;
`;
export const FooterVersion = styled.Text`
  font-size: 14px;
  color: gray;
`;
