import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #3f173f;
  justify-content: flex-start;
`;

export const ObsevationContainer = styled.View`
  align-self: stretch;
  background: #fff;
  margin-top: 5px;
  margin-bottom: 0px;
`;

export const ObservationNote = styled.Text`
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
  margin-left: 5px;
`;

export const ObservationInput = styled.TextInput`
  border-width: 1px;
  border-color: #ddd;
  font-size: 15px;
  border-radius: 21px;
  padding-left: 8px;
  margin-bottom: 10px;
  height: 44px;
`;
export const FooterContainer = styled.View`
  background: #fff;
  justify-content: center;
`;

export const FooterItems = styled.View`
  flex-direction: row;
  padding: 16px 0;
  align-items: center;
  justify-content: space-around;

  border-bottom-color: #fff;
`;

export const OrderNumber = styled.Text`
  font-weight: bold;
`;

export const FooterNavigation = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Total = styled.Text``;
