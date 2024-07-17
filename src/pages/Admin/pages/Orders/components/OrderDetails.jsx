import React, { useState, useEffect, useRef } from "react";
import Breadcrumbs from "../../../../../components/General/UI/Breadcrumbs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCalendarAlt, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { axiosInstance } from "../../../../../services/axios";
import { useQuery } from "react-query";
import { formatDateAndTime } from "../../../../../utils/helperFunction";
import StatusSelect from "react-select";
import { toast } from "react-toastify";
import VJPLOGO from "../../../../../assets/vjp_logo_color.png";

import { useReactToPrint } from "react-to-print";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import OrderDetailsPDF from "./OrderDetailsPDF";

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "#D1E7DD",
    color: "black",
    cursor: "pointer", // Add cursor pointer for the control
    // control: Styles the control (input) component.
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
    // singleValue: Styles the selected value displayed in the input.
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
    // placeholder: Styles the placeholder text.
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#D1E7DD",
    // menu: Styles the dropdown menu.
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "silver" : "#D1E7DD",
    color: "black",
    cursor: "pointer", // Add cursor pointer for each option
    // option: Styles each option in the dropdown menu.
    // The state.isFocused check is used to apply a different background color,
    //  when an option is focused (hovered).
  }),
};

// Example usage:
const statusOptions = [
  { label: "Delivered", value: "Delivered" },
  { label: "Processing", value: "Processing" },
  { label: "Cancelled", value: "Cancelled" },
];

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState({});
  const [status, setStatus] = useState(null); // Initially null
  const componentRef = useRef();
  const [showPdf, setShowPdf] = useState(false);

  console.log(order);
  console.log(status);

  // Get Specific Order Data
  const { data, error, isLoading } = useQuery(
    ["getSpecificOrder", orderId],
    () => axiosInstance.get(`/order/${orderId}/admin`),
    {
      onSuccess: (res) => {
        const fetchedOrder = res.data.data;
        setOrder(fetchedOrder);
        setStatus(
          statusOptions.find((option) => option.value === fetchedOrder.status)
        );
      },
      onError: (err) => console.log("An error happened:", err.message),
      // staleTime: Infinity, // Ensure the data doesn't get stale and refetch unnecessarily
    }
  );

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
    // Update order status in the backend if needed
    axiosInstance
      .put(`/order/update/${orderId}`, { status: selectedOption.value })
      .then((res) => toast.success("Status updated successfully"))
      .catch((err) => toast.error("Error updating status"));
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const generatePDF = () => {
    const input = componentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const marginY = (pdfHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", 0, marginY, imgWidth, imgHeight);
      pdf.save("order-details.pdf");
    });
  };

  return (
    <div>
      <Breadcrumbs
        group="admin"
        currentPage={[{ text: "Orders", URL: ".." }, { text: "Order Details" }]}
      />
      {/* <button onClick={handlePrint} className="btn btn-primary">
        Print
      </button>
      <button onClick={generatePDF} className="btn btn-secondary">
        Download PDF
      </button> */}
      <div
        // className={`rounded ${showPdf ? "block" : "hidden"}`}
        ref={componentRef}
      >
        <div className="bg-[#4FA607] text-white p-6 rounded-t flex justify-between items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2 ">
              <FaCalendarAlt className="text-black " />
              <h1 className="translate-y-[1px] font-medium">
                {formatDateAndTime(order?.createdAt).formattedDate}
              </h1>
            </div>
            <h1 className="text-[14px] font-light">
              Order ID :<span className="font-medium px-1">{orderId}</span>
            </h1>
          </div>

          <StatusSelect
            options={statusOptions}
            placeholder="Select Status"
            value={status}
            onChange={handleStatusChange}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
          />
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
                <h1 className="">{orderId}</h1>
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
        {/* <OrderDetailsPDF logo={VJPLOGO} order={order} status={status} /> */}
      </div>
    </div>
  );
};

export default OrderDetails;

const ProductRow = ({ product }) => {
  return (
    <tr>
      <td className="px-4 py-2 text-center w-1/2">
        {product?.item?.itemTitle}
      </td>
      <td className="px-4 py-2 text-center w-1/6">₹ {product?.price}</td>
      <td className="px-4 py-2 text-center w-1/6">{product?.quantity}</td>
      <td className="px-4 py-2 text-center w-1/6">
        ₹ {product?.price * product?.quantity}
      </td>
    </tr>
  );
};

export const ProductsTable = ({ products }) => {
  return (
    <table className="table-auto w-full border my-10">
      <thead className="border-b-2 border-black">
        <tr>
          <th className="px-4 py-2 w-1/2">Product</th>
          <th className="px-4 py-2 w-1/6">Unit Price</th>
          <th className="px-4 py-2 w-1/6">Quantity</th>
          <th className="px-4 py-2 w-1/6">Total</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((product, index) => (
          <ProductRow key={index} product={product} />
        ))}
      </tbody>
    </table>
  );
};
