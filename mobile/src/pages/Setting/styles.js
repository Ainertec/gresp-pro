import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;
export const Content = styled.TouchableOpacity`
  flex-direction: row;
  background: #3f173f;

  align-items: center;
  padding: 10px;
  border-radius: 19px;
  margin: 15px 8px;
`;
export const IconArea = styled.View`
  padding: 0 12px;
`;
export const ContentText = styled.Text`
  color: #fff;
  font-size: 18px;
`;
export const Title = styled.Text`
  padding-top: 10px;
  color: black;
  align-self: center;
  font-weight: bold;
  font-size: 24px;
`;
