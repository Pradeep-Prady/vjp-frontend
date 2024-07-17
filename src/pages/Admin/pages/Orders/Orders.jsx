import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../../store/adminSlice";
import { useQuery } from "react-query";
import { useQueryEvents } from "../../../../hooks/useQueryWithCallbacks";
import { axiosInstance } from "../../../../services/axios";
import dayjs from "dayjs";
import DatePicker from "react-date-picker";
import Select from "react-select";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { formatDateAndTime } from "../../../../utils/helperFunction";

const statusOptions = [
  { value: "Delivered", label: "Delivered" },
  { value: "Processing", label: "Processing" },
  { value: "Cancelled", label: "Cancelled" },
];

const Orders = () => {
  const dispatch = useDispatch();
  const [fromDate, setFromDate] = useState(
    dayjs().subtract(1, "month").toDate()
  );
  const [toDate, setToDate] = useState(dayjs().toDate());
  const [status, setStatus] = useState("");
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const orders = useSelector((state) => state.admin.orders);

  // Get Admin Orders Data
  useQuery(
    ["getAdminOrders", { fromDate, toDate, status, currentPageNumber }],
    () =>
      axiosInstance.get(
        `/orders?from=${dayjs(fromDate).format("YYYY-MM-DD")}&to=${dayjs(
          toDate
        ).format("YYYY-MM-DD")}&keyword=${status}&page=${currentPageNumber}`
      ),
    {
      enabled: !!fromDate && !!toDate,
      onSuccess: (res) => {
        console.log(res.data);
        dispatch(adminActions.addOrders(res.data.data));
      },
      onError: (err) => console.log("An error happened:", err.message),
    }
  );

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption ? selectedOption.value : "");
  };

  console.log(orders);
  console.log(fromDate);
  console.log(toDate);
  return (
    <div className="text-ternary space-y-4">
      <h1 className="text-3xl font-medium">Orders</h1>
      <div className="flex space-x-4 border justify-between p-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            From Date
          </label>
          <DatePicker onChange={setFromDate} value={fromDate} className="" />
        </div>
        <div className="flex items-center gap-10">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <Select
              options={statusOptions}
              onChange={handleStatusChange}
              isClearable
              className=" w-48 cursor-pointer"
              placeholder="Select Status"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              To Date
            </label>
            <DatePicker onChange={setToDate} value={toDate} className="" />
          </div>
        </div>
      </div>
      {orders.ordersCount <= 0 ? (
        <p className="border p-5 flex bg-white items-center justify-center">
          No Order found between
          <span className="px-1 font-medium">
            {formatDateAndTime(fromDate).formattedDate}
          </span>{" "}
          to
          <span className="px-1 font-medium">
            {formatDateAndTime(toDate).formattedDate}
          </span>
          {status && (
            <span className={`px-1 font-medium text-[15px]`}>
              :{" "}
              <span
                className={`border px-2 py-[1px] rounded-full ${
                  status === "Processing"
                    ? "bg-yellow-300 text-yellow-700 border-yellow-500"
                    : status === "Delivered"
                    ? "bg-green-300 text-green-700"
                    : "bg-red-300 text-red-700"
                }`}
              >
                {status}
              </span>
            </span>
          )}
        </p>
      ) : (
        <div className="bg-white border rounded p-3 overflow-x-auto">
          <OrdersTable orders={orders.orders} />
        </div>
      )}
    </div>
  );
};

export default Orders;

const OrderRow = ({ order }) => {
  return (
    <tr className="text-sm">
      <td className="border px-2 py-2 text-blue-800 underline">
        <Link to={`/admin/orders/${order._id}`}>{order._id}</Link>
      </td>
      <td className="border px-2 py-2">{order.user.email}</td>
      <td className="border px-2 py-2">₹{order.total}</td>
      <td className="border px-2 py-2">
        <h1
          className={`font-medium px-2 w-fit rounded-full ${
            order.paymentMethod === "cod"
              ? "text-red-500 bg-red-200"
              : "text-green-800 bg-green-200"
          }`}
        >
          {order.paymentMethod === "cod" ? "Not Paid" : "Paid"}
        </h1>
      </td>
      <td className="border px-2 py-2">
        {formatDateAndTime(order.createdAt).formattedDate}
      </td>

      <td className="border px-2 py-2 flex justify-center">
        <h1
          className={`px-2 py-1 rounded text-white ${
            order.status === "Delivered"
              ? "bg-[#198754]"
              : order.status === "Processing"
              ? "bg-yellow-600"
              : "bg-red-500"
          }`}
        >
          {order.status}
        </h1>
      </td>
      <td className="border px-2 py-2">
        <Link
          className="flex justify-center items-center"
          to={`/admin/orders/${order._id}`}
        >
          <FaEye className="text-[#198754] scale-[2]" />
        </Link>
      </td>
    </tr>
  );
};

const OrdersTable = ({ orders }) => {
  return (
    <table className="table-auto w-full text-sm">
      <thead>
        <tr>
          <th className="px-4 py-2">Order ID</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Total</th>
          <th className="px-4 py-2">Paid</th>
          <th className="px-4 py-2">Date</th>

          <th className="px-4 py-2">Status</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => (
          <OrderRow key={index} order={order} />
        ))}
      </tbody>
    </table>
  );
};
