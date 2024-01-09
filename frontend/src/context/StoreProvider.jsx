import React, { useReducer } from 'react';
import storeReducer from './storeReducer';
import storeContext from './storeContext';
import { decode_Token } from '../utils/index';


const StoreProvider = ({ children }) => {
  const [store, dispatch] = useReducer(storeReducer, {
    userInfo: decode_Token(localStorage.getItem('crud_token')) || "",
    token:localStorage.getItem('crud_token') || "",
  });

  return (
    <storeContext.Provider value={{ store, dispatch }}>
      {children}
    </storeContext.Provider>
  );
};

export default StoreProvider;
