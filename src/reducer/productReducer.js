import React from "react";

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "MY_API_DATA":
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
      };

    case "API_error":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "DELETE_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
