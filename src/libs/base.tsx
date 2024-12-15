'use client';

import CartReducer, { sumItems } from '@/components/basket';
import { createContext, useContext, useReducer, useState } from 'react';

interface Contextprops {
  passed: any;
  theme: any;
  localThemePr: any;
  localTheme: any;
  setLocalTheme: (newState: boolean) => void;
  setTheme: (newState: boolean) => void;
  showCart: any;
  cartItems: any;
  addToCart: (payload: any) => void;
  increase: (payload: any) => void;
  decrease: (payload: any) => void;
  removeFromCart: (payload: any) => void;
  clearCart: (payload: any) => void;
  checkout: (payload: any) => void;
  sumItems: any;
  itemCount: any;
}

const GlobalContext = createContext<Contextprops>({
  passed: '',
  theme: '',
  localThemePr: '',
  localTheme: '',
  setLocalTheme: () => {},
  setTheme: () => {},
  showCart: false,
  cartItems: [],
  addToCart: () => {},
  increase: () => {},
  decrease: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  checkout: () => {},
  sumItems: '',
  itemCount: '',
});

export function GetContext() {
  return useContext(GlobalContext);
}

export default function Wrapper({ passed, children, local }: any) {
  //Get storage
  const isLocalStorageAvailable = typeof localStorage !== 'undefined';
  const cartStorage = isLocalStorageAvailable
    ? localStorage.getItem('cart') || null
    : null;
  const storage = cartStorage ? JSON.parse(cartStorage) : [];

  //Initial State
  const initialState = {
    cartItems: storage,
    checkout: false,
    ...sumItems(storage),
  };

  //Reducer
  const [state, dispatch] = useReducer(CartReducer, initialState);

  //Add to cart
  const addToCart = (payload: any) => {
    dispatch({ type: 'ADD_TO_CART', payload });
  };

  //Increase
  const increase = (payload: any) => {
    dispatch({ type: 'INCREASE', payload });
  };

  //Decrease
  const decrease = (payload: any) => {
    dispatch({ type: 'DECREASE', payload });
  };

  //Remove from cart
  const removeFromCart = (payload: any) => {
    dispatch({ type: 'REMOVE_ITEM', payload });
  };

  //Clear cart
  const clearCart = (payload: any) => {
    dispatch({ type: 'CLEAR', payload });
  };

  //Checkout
  const checkout = (payload: any) => {
    dispatch({ type: 'CHECKOUT', payload });
  };

  //Theme state
  const [theme, setTheme] = useState(true);

  const localTheme =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(local) !== null
        ? localStorage.getItem(local)
        : 'false'
      : 'false';

  //Context values
  const values = {
    theme,
    setTheme,
    passed,
    localTheme,
    showCart: state.showCart,
    cartItems: state.cartItems,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    clearCart,
    checkout,
    ...state,
  };

  return (
    <GlobalContext.Provider value={values}>
      <html
        className={`${
          localTheme == 'false'
            ? 'bg-whiteGrey text-dark'
            : 'bg-dark text-white'
        }`}
      >
        {children}
      </html>
    </GlobalContext.Provider>
  );
}
