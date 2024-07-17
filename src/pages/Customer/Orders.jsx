import React, { useEffect } from "react";
import Disclaimer from "../../components/General/UI/Disclaimer";
import { axiosInstance } from "../../services/axios";
import { useQuery } from "react-query";
import { useQueryEvents } from "../../hooks/useQueryWithCallbacks";
import { userActions } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./components/OrderItem";

const Orders = () => {
  const dispatch = useDispatch();

  const userOrders = useSelector((state) => state.user.orders);

  // Get User Orders Data
  useQueryEvents(
    useQuery(["getUserOrders"], () => axiosInstance.get("/orders/my")),
    {
      onSuccess: (res) => {
        console.log(res.data);
        dispatch(userActions.addOrders(res.data.data));
      },
      onError: (err) => console.log("An error happened:", err.message),
    }
  );

  console.log(userOrders);
  return (
    <>
      {userOrders && userOrders.length > 0 ? (
        <ul className="space-y-2 py-4">
          {userOrders &&
            userOrders.map((order) => (
              <OrderItem key={order._id} {...{ order }} />
            ))}
        </ul>
      ) : (
        <Disclaimer text="You have placed no orders." />
      )}
    </>
  );
};

export default Orders;
