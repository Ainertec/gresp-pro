import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
  background-color: #3f173f;
`;
export const ListItemStyled = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 30,
    paddingRight: 30,
    height: 87,
  },
})`
  border-radius: 30px;

  margin: 0 10px 10px;
`;

export const Title = styled.Text`
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #fff;
`;
export const RigthContentListItem = styled.View`
  align-items: center;
  justify-content: center;
`;
export const RigthContentLabel = styled.Text`
  align-items: center;
  justify-content: center;
`;
