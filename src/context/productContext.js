import { createContext, useEffect, useReducer } from "react";
import { useContext } from "react";
import reducer from "../reducer/productReducer";
import axios from "axios";

const Appcontext = createContext();

const API = "https://product-fhqo.onrender.com/products";

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      const remainingProducts = state.products.filter(
        (products) => products.id !== id
      );
      dispatch({ type: "DELETE_PRODUCT", payload: remainingProducts });
      getProducts(API);
    } catch (error) {
      // handle error
    }
  };

  const getProducts = async (URL) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(URL);
      console.log("🚀 ~ file: productContext.js:36 ~ getProducts ~ res", res);

      const products = await res.data.products;
      console.log(
        "🚀 ~ file: productContext.js:39 ~ getProducts ~ products",
        products
      );
      //   console.log(
      //     "🚀 ~ file: productContext.js:25 ~ getProducts ~ products",
      //     products
      //   );
      dispatch({ type: "MY_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_error" });
    }
  };

  useEffect(() => {
    getProducts(API);
  }, []);

  return (
    <Appcontext.Provider value={{ ...state, deleteProduct }}>
      {children}
    </Appcontext.Provider>
  );
};

const useProductContext = () => {
  return useContext(Appcontext);
};

export { AppProvider, Appcontext, useProductContext };
