import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    runUseEffect: true,
    // Categories Data
    categories: [],

    

    topCategories:[],
    products: [],
    allProducts: [],
    subCategory: null,
  },
  reducers: {
    toggleUseEffect(state) {
      state.runUseEffect = false;
    },
    // Categories Data

    addCategories(state, action) {
      state.categories = action.payload;
    },
    addProducts(state, action) {
      state.products = action.payload;
    },
    addTopCategories(state, action) {
      state.topCategories = action.payload;
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
