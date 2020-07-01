import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  padding: 0 ${width * 0.03}px;
`;
export const Header = styled.View`
  /* height: 40px; */
  /* background: #000; */
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: ${getStatusBarHeight() + 10}px;
`;
export const Content = styled.View`
  justify-content: center;
  align-items: center;
  padding-top:100px;
  padding-bottom:30px;
  /* flex: 1;
  margin-top: ${height * 0.16}px;
  margin-bottom: ${height * 0.16}px; */
`;
export const Logo = styled.Image.attrs({
  resizeMode: 'cover',
})`
  align-self: center;
  height: ${height * 0.15}px;
  width: ${height * 0.38}px;
`;
export const Title = styled.Text`
  font-weight: bold;
  font-size: 26px;
  line-height: 30px;
  padding-left: ${width * 0.01}px;
  color: #fff;
`;
