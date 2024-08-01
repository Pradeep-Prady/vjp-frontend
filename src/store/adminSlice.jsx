import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isAuthenticated: false,
    admin: {},
    categorys: [],
    products: [],
    orders: [],
    users: [],
    order: {},
    dashboard: {},
  },
  reducers: {
    loginAdmin(state) {
      // console.log("Login: " + state.isAuthenticated);
      state.isAuthenticated = true;
    },
    logOutAdmin(state) {
      // console.log("Logout: " + state.isAuthenticated);
      state.isAuthenticated = false;
    },

    // categories
    addCategories(state, action) {
      state.categorys = action.payload;
    },
    addCategory(state, action) {
      state.categorys = [...state.categorys, action.payload];
    },

    // Products
    addProducts(state, action) {
      state.products = action.payload;
    },

    // Users
    addUsers(state, action) {
      state.users = action.payload;
    },
    addUser(state, action) {
      state.users = [...state.users, action.payload];
    },

    // Orders
    addOrders(state, action) {
      state.orders = action.payload;
    },
    addOrder(state, action) {
      state.order = action.payload;
    },

    setDashboard(state, action) {
      state.dashboard = action.payload;
    },
  },
});

export const adminActions = adminSlice.actions;

export default adminSlice.reducer;

// deleteSubCategory(state, { payload }) {
//   const categoryIndex = state.categorys.findIndex(
//     (item) => item._id === payload.ctgryId
//   );
//   console.log("Category Index:", categoryIndex);
//   console.log("SubCatgory ID ", payload.sbCtgryId);
//   console.log(
//     "Before Deletion:",
//     JSON.stringify(state.categorys[categoryIndex].subCategorys)
//   );
//   const filteredSubCategory = state.categorys[categoryIndex].subCategorys;
//   state.categorys[categoryIndex].subCategorys = filteredSubCategory.filter(
//     (item) => item._id !== payload.sbCtgryId
//   );

//   console.log(
//     "After Deletion:",
//     JSON.stringify(state.categorys[categoryIndex].subCategorys)
//   );
// },
