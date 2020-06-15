import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #3f173f;
  padding: 0 ${width * 0.02}px;
`;
export const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding-top:150px;
  padding-bottom:70px;
  /* flex: 1;
  margin-top: ${height * 0.16}px;
  margin-bottom: ${height * 0.16}px; */
`;
export const Logo = styled.Image.attrs({
  resizeMode: 'cover',
})`
  align-self: center;
  height: ${height * 0.2}px;
  width: ${height * 0.499}px;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  padding-left: ${width * 0.01}px;
  color: #fff;
`;
