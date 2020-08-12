import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import { load } from '../services/loadOrder';

const OrderContext = createContext({});

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState({});
  const [shouldRefresh, setShouldRefresh] = useState(0);

  async function loadOrder(identification) {
    const response = await load(identification);
    if (response.data) setOrder(response.data);
    else {
      const newOrder = { identification: identification, items: [], note: '' };
      setOrder(newOrder);
    }
  }

  function addItem(item) {
    const items = order.items;
    const newProduct = { product: item, quantity: item.quantity };
    items.push(newProduct);

    const newOrder = {
      _id: order._id,
      note: order.note,
      identification: order.identification,
      items: items,
    };

    setOrder(newOrder);
  }

  function removeItem(data) {
    const filterdItem = order.items.filter(
      (item) => item.product._id !== data._id
    );
    const newOrder = {
      ...order,
      items: filterdItem,
    };
    setOrder(newOrder);
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        addItem,
        removeItem,
        setOrder,
        loadOrder,
        shouldRefresh,
        setShouldRefresh,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder() {
  const context = useContext(OrderContext);
  return context;
}
