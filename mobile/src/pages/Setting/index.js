import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../contexts/auth';

import { Container, Content, IconArea, ContentText, Title } from './styles';

const Setting = () => {
  const { signOut } = useAuth();
  return (
    <Container>
      <Title>Configurações</Title>

      <Content onPress={() => signOut()} style={{ elevation: 90 }}>
        <IconArea>
          <Icon name='log-out' size={25} color='#Fff' />
        </IconArea>
        <ContentText>Sair</ContentText>
      </Content>

      <Content onPress={() => {}} style={{ elevation: 90 }}>
        <IconArea>
          <Icon name='wifi' size={25} color='#Fff' />
        </IconArea>
        <ContentText>Rede</ContentText>
      </Content>
    </Container>
  );
};

export default Setting;
