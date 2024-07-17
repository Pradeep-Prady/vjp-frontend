import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {},
    orders: [],
    wishList: [],
  },
  reducers: {
    loginUser(state) {
      state.isAuthenticated = true;
    },
    logOutUser(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.orders = [];
      state.wishList = [];
    },
    setUser(state, { payload }) {
      state.user = payload;
    },

    // Orders
    addOrders(state, { payload }) {
      state.orders = payload;
    },
    addOrder(state, { payload }) {
      state.orders = [...state.orders, payload];
    },

    // WishList
    setWishList(state, { payload }) {
      state.wishList = payload;
    },
    addToWishList(state, { payload }) {
      const itemExist = state.wishList.find((item) => item._id === payload._id);
      itemExist ? alert("Item already added") : state.wishList.push(payload);
    },
    removeFromWishList(state, { payload }) {
      state.wishList = state.wishList.filter((item) => item._id !== payload);
    },
    clearWishList(state) {
      state.wishList = [];
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
