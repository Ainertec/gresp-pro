import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../contexts/auth';

import {
  Container,
  Content,
  IconArea,
  ContentText,
  Title,
  Footer,
  FooterText,
  FooterVersion,
} from './styles';
import { useNavigation } from '@react-navigation/native';

const Setting = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation();
  return (
    <Container>
      <Title>Configurações</Title>

      <Content onPress={() => signOut()} style={{ elevation: 10 }}>
        <IconArea>
          <Icon name='log-out' size={25} color='#000' />
        </IconArea>
        <ContentText>Sair</ContentText>
      </Content>

      <Content
        onPress={() => {
          navigation.navigate('Connection');
        }}
        style={{ elevation: 10 }}
      >
        <IconArea>
          <Icon name='wifi' size={25} color='#000' />
        </IconArea>
        <ContentText>Rede</ContentText>
      </Content>

      <Footer>
        <FooterText>Desenvolvido por Ainertec</FooterText>
        <FooterVersion>Versão 2.4.5</FooterVersion>
      </Footer>
    </Container>
  );
};

export default Setting;
