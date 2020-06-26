import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Touchable, TouchableText, TouchableIcon } from './styles';

const Button = ({ title, onPress, iconName, customSize, ...rest }) => {
  return (
    <Touchable onPress={onPress} {...rest}>
      <TouchableIcon style={customSize && { height: customSize }}>
        <Icon name={iconName || 'arrow-right'} collor='#fff' size={24} />
      </TouchableIcon>
      <TouchableText>{title || 'Enviar'}</TouchableText>
    </Touchable>
  );
};

export default Button;
