import React from "react";
import { SlCheck } from "react-icons/sl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="flex flex-col gap-4 items-center justify-center border py-10 text-ternary text-center">
      <SlCheck className="text-8xl text-green-400" />
      <h4 className="text-2xl font-mono">{`Hey  ${user.fName} ${user.lName},`}</h4>
      <h1 className="text-3xl font-semibold">Your Order is Confirmed!</h1>
      <p className="text-center font-medium">
        We reciever your purchase request <br />
        We'll be in touch shortly!
      </p>
      <Link
        className="bg-primary/85 text-white py-2 px-6 font-mono hover:bg-primary
      transition-all ease-linear"
        to="/customer/orders"
      >
        CHECK STATUS
      </Link>
    </div>
  );
};

export default OrderSuccess;
