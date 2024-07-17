import React, { useState } from "react";
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

    // console.log({ ...product, actualPrice, productQuantity });
    dispatch(
      cartActions.addProduct({ ...product, actualPrice, productQuantity })
    );
    toast.success("Product Added to Cart!");
  };

  const { mutate: processWishList } = useMutation(
    (id) => axiosInstance.put(`/user/wishlist/${id}`),
    {
      onSuccess: (res) => {
        console.log(res);
        dispatch(
          itemExistsInWishList
            ? userActions.removeFromWishList(product?._id)
            : userActions.addToWishList(product)
        );
      },
      onError: (err) => console.log(err),
    }
  );
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
      <section className="p-5 md:p-10 space-y-12">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-5">
          <div className="w-full lg:w-1/2 flex flex-wrap-reverse mdl:flex-nowrap  relative gap-3">
            <ul
              className={`flex flex-row mdl:flex-col gap-2 pb-4 h-full justify-center w-full mdl:w-fit items-end py-2 ${
                !showAllImage && "hidden"
              }`}
            >
              {product?.images?.map((image, index) => (
                <li
                  key={index}
                  onClick={() => setProductImageIndex(index)}
                  className={`w-20  h-20 relative cursor-pointer border rounded ${
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
              <div className="relative">
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
                    // width={400}
                    // height={250}
                    // zoomPosition="original"
                    // offset={"vertical: 0, horizontal: 10"}
                    zoomStyle="height: 500px; object-fit: contain; object-position: center;
                      border: 1px solid #ccc; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
                      padding: 5px;"
                    zoomWidth={500}
                    img={product?.images && product?.images[productImageIndex]}
                  />
                </div>
                {/* Controls */}
                {/* <div className=" absolute inset-0 flex items-center justify-between px-5 group/productImg ">
                  <LuChevronLeftCircle
                    className="cursor-pointer text-ternary opacity-0 group-hover/productImg:opacity-100 transition-all ease-linear duration-300"
                    size={38}
                    onClick={() =>
                      setProductImageIndex((prevState) =>
                        prevState === 0
                          ? product?.images.length - 1
                          : prevState - 1
                      )
                    }
                  />
                  <LuChevronRightCircle
                    className="cursor-pointer text-ternary opacity-0 group-hover/productImg:opacity-100 transition-all ease-linear duration-300"
                    size={38}
                    onClick={() =>
                      setProductImageIndex((prevState) =>
                        prevState === product?.images.length - 1
                          ? 0
                          : prevState + 1
                      )
                    }
                  />
                </div> */}
                {!showAllImage && (
                  <ul className="flex gap-2 justify-center items-center pt-5 ">
                    {Array.from(Array(product?.images.length).keys()).map(
                      (i, index) => (
                        <li
                          key={i}
                          onClick={() => setProductImageIndex(index)}
                          className={`h-2 w-2 rounded-full border border-black ${
                            productImageIndex === i
                              ? "bg-black"
                              : "bg-transparent"
                          }`}
                        />
                      )
                    )}
                  </ul>
                )}
              </div>
            ) : (
              <h1 className=" w-1/2 flex justify-center items-center">
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

            <div className="space-y-1">
              <h4 className=" text-gray-400 text-2xl ">
                {/* Discounted Percentage */}
                {product?.discountPercentage && (
                  <span className={`text-primary pr-2 text-lg`}>
                    -{product?.discountPercentage}%
                  </span>
                )}

                {/* Discounted Price */}
                <span className={`text-black`}>
                  ₹
                  {product?.discountPercentage
                    ? product?.actualPrice -
                      (product?.actualPrice * product?.discountPercentage) / 100
                    : product?.actualPrice}
                </span>
              </h4>

              {/* Actual Price */}
              {product?.discountPercentage && (
                <h6 className="text-[13px]">
                  M.R.P:
                  <span
                    className={`${
                      product?.discountPercentage && "line-through"
                    } pl-1`}
                  >
                    ₹{product?.actualPrice}
                  </span>
                </h6>
              )}
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
                {/* <input
                  type="number"
                  className="flex w-12 h-full outline-none pl-5 "
                  value={productQuantity}
                  onChange={(event) => {
                    if (+event.target.value < 1) {
                      return;
                    }
                    setProductQuantity(+event.target.value);
                  }}
                /> */}
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
                className="text-white w-full bg-primary font-semibold px-5 py-[6px] rounded-full"
                onClick={addToCartHandler}
              >
                Add to cart
              </button>
            </div>

            <button
              type="button"
              className="text-gray-500 hover:text-primary transition-all ease-linear 
             flex gap-1 items-center w-fit"
              onClick={() => processWishList(product._id)}
            >
              <LuHeart
                className={`${
                  isAuthenticated &&
                  itemExistsInWishList &&
                  "text-pink-500 fill-pink-500"
                }`}
                // fill={`${itemExistsInWishList ? "pink" : "white"}`}
              />
              <span className="text-[15px]">{`${
                itemExistsInWishList
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"
              }`}</span>
            </button>

            <div>
              <img src={productDetailSpecs} alt="" />
            </div>

            <JsonDisplay data={product?.highlights} />

            <h4 className="text-center sml:text-left">
              Category:{" "}
              <span className="capitalize text-primary">
                {product?.subCategory?.split("/")[0]}
              </span>
            </h4>

            <h4
              className={`border w-fit px-2 text-sm py-[2px] text-white ${
                product?.stock < 1
                  ? "bg-red-500"
                  : product?.stock <= 20
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            >
              {product?.stock < 1
                ? "Out of Stock"
                : product?.stock <= 20
                ? "Low Stock"
                : "In Stock"}
            </h4>
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductDetails;
