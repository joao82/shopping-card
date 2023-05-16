import { createContext, useContext, useReducer } from "react";
import products from "../assets/data";
import { cartReducer, productReducer } from "./Reducers";

const Cart = createContext();

export default function Context({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
}

export const CartState = () => {
  return useContext(Cart);
};
