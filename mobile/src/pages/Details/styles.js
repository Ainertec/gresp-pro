import styled from 'styled-components/native';
import { ListItem } from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
  background: #3f173f;
`;

export const Title = styled.Text`
  margin-top: 30px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 30px;
  font-weight: bold;
  color: #fff;
`;
export const Header = styled.View`
  /* align-items: center; */
  justify-content: center;
  margin: 0 0 20px 0;
`;
export const HeaderLine = styled.View`
  /* align-items: center; */
  flex-direction: row;
  justify-content: space-around;
  margin: 10px 0 40px 0;
`;
export const HeaderTextLine = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #fff;
`;
export const HeaderText = styled.Text`
  font-size: 16px;
  color: #fff;
  padding-left: 10px;
`;
export const List = styled.FlatList`
  flex: 1;
  background: #3f173f;
`;
export const Item = styled(ListItem).attrs({
  containerStyle: {
    borderRadius: 24,
    paddingRight: 30,
    height: 87,
    elevation: 10,
  },
  titleStyle: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  rightTitleStyle: {
    color: '#000',
    fontWeight: 'bold',
  },
  subtitleStyle: {
    fontSize: 15,
  },
  rigthtSubtitleStyle: {
    fontSize: 15,
  },
})`
  border-radius: 16px;

  margin: 0 10px 10px;
`;
