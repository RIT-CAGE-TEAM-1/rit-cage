import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  shoppingList: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addItemsToList(items) {
    dispatch({
      type: "ADD_ITEM",
      payload: items,
    });
    console.log("STATE VALUES: " + JSON.stringify(state));
  }

  function removeItemsFromList(items) {
    dispatch({
      type: "REMOVE_ITEMS",
      payload: items,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        shoppingList: state.shoppingList,
        addItemsToList,
        removeItemsFromList,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
