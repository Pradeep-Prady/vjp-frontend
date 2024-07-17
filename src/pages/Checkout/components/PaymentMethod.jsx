import React, { useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import { FaAmazonPay, FaStore, FaTruck } from "react-icons/fa6";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PaymentMethod = ({ orderHandler, deliveryType, setDeliveryType }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discount, setdiscount] = useState({
    show: false,
    code: "",
  });

  const user = useSelector((state) => state.user.user);

  return (
    <div className="w-full lg:w-[63%] rounded-md p-3 md:p-8 bg-[#F5F5F5] h-fit space-y-5">
      <div className="break-words space-y-1">
        <h1 className="inputTitle">Deliver To:</h1>
        <p>{`${user?.fName} ${user?.lName}`}</p>
        <p className="">{user?.email}</p>
        <p>{`${user?.strtAddrss}, ${user?.city}`}</p>
        <p>{`${user?.state}, ${user?.cntry}`}</p>
        <p>{user?.zipCode}</p>
        <p>+91 {user?.phNum}</p>
        <Link to="/customer/address-book" className="text-primary text-sm">
          Edit
        </Link>
      </div>
      <DeliveryType {...{ deliveryType, setDeliveryType }} />
      <div>
        <h3 className="inputTitle">Payment Method</h3>
        <div className=" bg-white ">
          {/* UPI */}
          <div
            className="border px-5 py-3 rounded-t-md border-b-0 cursor-pointer
        flex justify-between items-center"
            onClick={() => setPaymentMethod("upi")}
          >
            <div className="">
              <input
                type="radio"
                id="upi"
                name="upi"
                className="scale-125 mr-3"
                checked={paymentMethod === "upi"}
              />
              <label htmlFor="upi" className="text-black cursor-pointer">
                UPI
              </label>
            </div>
            <FaAmazonPay className="scale-[1.4]" />
          </div>
          {/* COD */}
          <div
            className="border px-5 py-3 rounded-b-md cursor-pointer
        flex justify-between items-center"
            onClick={() => setPaymentMethod("cod")}
          >
            <div>
              <input
                type="radio"
                id="cod"
                name="cod"
                className="scale-125 mr-3"
                checked={paymentMethod === "cod"}
              />
              <label htmlFor="cod" className="text-black cursor-pointer">
                Cash On Delivery
              </label>
            </div>
            <BsCashCoin className="scale-[1.4]" />
          </div>
        </div>
      </div>

      {/* DISCOUNT */}
      <div>
        <h6
          className="py-5 flex items-center gap-2 cursor-pointer w-fit"
          onClick={() =>
            setdiscount((prevState) => ({
              ...prevState,
              show: !prevState.show,
            }))
          }
        >
          <span className="text-sm text-primary">Apply Discount Code </span>
          {discount.show ? <IoChevronUpOutline /> : <IoChevronDownOutline />}
        </h6>
        {discount.show && (
          <div className="pb-5 flex flex-wrap md:flex-nowrap gap-2 md:gap-0 justify-between">
            <input
              type="text"
              name=""
              id=""
              value={discount.code}
              onChange={(e) =>
                setdiscount((prevState) => ({
                  ...prevState,
                  code: e.target.value,
                }))
              }
              className="outline-none border p-3 text-sm w-full md:w-[73%]"
              placeholder="Enter Discount Code"
            />
            <button className="bg-ternary text-white px-4 py-[10px] w-full md:w-1/4 text-[15px] rounded">
              APPLY DISCOUNT
            </button>
          </div>
        )}
      </div>

      {/* BUTTONS: Home & Order */}
      <div className="flex flex-wrap gap-3 md:gap-0 items-center justify-between">
        <Link
          className="bg-ternary text-white font-medium w-full md:w-1/4 py-2 rounded-full text-center"
          to="/"
        >
          HOME
        </Link>
        <button
          className="bg-primary text-white font-medium w-full md:w-1/4 py-[10px] rounded-full ml-auto"
          onClick={() => orderHandler(paymentMethod)}
        >
          ORDER
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;

const DeliveryType = ({ deliveryType, setDeliveryType }) => {
  return (
    <div>
      <h3 className="inputTitle">Delivery Type</h3>
      <div className=" bg-white ">
        {/* VJP */}
        <div
          className="border px-5 py-3 rounded-t-md border-b-0 cursor-pointer
        flex justify-between items-center"
          onClick={() =>
            setDeliveryType((prevState) => ({ ...prevState, type: "VJP" }))
          }
        >
          <div className="">
            <input
              type="radio"
              name="deliveryType"
              value="VJP"
              id="VJP"
              className="mr-2 cursor-pointer"
              checked={deliveryType.type === "VJP"}
            />
            <label htmlFor="VJP" className="cursor-pointer">
              VJP
            </label>
          </div>
          <FaTruck className="scale-[1.4]" />
        </div>
        {/* Self */}
        <div
          className="border px-5 py-3 rounded-b-md cursor-pointer
        flex justify-between items-center"
          onClick={() =>
            setDeliveryType((prevState) => ({ ...prevState, type: "Self" }))
          }
        >
          <div>
            <input
              type="radio"
              name="deliveryType"
              value="Self"
              id="Self"
              className="mr-2 cursor-pointer"
              checked={deliveryType.type === "Self"}
            />
            <label htmlFor="Self" className="cursor-pointer">
              Self
            </label>
          </div>
          <FaStore className="scale-[1.4]" />
        </div>
      </div>
      {deliveryType.type === "Self" && (
        <textarea
          name="additional notes"
          id="additional notes"
          value={deliveryType.additionalNotes}
          onChange={(e) =>
            setDeliveryType((prevState) => ({
              ...prevState,
              additionalNotes: e.target.value,
            }))
          }
          className="w-full h-24 outline-none border p-2 rounded mt-3"
          placeholder="Additional Notes (Optional)"
        />
      )}
    </div>
  );
};

{
  /* <div className="">
  <div className="space-x-5 border-b py-5">
    <input
      type="radio"
      id="upi"
      name="upi"
      className="scale-125"
      checked={paymentMethod === "upi"}
      onChange={() => setPaymentMethod("upi")}
    />
    <label htmlFor="upi" className="text-black cursor-pointer">
      UPI
    </label>
  </div>

  <div className="space-x-5 border-b py-5">
    <input
      type="radio"
      id="cod"
      name="cod"
      className="scale-125"
      checked={paymentMethod === "cod"}
      onChange={() => setPaymentMethod("cod")}
    />
    <label htmlFor="cod" className="text-black cursor-pointer">
      Cash On Delivery
    </label>
  </div>
</div>; */
}
