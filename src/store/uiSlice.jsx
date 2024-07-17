import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    modal: {
      wishListSignInModal: false,
      productDetailModal: false,
      showMenuBar: false,
      product: {},
    },
  },
  reducers: {
    wishListSignInModalHandler(state) {
      document.body.style.overflow = state.modal.wishListSignInModal
        ? ""
        : "hidden";
      state.modal.wishListSignInModal = !state.modal.wishListSignInModal;
    },

    productDetailModalHandler(state, { payload = {} }) {
      document.body.style.overflow = state.modal.productDetailModal
        ? ""
        : "hidden";
      state.modal.product = payload;
      state.modal.productDetailModal = !state.modal.productDetailModal;
    },

    menuBarHanlder(state) {
      document.body.style.overflow = state.showMenuBar ? "" : "hidden";
      state.showMenuBar = !state.showMenuBar;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
