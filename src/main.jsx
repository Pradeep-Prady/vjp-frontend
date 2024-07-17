import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.jsx";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import FramerMotion from "./framer-motion/FramerMotion.jsx";
import RootLayout from "./pages/layouts/RootLayout.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import ProductDetailsPage from "./pages/product/ProductDetailsPage.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import SignIn from "./pages/SignUp&SignIn/SignIn/SignIn.jsx";
import SignUp from "./pages/SignUp&SignIn/SignUp/SignUp.jsx";
import ProductLayout from "./pages/layouts/ProductLayout.jsx";
import CategoryPage from "./pages/product/CategoryPage.jsx";
import { loader as getProductsLoader } from "./config/Firebase.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import NewArrivalPage from "./pages/NewArrivalPage.jsx";
import TodayDealsPage from "./pages/TodayDealsPage.jsx";
import Account from "./pages/Customer/Account.jsx";
import UserLayout from "./pages/layouts/UserLayout.jsx";
import Orders from "./pages/Customer/Orders.jsx";
import WishList from "./pages/Customer/WishList.jsx";
import AddressBook from "./pages/Customer/AddressBook.jsx";
import AccountInfo from "./pages/Customer/AccountInfo.jsx";
import AdminLayout from "./pages/layouts/AdminLayout.jsx";
import Dashboard from "./pages/Admin/pages/Dashboard/Dashboard.jsx";
import Products from "./pages/Admin/pages/Products/Products.jsx";
import AddProduct from "./pages/Admin/pages/AddProduct/AddProduct.jsx";
import Categories from "./pages/Admin/pages/Categories/Categories.jsx";
import AdminOrders from "./pages/Admin/pages/Orders/Orders.jsx";
import Users from "./pages/Admin/pages/Users/Users.jsx";
import EditProduct from "./pages/Admin/components/EditProduct.jsx";
import EditCategory from "./pages/Admin/components/EditCategory.jsx";
import OrderDetails from "./pages/Admin/pages/Orders/components/OrderDetails.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import SubCategory from "./pages/Admin/pages/SubCategory/SubCategory.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import ForgetPassword from "./pages/Password/ForgetPassword.jsx";
import ResetPassword from "./pages/Password/ResetPassword.jsx";

const routes = createBrowserRouter([
  // User
  {
    path: "/",
    id: "products",
    loader: getProductsLoader,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "products",
        children: [
          {
            path: ":category",
            children: [
              {
                element: <ProductLayout />,
                children: [
                  {
                    index: true,
                    element: <CategoryPage />,
                  },
                ],
              },
              {
                path: ":productId",
                element: <ProductDetailsPage />,
              },
            ],
          },
        ],
      },
      {
        path: "account",
        children: [
          {
            // 	Access an existing account
            path: "sign-in",
            element: <SignIn />,
          },
          {
            // Create a new account
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },
      // User
      {
        path: "customer",
        element: <UserLayout />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "wish-list",
            element: <WishList />,
          },
          {
            path: "address-book",
            element: <AddressBook />,
          },
          {
            path: "account-information",
            element: <AccountInfo />,
          },
        ],
      },
      {
        path: "new-arrivals",
        element: <NewArrivalPage />,
      },
      {
        path: "today-deals",
        element: <TodayDealsPage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "password",
        children: [
          {
            path: "reset",
            children: [
              {
                index: true,
                element: <ForgetPassword />,
              },
              {
                path: ":token",
                element: <ResetPassword />,
              },
            ],
          },
        ],
      },
    ],
  },
  // Admin
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Products />,
          },
          {
            path: ":productId",
            element: <EditProduct />,
          },
        ],
      },
      {
        path: "addproduct",
        element: <AddProduct />,
      },
      {
        path: "category",
        children: [
          {
            index: true,
            element: <Categories />,
          },
          {
            path: "edit/:categoryId",
            element: <EditCategory />,
          },
        ],
      },
      {
        path: "sub-category",
        element: <SubCategory />,
      },
      {
        path: "orders",
        children: [
          {
            index: true,
            element: <AdminOrders />,
          },
          {
            path: ":orderId",
            element: <OrderDetails />,
          },
        ],
      },
      {
        path: "users",
        element: <Users />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <FramerMotion>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        autoClose={3000}
        newestOnTop={true}
        className="font-poppins"
      />
      <ReactQueryDevtools initialIsOpen={false} />
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </QueryClientProvider>
  </FramerMotion>
  // </React.StrictMode>
);
