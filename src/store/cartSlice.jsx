import { createSlice } from "@reduxjs/toolkit";
import { connect, useDispatch } from "react-redux";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    noOfProducts: 0,
    totalPrice: 0,
  },
  reducers: {
    // ADD PRODUCT TO THE CART
    addProduct(state, { payload }) {
      // console.log(payload);
      state.totalPrice =
        state.totalPrice + +payload.actualPrice * +payload.productQuantity;
      state.noOfProducts = state.noOfProducts + +payload.productQuantity;

      if (state.cart.length === 0) {
        state.cart = [payload];
      } else {
        const productIndex = state.cart.findIndex(
          (product) => product._id === payload._id
        );
        if (productIndex === -1) {
          state.cart = [...state.cart, payload];
        } else {
          state.cart[productIndex].productQuantity += payload.productQuantity;
        }
      }
    },
    // REMOVE PRODUCT FROM THE CART BY ID
    removeProduct(state, { payload }) {
      const productIndex = state.cart.findIndex(
        (product) => product._id === payload
      );

      state.totalPrice -=
        +state.cart[productIndex].productQuantity *
        +state.cart[productIndex].actualPrice;
      state.noOfProducts -= +state.cart[productIndex].productQuantity;

      state.cart.splice(productIndex, 1);
    },
    // INCREASE PRODUCT QUANTITY BY 1 USING ID
    increaseProductQuantity(state, { payload }) {
      const productIndex = state.cart.findIndex(
        (product) => product._id === payload
      );

      state.totalPrice += +state.cart[productIndex].actualPrice;
      state.noOfProducts += 1;

      state.cart[productIndex].productQuantity += 1;
    },
    // DECREASE PRODUCT QUANTITY BY 1 USING ID
    decreaseProductQuantity(state, { payload }) {
      const productIndex = state.cart.findIndex(
        (product) => product._id === payload
      );

      state.totalPrice -= +state.cart[productIndex].actualPrice;
      state.noOfProducts -= 1;

      state.cart[productIndex].productQuantity -= 1;
      if (state.cart[productIndex].productQuantity === 0) {
        state.cart.splice(productIndex, 1);
      }
    },
    // ADD PRODUCT BY QUANTITY : NEVER USED ANYWHERE IN THE CODE
    addProductByQuantity(state, { payload }) {
      const productIndex = state.cart.findIndex(
        (product) => product._id === payload._id
      );
      if (payload.productQuantity === 0) {
        return;
        // state.cart.splice(productIndex, 1);
      } else if (
        state.cart[productIndex].productQuantity < payload.productQuantity
      ) {
        // Increase
        state.totalPrice -=
          state.cart[productIndex].productQuantity *
          state.cart[productIndex].actualPrice;
        state.totalPrice +=
          payload.productQuantity * state.cart[productIndex].actualPrice;
        state.noOfProducts +=
          payload.productQuantity - state.cart[productIndex].productQuantity;
      } else {
        // Decrease
        state.totalPrice -=
          state.cart[productIndex].productQuantity *
          state.cart[productIndex].actualPrice;
        state.totalPrice +=
          payload.productQuantity * state.cart[productIndex].actualPrice;
        state.noOfProducts -=
          state.cart[productIndex].productQuantity - payload.productQuantity;
      }

      state.cart[productIndex].productQuantity = payload.productQuantity;
    },

    setProductQuantity(state, { payload }) {
      const productIndex = state.cart.findIndex(
        (product) => product._id === payload._id
      );
      state.cart[productIndex].productQuantity = payload.productQuantity;
    },

    clearCart(state) {
      state.cart = [];
      state.noOfProducts = 0;
      state.totalPrice = 0;
    },

    addAllProducts(state, { payload }) {
      payload.forEach((product) => {
        state.totalPrice += +product.actualPrice * +product.productQuantity;
        state.noOfProducts += +product.productQuantity;

        const productIndex = state.cart.findIndex(
          (item) => item._id === product._id
        );
        if (productIndex === -1) {
          state.cart = [...state.cart, product];
        } else {
          state.cart[productIndex].productQuantity += product.productQuantity;
        }
      });
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
