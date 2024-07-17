import React, { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router-dom";
import Header from "../../components/Header & Footer/Header/Header";
import Footer from "../../components/Header & Footer/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/productSlice";
import Modal from "../../components/General/UI/Modal";
import MenuBar from "../../components/Header & Footer/Header/MenuBar";
import { createPortal } from "react-dom";
import { userActions } from "../../store/userSlice";
import { axiosInstance } from "../../services/axios";
import { useQuery } from "react-query";
import { useQueryEvents } from "../../hooks/useQueryWithCallbacks";

const RootLayout = () => {
  const dispatch = useDispatch();
  const allProducts = useRouteLoaderData("products");

  const isOpen = useSelector((state) => state.ui.showMenuBar);

  // Get Products Data
  useQueryEvents(
    useQuery(["getCategorys"], () => axiosInstance.get("/categories")),
    {
      onSuccess: (res) => {
        dispatch(productActions.addProducts(res.data.data));
      },
      onError: (err) => console.log("An error happened:", err.message),
    }
  );

  // Check If User is Logged In Or Not
  useEffect(() => {
    const checkIfUserIsLoggedInOrNot = async () => {
      try {
        const res = await axiosInstance.get("/user/profile/me");
        console.log(res.data);
        if (res.data.data) {
          dispatch(userActions.loginUser());
          dispatch(userActions.setUser(res.data.data));
          dispatch(userActions.setWishList(res.data.data.wishList));
        }
      } catch (error) {
        console.log("An error happened:", error);
      }
    };
    checkIfUserIsLoggedInOrNot();
  }, []);

  useEffect(() => {
    // allProducts && dispatch(productActions.addProducts(allProducts));
  }, [allProducts]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <ScrollRestoration />
      {isOpen &&
        createPortal(
          <MenuBar isOpen={isOpen} />,
          document.getElementById("modal")
        )}
      <Header />
      <div className="centerContainer flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
