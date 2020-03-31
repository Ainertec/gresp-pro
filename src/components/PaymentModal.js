import React from 'react';
import { View, Text } from 'react-native';
import { Overlay, CheckBox, Badge, Button } from 'react-native-elements';



export default function PaymentModal({ 
  showPay,
  orders,
  selected,
  payment,
  setShowPay,
  checked,
  checked2
}) {
    
  return (
    <Overlay isVisible={showPay}>
      <View>
        <Text
          style={{
            marginTop: 40,
            textAlign: "center",
            fontSize: 20,
            marginBottom: 50
          }}>Pagamento</Text>
        <Badge
          status="success"
          value=
          {<Text
            style={{ color: "white", fontSize: 16 }}>
            Total: R${(orders.total == undefined) ? "0" : orders.total.toFixed(2)}
          </Text>} />
        <CheckBox
          title="Dinheiro"
          value="Dinheiro"
          checked={checked}
          onPress={() => selected(1)}>

        </CheckBox>
        <CheckBox
          title="Cartão"
          checked={checked2}
          onPress={() => selected(2)}>

        </CheckBox>
        <Button
          buttonStyle={{ marginTop: 70, backgroundColor: "green" }}
          type="solid"
          icon={{ name: "send", size: 15, color: "white" }}
          title="Efetuar"
          onPress={() => payment()} />
        <Button
          buttonStyle={{ marginTop: 5, backgroundColor: "red" }}
          type="solid"
          icon={{ name: "close", size: 15, color: "white" }}
          title="Cancelar"
          onPress={() => setShowPay(false)} />
      </View>
    </Overlay>
  );
}
