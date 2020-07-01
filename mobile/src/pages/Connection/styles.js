import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Form } from '@unform/mobile';

const { height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background: #3f173f;
`;
export const Scroll = styled.ScrollView`
  flex: 1;
  /* margin-bottom: ${height * 0.09}px; */
`;
export const FormCode = styled(Form)`
  margin: 10px 10px;
`;
