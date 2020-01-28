import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Image, ScrollView, Text, AsyncStorage } from 'react-native';
import { BottomNavigation } from 'react-native-material-ui';
import { Header, Icon, ListItem, Input, Button } from 'react-native-elements';
import api from '../services/api';


export default function ListaItens({ navigation }) {
  const [drink, setDrink] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectedType, setSelectedType] = useState(0);
  const [name, setName] = useState('');
  var producList = null; 
  const [list, setList] = useState([]);
  var drinkableList = null;

  async function search() {
    if (selectedType == 1) {
      const response = await api.get("/products", {
        params: { name },
      });

      setList(response.data);
    } else {
      const response = await api.get("/drinkables", {
        params: { name },
      });
      setList(response.data);
    }
  }

  function addItens(l) {
    if(producList == null)
      producList = navigation.getParam('listaProduc',[]);
    if(drinkableList == null)
      drinkableList = navigation.getParam('listaDrink',[]);
    
    console.log("teste da lista produto: ", producList);

    if (l.quantity == undefined) {
      return alert("Selecione a quantidade")
    }
    if (selectedType == 1) {

      var obj = {
        product: l,
        quantity: l.quantity
      };
      
      for (const element of producList) {
        if (element.product._id == l._id) {
          return alert(`${l.name} já foi selecionado!`);
        }
      }
      producList.push(obj);
      console.log("lista produto adicionada:",producList);
      return alert(`O item ${l.name} foi adicionado!`);
    } else {
      var obj = {
        drinkable: l,
        quantity: l.quantity
      };
      for (const element of drinkableList) {
        if (element.drinkable._id == l._id) {
          return alert(`O item ${l.name} já foi selecionado!`);
        }
      }
      drinkableList.push(obj);
      console.log("lista bebida adicionada:",drinkableList);
       return alert(`O item ${l.name} foi adicionado!`);
    }
    
    

  }
  async function ending() {

    navigation.navigate('Home',{producList,drinkableList});
  }


  useEffect(() => {
    async function load() {
      const responseDrink = await api.get('/drinkables');
      const responseProduct = await api.get('/products');
      setDrink(responseDrink.data);
      setProduct(responseProduct.data);
      setSelectedType(1);

    }
    if (selectedType == 0) {
      load();
    }
    if (selectedType == 2) {
      //console.log("bebidas", drink);
      setList(drink);
    }
    if (selectedType == 1) {
      //console.log("produtos", product);
      setList(product);
    }
  }, [selectedType]);

  

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Text style={{ marginBottom: 10, color: "white", textAlign: "center", fontSize: 22 }}>{selectedType == 1 ? `Produtos` : `Bebidas`}</Text>
        <BottomNavigation hidden={true}>
          <BottomNavigation.Action
            key="Produtos"
            icon="local-dining"
            onPress={() => setSelectedType(1)}
          />
          <BottomNavigation.Action
            key="Bebidas"
            icon="local-bar"
            onPress={() => setSelectedType(2)}
          />
        </BottomNavigation>
      </View>

      <View style={{ marginTop: 10, flexDirection: 'row' }}>
        <Input containerStyle={{ width: 290 }} inputStyle={{ color: "white" }} placeholder='Nome' onChangeText={text => setName(text)} />
        <Button containerStyle={{ width: 50 }} type="solid" buttonStyle={{ backgroundColor: "white" }} icon={<Icon name="youtube-searched-for" size={15} />} onPress={() => search()} />
      </View>

      <View style={{ flex: 1, marginTop: 15 }}>
        <ScrollView style={{ flex: 1, backgroundColor: "#ffe" }}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={<Icon name={selectedType == 1 ? "local-dining" : "local-bar"} />}
                title={l.name}
                subtitle={`R$ ${l.price}`}
                input={{
                  inputContainerStyle: { width: 50 }, defaultValue:(l.quantity == undefined)?`${0}`:`${l.quantity}` , placeholder: '0', label: "Quantidade", onChangeText: text => {
                    l['quantity'] = text;
                  }, keyboardType: "numeric",
                }}
                rightIcon={{ name: 'add', onPress: () => addItens(l) }}
                bottomDivider
              //onPress={() => alert('se apertar em mim adiciona esse produto no pedido com a quantidade solicitada')}
              />
            ))
          }
        </ScrollView>
      </View>
      <View>
        <BottomNavigation hidden={true}>
          <BottomNavigation.Action
            key="voltar"
            icon="arrow-back"
            label="Voltar"
            onPress={() => navigation.navigate('Home')}
          />
          <BottomNavigation.Action
            key="Finalizar"
            icon="done"
            label="Finalizar"
            onPress={() => ending()}
          />
        </BottomNavigation>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F173F',
    justifyContent: 'flex-start'
  },
});
