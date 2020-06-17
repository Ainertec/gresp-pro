import React, { createContext, useState, useEffect, useContext } from 'react';
// import { AsyncStorage } from 'react-native';

import { load } from '../services/loadOrder';
// import api from '../services/api';

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({});

  async function loadOrder(identification) {
    const response = await load(identification);
    if (response.data) setOrder(response.data);
    else {
      const newOrder = { identification: identification };
      setOrder(newOrder);
    }
  }

  function addItem(item) {
    const items = order.items;
    const newProduct = { product: item, quantity: item.quantity };
    items.push(newProduct);

    setOrder({ ...order, items: items });
  }

  return (
    <OrderContext.Provider value={{ order, addItem, setOrder, loadOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder() {
  const context = useContext(OrderContext);
  return context;
}
