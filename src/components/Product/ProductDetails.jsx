// import React, { useEffect, useRef, useState } from "react";
// import JsonDisplay from "../General/UI/JsonDisplay";
// import { LuHeart } from "react-icons/lu";
// import productDetailSpecs from "../../assets/productDetailSpecs.png";
// import Breadcrumbs from "../General/UI/Breadcrumbs";
// import { useDispatch, useSelector } from "react-redux";
// import { cartActions } from "../../store/cartSlice";
// import { useMutation } from "react-query";
// import { axiosInstance } from "../../services/axios";
// import { userActions } from "../../store/userSlice";
// import ReactImageZoom from "react-image-zoom";
// import { toast } from "react-toastify";
// import { createPortal } from "react-dom";
// import Modal from "../General/UI/Modal";

// const ProductDetails = ({
//   product,
//   showAllImage = true,
//   showBreadCrumbs = true,
// }) => {
//   const dispatch = useDispatch();

//   const [productQuantity, setProductQuantity] = useState(1);
//   const [productImageIndex, setProductImageIndex] = useState(0);

//   const { isAuthenticated, wishList: wishListItems } = useSelector(
//     (state) => state.user
//   );

//   const itemExistsInWishList = wishListItems.find(
//     (item) => item._id === product?._id
//   );

//   const addToCartHandler = () => {
//     const actualPrice = product?.discountPercentage
//       ? product?.actualPrice -
//         (product?.actualPrice * product?.discountPercentage) / 100
//       : product?.actualPrice;

//     // console.log({ ...product, actualPrice, productQuantity });
//     dispatch(
//       cartActions.addProduct({ ...product, actualPrice, productQuantity })
//     );
//     toast.success("Product Added to Cart!");
//   };

//   const { mutate: processWishList } = useMutation(
//     (id) => axiosInstance.put(`/user/wishlist/${id}`),
//     {
//       onSuccess: (res) => {
//         // console.log(res);
//         dispatch(
//           itemExistsInWishList
//             ? userActions.removeFromWishList(product?._id)
//             : userActions.addToWishList(product)
//         );
//       },
//       onError: (err) => console.log(err),
//     }
//   );

//   const buttonRef = useRef(null);

//   useEffect(() => {
//     const shakeButton = () => {
//       if (buttonRef.current) {
//         buttonRef.current.classList.add("shake");
//         setTimeout(() => {
//           buttonRef.current.classList.remove("shake");
//         }, 500); // Duration of the shake animation
//       }
//     };

//     const intervalId = setInterval(shakeButton, 3000); // 10 seconds

//     // Initial shake
//     shakeButton();

//     // Cleanup the interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const [openBulkOrder, setOpenBulkOrder] = useState(false);
//   return (
//     <>
//       {showBreadCrumbs && (
//         <Breadcrumbs
//           currentPage={[
//             {
//               text: product?.subCategory
//                 ?.split("/")[0]
//                 .split("-")
//                 .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                 .join(" "),
//               URL: "..",
//             },
//             { text: product?.itemTitle, URL: "" },
//           ]}
//         />
//       )}
//       <section className="pb-5 md:px-10 md:pb-10 space-y-12">
//         <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-5">
//           <div className="w-full lg:w-1/2 flex flex-wrap-reverse mdl:flex-nowrap  relative gap-3">
//             <ul
//               className={`flex flex-row mdl:flex-col gap-2 pb-4 h-full justify-center w-full mdl:w-fit items-end${
//                 !showAllImage && "hidden"
//               }`}
//             >
//               {product?.images?.map((image, index) => (
//                 <li
//                   key={index}
//                   onClick={() => setProductImageIndex(index)}
//                   className={`w-20  h-20 relative cursor-pointer rounded ${
//                     productImageIndex !== index && "bg-black/30 border-0"
//                   }`}
//                 >
//                   <img
//                     src={image}
//                     alt=""
//                     className="object-cover h-full w-full object-center absolute -z-20"
//                     loading="lazy"
//                   />
//                 </li>
//               ))}
//             </ul>
//             {product?.images ? (
//               <div className="relative">
//                 {product?.discountPercentage && (
//                   <div className=" absolute z-30 top-4 right-4  bg-primary text-white px-2 py-[1px]">
//                     {`-${product?.discountPercentage}%`}
//                   </div>
//                 )}
//                 {/* Normal Image with No Zoom */}
//                 <img
//                   src={product?.images[productImageIndex]}
//                   alt=""
//                   className="w-full h-full object-cover object-center md:hidden"
//                   loading="lazy"
//                 />
//                 {/* Zoomable */}

//                 <div className="hidden md:block relative">
//                   <ReactImageZoom
//                     // width={400}
//                     // height={250}
//                     // zoomPosition="original"
//                     // offset={"vertical: 0, horizontal: 10"}
//                     zoomStyle="height: 600px; object-fit: contain; object-position: center;
//                       border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
//                       padding: 5px;"
//                     zoomWidth={500}
//                     img={product?.images && product?.images[productImageIndex]}
//                   />
//                 </div>
//                 {/* Controls */}
//                 {/* <div className=" absolute inset-0 flex items-center justify-between px-5 group/productImg ">
//                   <LuChevronLeftCircle
//                     className="cursor-pointer text-ternary opacity-0 group-hover/productImg:opacity-100 transition-all ease-linear duration-300"
//                     size={38}
//                     onClick={() =>
//                       setProductImageIndex((prevState) =>
//                         prevState === 0
//                           ? product?.images.length - 1
//                           : prevState - 1
//                       )
//                     }
//                   />
//                   <LuChevronRightCircle
//                     className="cursor-pointer text-ternary opacity-0 group-hover/productImg:opacity-100 transition-all ease-linear duration-300"
//                     size={38}
//                     onClick={() =>
//                       setProductImageIndex((prevState) =>
//                         prevState === product?.images.length - 1
//                           ? 0
//                           : prevState + 1
//                       )
//                     }
//                   />
//                 </div> */}
//                 {!showAllImage && (
//                   <ul className="flex gap-2 justify-center items-center pt-5 ">
//                     {Array.from(Array(product?.images.length).keys()).map(
//                       (i, index) => (
//                         <li
//                           key={i}
//                           onClick={() => setProductImageIndex(index)}
//                           className={`h-2 w-2 rounded-full border border-black ${
//                             productImageIndex === i
//                               ? "bg-black"
//                               : "bg-transparent"
//                           }`}
//                         />
//                       )
//                     )}
//                   </ul>
//                 )}
//               </div>
//             ) : (
//               <h1 className=" w-1/2 flex justify-center items-center">
//                 <div className="border-t-2 border-primary w-40 h-40 rounded-full animate-spin" />
//               </h1>
//             )}
//           </div>

//           <div
//             className={`w-full lg:w-[47%] space-y-4 text-ternary ${
//               !showAllImage && "mt-5"
//             }`}
//           >
//             <h1 className="text-gray-800 text-xl font-semibold text-justify sml:text-left">
//               {product?.itemTitle}
//             </h1>

//             <div className="space-y-1 flex items-end  gap-3">
//               {product?.discountPercentage && (
//                 <h6 className="text-2xl">
//                   <span
//                     className={`${
//                       product?.discountPercentage && "line-through"
//                     } pl-1`}
//                   >
//                     ₹{product?.actualPrice}
//                   </span>
//                 </h6>
//               )}
//               <h4 className="  text-2xl text-primary">
//                 {/* Discounted Percentage */}
//                 {/* {product?.discountPercentage && (
//                   <span className={`text-primary pr-2 text-lg`}>
//                     -{product?.discountPercentage}%
//                   </span>
//                 )} */}

//                 {/* Discounted Price */}
//                 <span className={``}>
//                   ₹
//                   {product?.discountPercentage
//                     ? product?.actualPrice -
//                       (product?.actualPrice * product?.discountPercentage) / 100
//                     : product?.actualPrice}
//                 </span>
//               </h4>

//               {/* Actual Price */}
//               {/* {product?.discountPercentage && (
//                 <h6 className="text-[13px]">
//                   M.R.P:
//                   <span
//                     className={`${
//                       product?.discountPercentage && "line-through"
//                     } pl-1`}
//                   >
//                     ₹{product?.actualPrice}
//                   </span>
//                 </h6>
//               )} */}
//             </div>

//             <p className="text-justify md:text-left text-sm leading-6">{`${
//               product?.itemDescription?.split(".")[0]
//             }.`}</p>

//             <div className="flex flex-wrap sml:flex-nowrap pb-4 gap-5 justify-center sml:justify-start">
//               <div className="border border-ternary rounded-full flex font-semibold p-1">
//                 <button
//                   className="px-4 disabled:cursor-not-allowed text-2xl"
//                   disabled={productQuantity < 2}
//                   onClick={() =>
//                     setProductQuantity((prevState) => prevState - 1)
//                   }
//                 >
//                   -
//                 </button>
//                 {/* <input
//                   type="number"
//                   className="flex w-12 h-full outline-none pl-5 "
//                   value={productQuantity}
//                   onChange={(event) => {
//                     if (+event.target.value < 1) {
//                       return;
//                     }
//                     setProductQuantity(+event.target.value);
//                   }}
//                 /> */}
//                 <h1 className="flex w-12 justify-center items-center">
//                   {productQuantity}
//                 </h1>
//                 <button
//                   className="px-4 text-2xl disabled:cursor-not-allowed"
//                   disabled={productQuantity >= product?.stock}
//                   onClick={() =>
//                     setProductQuantity((prevState) => prevState + 1)
//                   }
//                 >
//                   +
//                 </button>
//               </div>

//               <button
//                 ref={buttonRef}
//                 className="text-white shake ease-in-out   bg-primary font-semibold px-5 py-[6px] rounded-full"
//                 onClick={addToCartHandler}
//               >
//                 Add to cart
//               </button>

//               <p
//                 onClick={() => setOpenBulkOrder(true)}
//                 className="text-primary  border-primary border-2 font-semibold px-5 py-[6px] rounded-full"
//               >
//                 Bulk Order
//               </p>
//             </div>

//             <button
//               type="button"
//               className="text-gray-500 hover:text-primary transition-all ease-linear
//              flex gap-1 items-center w-fit"
//               onClick={() => processWishList(product._id)}
//             >
//               <LuHeart
//                 className={`${
//                   isAuthenticated &&
//                   itemExistsInWishList &&
//                   "text-pink-500 text-[18px] fill-pink-500"
//                 }`}
//                 // fill={`${itemExistsInWishList ? "pink" : "white"}`}
//               />
//               <span className="text-[18px]">{`${
//                 itemExistsInWishList
//                   ? "Remove from Wishlist"
//                   : "Add to Wishlist"
//               }`}</span>
//             </button>

//             {/* <div>
//               <img src={productDetailSpecs} alt="" />
//             </div> */}

//             <JsonDisplay data={product?.highlights} />

//             <h4 className="text-center sml:text-left">
//               Category:{" "}
//               <span className="capitalize text-primary">
//                 {product?.subCategory?.split("/")[0]}
//               </span>
//             </h4>

//             <h4
//               className={`border w-fit text-[17px] px-3 text-sm py-[4px] text-white ${
//                 product?.stock < 1
//                   ? "bg-red-500"
//                   : product?.stock <= 20
//                   ? "bg-yellow-500"
//                   : "bg-green-500"
//               }`}
//             >
//               {product?.stock < 1
//                 ? "Out of Stock"
//                 : product?.stock <= 20
//                 ? "Low Stock"
//                 : "In Stock"}
//             </h4>
//           </div>
//         </div>
//       </section>
//       {openBulkOrder && <ModelBulkOrder />}
//     </>
//   );
// };
// export default ProductDetails;

// const ModelBulkOrder = () => {
//   return (
//     <div className="w-full h-screen scroll-none flex justify-center items-center bg-black bg-opacity-50 fixed top-0 left-0 z-[99]">
//       <h2>Bulk Order</h2>
//     </div>
//   );
// };

import React, { useEffect, useRef, useState } from "react";
import JsonDisplay from "../General/UI/JsonDisplay";
import { LuHeart } from "react-icons/lu";
import productDetailSpecs from "../../assets/productDetailSpecs.png";
import Breadcrumbs from "../General/UI/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { useMutation } from "react-query";
import { axiosInstance } from "../../services/axios";
import { userActions } from "../../store/userSlice";
import ReactImageZoom from "react-image-zoom";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import emailjs from "@emailjs/browser";
const ProductDetails = ({
  product,
  showAllImage = true,
  showBreadCrumbs = true,
}) => {
  const dispatch = useDispatch();

  const [productQuantity, setProductQuantity] = useState(1);
  const [productImageIndex, setProductImageIndex] = useState(0);

  const { isAuthenticated, wishList: wishListItems } = useSelector(
    (state) => state.user
  );

  const itemExistsInWishList = wishListItems.find(
    (item) => item._id === product?._id
  );

  const addToCartHandler = () => {
    const actualPrice = product?.discountPercentage
      ? product?.actualPrice -
        (product?.actualPrice * product?.discountPercentage) / 100
      : product?.actualPrice;

    dispatch(
      cartActions.addProduct({ ...product, actualPrice, productQuantity })
    );
    toast.success("Product Added to Cart!");
  };

  const { mutate: processWishList } = useMutation(
    (id) => axiosInstance.put(`/user/wishlist/${id}`),
    {
      onSuccess: (res) => {
        dispatch(
          itemExistsInWishList
            ? userActions.removeFromWishList(product?._id)
            : userActions.addToWishList(product)
        );
      },
      onError: (err) => console.log(err),
    }
  );

  const buttonRef = useRef(null);

  useEffect(() => {
    const shakeButton = () => {
      if (buttonRef.current) {
        buttonRef.current.classList.add("shake");
        setTimeout(() => {
          buttonRef.current.classList.remove("shake");
        }, 500); // Duration of the shake animation
      }
    };

    const intervalId = setInterval(shakeButton, 3000); // 10 seconds

    // Initial shake
    shakeButton();

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const [openBulkOrder, setOpenBulkOrder] = useState(false);

  return (
    <>
      {showBreadCrumbs && (
        <Breadcrumbs
          currentPage={[
            {
              text: product?.subCategory
                ?.split("/")[0]
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" "),
              URL: "..",
            },
            { text: product?.itemTitle, URL: "" },
          ]}
        />
      )}
      <section className="pb-5 md:px-10 md:pb-10 space-y-12">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-5">
          <div className="w-full lg:w-1/2 flex flex-wrap-reverse mdl:flex-nowrap relative gap-3">
            <ul
              className={`flex flex-row mdl:flex-col gap-2 pb-4 h-full justify-center w-full mdl:w-fit items-end${
                !showAllImage && "hidden"
              }`}
            >
              {product?.images?.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setProductImageIndex(index)}
                  className={`w-20 h-20 relative cursor-pointer rounded ${
                    productImageIndex !== index && "bg-black/30 border-0"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="object-cover h-full w-full object-center absolute -z-20"
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
            {product?.images ? (
              <div className="relative z-50">
                {product?.discountPercentage && (
                  <div className="absolute z-30 top-4 right-4 bg-primary text-white px-2 py-[1px]">
                    {`-${product?.discountPercentage}%`}
                  </div>
                )}
                {/* Normal Image with No Zoom */}
                <img
                  src={product?.images[productImageIndex]}
                  alt=""
                  className="w-full h-full object-cover object-center md:hidden"
                  loading="lazy"
                />
                {/* Zoomable */}
                <div className="hidden md:block relative">
                  <ReactImageZoom
                    zoomStyle="height: 600px; object-fit: contain; object-position: center; border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); padding: 5px;"
                    zoomWidth={500}
                    img={product?.images && product?.images[productImageIndex]}
                  />
                </div>
              </div>
            ) : (
              <h1 className="w-1/2 flex justify-center items-center">
                <div className="border-t-2 border-primary w-40 h-40 rounded-full animate-spin" />
              </h1>
            )}
          </div>

          <div
            className={`w-full lg:w-[47%] space-y-4 text-ternary ${
              !showAllImage && "mt-5"
            }`}
          >
            <h1 className="text-gray-800 text-xl font-semibold text-justify sml:text-left">
              {product?.itemTitle}
            </h1>

            <div className="space-y-1 flex items-end gap-3">
              {product?.discountPercentage && (
                <h6 className="text-2xl">
                  <span
                    className={`${
                      product?.discountPercentage && "line-through"
                    } pl-1`}
                  >
                    ₹{product?.actualPrice}
                  </span>
                </h6>
              )}
              <h4 className="text-2xl text-primary">
                <span className={``}>
                  ₹
                  {product?.discountPercentage
                    ? product?.actualPrice -
                      (product?.actualPrice * product?.discountPercentage) / 100
                    : product?.actualPrice}
                </span>
              </h4>
            </div>

            <p className="text-justify md:text-left text-sm leading-6">{`${
              product?.itemDescription?.split(".")[0]
            }.`}</p>

            <div className="flex flex-wrap sml:flex-nowrap pb-4 gap-5 justify-center sml:justify-start">
              <div className="border border-ternary rounded-full flex font-semibold p-1">
                <button
                  className="px-4 disabled:cursor-not-allowed text-2xl"
                  disabled={productQuantity < 2}
                  onClick={() =>
                    setProductQuantity((prevState) => prevState - 1)
                  }
                >
                  -
                </button>
                <h1 className="flex w-12 justify-center items-center">
                  {productQuantity}
                </h1>
                <button
                  className="px-4 text-2xl disabled:cursor-not-allowed"
                  disabled={productQuantity >= product?.stock}
                  onClick={() =>
                    setProductQuantity((prevState) => prevState + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                ref={buttonRef}
                className="text-white shake ease-in-out bg-primary  font-semibold px-5 py-[6px] rounded-full"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>

              <p
                onClick={() => setOpenBulkOrder(true)}
                className="text-primary border-primary border-2 font-semibold px-5 py-[6px] rounded-full cursor-pointer"
              >
                Bulk Order
              </p>
            </div>

            <button
              type="button"
              className="text-gray-500 hover:text-primary transition-all ease-linear flex gap-1 items-center w-fit"
              onClick={() => processWishList(product._id)}
            >
              <LuHeart
                className={`${
                  isAuthenticated &&
                  itemExistsInWishList &&
                  "text-pink-500 text-[18px] fill-pink-500"
                }`}
              />
              <span className="text-[18px]">{`${
                itemExistsInWishList
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"
              }`}</span>
            </button>

            <JsonDisplay data={product?.highlights} />

            <h4 className="text-center sml:text-left">
              Category:{" "}
              <span className="capitalize text-primary">
                {product?.subCategory
                  ?.split("/")[0]
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
            </h4>

            <div className="text-center flex flex-col items-center sml:items-start sml:text-left gap-3">
              {/* <img
                src={productDetailSpecs}
                alt="Product Details"
                className="rounded-md w-full"
                loading="lazy"
              /> */}
              <p className="text-xs">
                **Product images are for illustration purposes only and may
                differ from the actual product.
              </p>
            </div>
          </div>
        </div>
      </section>

      {openBulkOrder &&
        createPortal(
          <ModelBulkOrder
            setOpenBulkOrder={setOpenBulkOrder}
            product={product}
          />,
          document.body
        )}
    </>
  );
};

export default ProductDetails;

const ModelBulkOrder = ({ setOpenBulkOrder, product }) => {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Bulk Order Form Data:", formData);
  //   // Here you can handle form submission, e.g., send data to your backend
  //   setOpenBulkOrder(false);
  // };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ettdzk6",
        "template_rqd2mme",
        form.current,
        "GIm9L2rMJrBh_7YRG"
      )
      .then(form.current.reset());
    setFormData({
      user_name: "",
      email: "",
      phone: "",
      message: "",
    });

    setOpenBulkOrder(false);
    toast.success("Form Submitted Successfully");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setOpenBulkOrder(false)}
    >
      <div
        className="bg-white p-6 rounded shadow-lg relative max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="bg-primary text-white text-[26px] px-2 py-2 rounded absolute top-0 right-0 md:-top-5 md:-right-3"
          onClick={() => setOpenBulkOrder(false)}
        >
          <IoCloseOutline />
        </button>
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <div>
            <h2 name={"title"} className="text-2xl font-semibold mb-4">
              {product.itemTitle} - Bulk Order
            </h2>

            <input
              type="text"
              name="title"
              id="name"
              value={product.itemTitle}
              className="mt-1 w-full hidden border border-gray-300 rounded-md shadow-sm p-2"
            />
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="user_name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
