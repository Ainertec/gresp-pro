import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
  background-color: #3f173f;
`;
export const ListItemStyled = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    height: 90,
  },
})``;
