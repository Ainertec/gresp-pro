import React from 'react';
import { View } from 'react-native';

import { ActionButton as ActionButtonComponent } from './styles';

const ActionButton = ({ children, onPress, background }) => {
  return (
    <ActionButtonComponent background={background} onPress={onPress}>
      {children}
    </ActionButtonComponent>
  );
};

export default ActionButton;
