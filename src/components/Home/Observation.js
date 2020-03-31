import React from 'react';
import { View,Text, TextInput, StyleSheet } from 'react-native';



export default function Observation({
  orders,
  setNote
}) {
  return (
    <View style={styles.form}>
    <Text style={styles.note}>Observação:</Text>
    <TextInput style={styles.input}
      placeholder="Digite uma observação"
      defaultValue={orders.note}
      onChangeText={(text) => setNote(text)}
      multiline={true} numberOfLines={3} editable={true}></TextInput>
  </View>
  );
}

const styles = StyleSheet.create({
  note: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginLeft: 5,

  },
  form: {
    alignSelf: 'stretch',
    backgroundColor: "#fff",
    marginTop: 5,
    marginBottom: 0,

  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 12,
    borderRadius: 2,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    height: 44
  }
});

