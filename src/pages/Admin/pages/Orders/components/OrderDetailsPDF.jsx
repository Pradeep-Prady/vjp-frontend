import React from "react";
import { formatDateAndTime } from "../../../../../utils/helperFunction";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { ProductsTable } from "./OrderDetails";

const OrderDetailsPDF = ({ order, status, logo }) => {
  return (
    <div className="pdf-content">
      <img src={logo} alt="Logo" className="logo" />
      <div className="content">
        <div className="bg-[#4FA607] text-white p-6 rounded-t flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 ">
              <FaCalendarAlt className="text-black " />
              <h1 className="translate-y-[1px] font-medium">
                {formatDateAndTime(order?.createdAt).formattedDate}
              </h1>
            </div>
            <h1 className="text-[14px] font-light">
              Order ID :<span className="font-medium px-1">{order?._id}</span>
            </h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-b border">
          <div className="flex justify-between gap-3">
            {/* Customer Info */}
            <div className="flex flex-col items-center w-1/3 gap-2 p-1 px-3">
              <div>
                <div className="bg-[#D1E7DD] w-12 h-12 rounded-full flex justify-center items-center">
                  <FaUser className="text-[#198754] scale-125" />
                </div>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <h1 className="font-medium">Customer</h1>
                <h1>{order?.user?._id}</h1>
                <h3>{`${order?.user?.fName} ${order?.user?.lName}`}</h3>
                <a
                  href={`mailto:${order?.user?.email}`}
                  className="text-blue-800 underline"
                >
                  {order?.user?.email}
                </a>
              </div>
            </div>
            {/* Order Info */}
            <div className="flex flex-col items-center w-1/3 gap-2 p-1 px-3">
              <div>
                <div className="bg-[#D1E7DD] w-12 h-12 rounded-full flex justify-center items-center">
                  <FaLocationDot className="text-[#198754] scale-125" />
                </div>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <h1 className="font-medium">Order Info</h1>
                <h1 className="">{order?._id}</h1>
                <h1>{`Payment Method: ${order?.paymentMethod?.toUpperCase()}`}</h1>
                <h3
                  className={`px-2 py-1 rounded text-white w-fit ${
                    status?.value === "Delivered"
                      ? "bg-[#198754]"
                      : status?.value === "Processing"
                      ? "bg-yellow-600"
                      : "bg-red-500"
                  }`}
                >
                  {status?.label}
                </h3>
              </div>
            </div>
            {/* Customer Address */}
            <div className="flex flex-col items-center w-1/3 gap-2 p-1 px-3">
              <div>
                <div className="bg-[#D1E7DD] w-12 h-12 rounded-full flex justify-center items-center">
                  <FaLocationDot className="text-[#198754] scale-125" />
                </div>
              </div>
              <div className="space-y-1 flex flex-col items-center">
                <h1 className="font-medium">Deliver to</h1>
                <h1 className="capitalize">{order?.user?.cmpny}</h1>
                <h3>{order?.user?.strtAddrss}</h3>
                <h3>{`${order?.user?.city}, ${order?.user?.state}, ${order?.user?.cntry}`}</h3>
                <h3>{`${order?.user?.zipCode}`}</h3>
              </div>
            </div>
          </div>
          <ProductsTable products={order?.product} />
          <div className="border rounded">
            <div>
              <h1 className="font-medium p-4">Order Summary</h1>
              <div className="p-4 space-y-4">
                <div className="flex justify-between border-b">
                  <h1>Subtotal</h1>
                  <h1>{`₹ ${order?.total}`}</h1>
                </div>
                <div className="flex justify-between border-b">
                  <h1>Shipping</h1>
                  <h1>{`₹ ${order?.shipping ? order?.shipping : 0}`}</h1>
                </div>
                <div className="flex justify-between border-b">
                  <h1>Tax</h1>
                  <h1>{`₹ ${order?.tax ? order?.tax : 0}`}</h1>
                </div>
                <div className="flex justify-between border-b">
                  <h1>Total</h1>
                  <h1>{`₹ ${order?.total}`}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPDF;
