import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    runUseEffect: true,
    // Categories Data
    products: [],
    allProducts: [],
    subCategory: null,
  },
  reducers: {
    toggleUseEffect(state) {
      state.runUseEffect = false;
    },
    // Categories Data
    addProducts(state, action) {
      state.products = action.payload;
    },
    addAllProducts(state, action) {
      state.allProducts = action.payload;
    },
    setSubCategory(state, action) {
      state.subCategory = action.payload;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
