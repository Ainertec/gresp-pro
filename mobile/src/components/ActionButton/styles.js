import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;

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
  background: ${(props) => (!props.background ? ' #e72847' : '#3f173f')};
  border-radius: ${deviceWidth * 0.2}px;
`;
