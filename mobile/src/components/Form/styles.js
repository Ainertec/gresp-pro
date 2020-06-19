import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { RectButton } from 'react-native-gesture-handler';

import { Searchbar } from 'react-native-paper';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Label = styled.Text`
  color: #fff;
  margin-top: ${height * 0.05}px;
`;

export const TextInput = styled(Input).attrs((props) => ({
  containerStyle: {
    backgroundColor: '#fff',
  },
  inputStyle: {
    color: '#000',
  },
}))``;

export const Touchable = styled(RectButton)`
  margin-top: ${height * 0.06}px;
  width: 100%;
  flex-direction: row;
  height: ${height * 0.07}px;
  border-radius: 10px;
  border-width: ${(props) => (props.outline ? 1 : 0)}px;
  border-color: #3f173f;
  /* background: ${(props) => (!props.outline ? '#e72847' : '#3f173f')}; */
  background: ${(props) => (!props.outline ? '#3f173f' : '#3f173f')};
  overflow: hidden;
  align-items: center;
  margin-bottom: ${height * 0.024}px;
`;
export const TouchableText = styled.Text`
  color: #fff;
  font-weight: bold;
  flex: 1;
  justify-content: center;
  text-align: center;
`;
export const TouchableIcon = styled.View`
  height: ${height * 0.07}px;
  width: ${height * 0.07}px;
  background-color: rgba(0, 0, 0, 0.1);
  justify-content: center;
  align-items: center;
`;

export const Search = styled(Searchbar)`
  border-radius: ${width * 0.06}px;
  z-index: 2;
  margin: ${height * 0.02}px ${height * 0.01}px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
`;
