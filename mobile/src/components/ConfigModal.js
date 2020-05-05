import React from 'react';
import { View, Text } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements';

export default function ConfigModal({
  showConfigs,
  setIp,
  config,
  setShowConfigs
}) {

  return (
    <Overlay
      isVisible={showConfigs}
      overlayStyle={{ height: 400, justifyContent: "center" }}>
      <View>
        <Text
          style={{
            marginTop: 5,
            textAlign: "center",
            fontSize: 20,
            marginBottom: 30
          }}>
          Configurar IP de Rota
        </Text>
        <Text style={{
          textAlign: "center",
          color: "red",
          fontSize: 16,
          marginBottom: 30
        }}>
          Atenção, esta configuração interfere no servidor !
        </Text>
        <Input
          placeholder='Exemplo 192.168.0.1'
          onChangeText={(text) => setIp(text)} />
        <Button
          buttonStyle={{ marginTop: 40 }}
          type="solid"
          title="Salvar"
          onPress={() => config()} />
        <Button
          buttonStyle={{ marginTop: 5, backgroundColor: "red" }}
          type="solid"
          title="Cancelar"
          onPress={() => setShowConfigs(false)} />
      </View>
    </Overlay>
  );
}
