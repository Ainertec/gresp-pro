/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, Dimensions, Switch, Animated, Easing } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import api from '../../services/api';
import { useAuth } from '../../contexts/auth';
import { Container } from './styles';

const windownHeader = Dimensions.get('window').height;

const QrReader = ({ cameraSide, formRef, ...rest }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const { user } = useAuth();

  const AnimatableScanner = Animated.createAnimatedComponent(BarCodeScanner);
  const scannerHeigth = new Animated.Value(0);
  const scannerHeigthRef = useRef(scannerHeigth);

  useEffect(() => {
    let mounted = true;
    async function getPermission() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      if (mounted) setHasPermission(status === 'granted');
    }
    getPermission();
    return () => (mounted = false);
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);

    formRef.current.setFieldValue('identification', `${data}`);
    formRef.current.setFieldValue('ipAddress', `${data}`);

    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>É necessaria a premição para acessar a câmera</Text>;
  }
  // if (hasPermission === false) {
  //   return <Text>Não foi possivel acessar a câmera</Text>;
  // }

  const showAnimation = async () => {
    if (!isEnabled) {
      setIsEnabled((previousState) => !previousState);

      Animated.timing(scannerHeigthRef.current, {
        toValue: windownHeader * 0.4,
        duration: 1200,
        delay: 100,
        easing: Easing.in(Easing.elastic(1)),
      }).start();
    } else {
      Animated.timing(scannerHeigthRef.current, {
        toValue: 0,
        duration: 900,
        easing: Easing.in(Easing.elastic(1)),
      }).start(() => {
        setIsEnabled((previousState) => !previousState);
      });
    }
  };
  return (
    <Container>
      <Switch
        trackColor={{ false: '#767577', true: '#ddd' }}
        thumbColor={isEnabled ? '#e72847' : '#f4f3f4'}
        onValueChange={() => {
          showAnimation();
        }}
        value={isEnabled}
      />
      {isEnabled && (
        <AnimatableScanner
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          type={cameraSide ? 'back' : 'front'}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{
            height: scannerHeigthRef.current,
            marginTop: windownHeader * 0.04,
          }}
          {...rest}
        />
      )}
    </Container>
  );
};

export default QrReader;
