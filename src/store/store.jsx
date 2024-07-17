import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    admin: adminReducer,
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export default store;
