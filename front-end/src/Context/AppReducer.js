import React from "react";

export default (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      return {
        shoppingList: [action.payload, ...state.shoppingList],
      };
    }
    case "REMOVE_ITEM": {
      return {
        shoppingList: state.shoppingList.filter(
          (item) => item !== action.payload
        ),
      };
    }
    default: {
      return state;
    }
  }
};
