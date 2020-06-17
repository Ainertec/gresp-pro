import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Touchable, TouchableText, TouchableIcon } from './styles';

const Button = ({ title, outline, ...rest }) => {
  return (
    <Touchable outline={outline} {...rest}>
      <TouchableIcon>
        <Icon name='arrow-right' collor='#fff' size={24} />
      </TouchableIcon>
      <TouchableText>{title || 'Enviar'}</TouchableText>
    </Touchable>
  );
};

export default Button;
