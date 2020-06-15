import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
// import { Searchbar } from 'react-native-paper';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

export const Label = styled.Text`
  color: #fff;
  margin-top: ${height * 0.05}px;
`;

export const TextInput = styled(Input).attrs((props) => ({
  containerStyle: {
    backgroundColor: '#3f173f',
  },
  inputStyle: '#fff',
}))``;

export const Touchable = styled.TouchableOpacity`
  margin-top: ${height * 0.01}px;
  width: 100%;
  height: ${height * 0.05}px;
  border-radius: 20px;
  border-width: 1px;
  border-width: ${(props) => (props.outline ? 1 : 0)}px;
  border-color: darkblue;
  background: ${(props) => (!props.outline ? 'black' : '#3f173f')};
  align-items: center;
  justify-content: center;
  margin-bottom: ${height * 0.024}px;
`;
export const TouchableText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

// export const Search = styled(Searchbar)`
//   border-radius: ${width * 0.06}px;
//   z-index: 2;
//   margin: ${height * 0.02}px ${height * 0.01}px;
//   position: absolute;
//   left: 0;
//   top: 0;
//   right: 0;
// `;
