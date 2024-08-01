import React, { useState } from "react";
import productImg from "../../assets/product1.jpg";
import { LuEye, LuHeart, LuShoppingCart } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cartSlice";
import { uiActions } from "../../store/uiSlice";
import Modal from "../General/UI/Modal";
import { createPortal } from "react-dom";
import ProductDetails from "./ProductDetails";
import { AiOutlineClose } from "react-icons/ai";
import { userActions } from "../../store/userSlice";
import { useMutation } from "react-query";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";
import { getDiscountedPrice, onlyText } from "../../utils/helperFunction";

const ProductItem = ({ cardSize, category, product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isRedirect, setIsRedirect] = useState(false);

  const { isAuthenticated, wishList: wishlistItems } = useSelector(
    (state) => state.user
  );

  const exitsInWishList = wishlistItems.some(
    (item) => item._id === product?._id
  );

  const { mutate: processWishList } = useMutation(
    (id) => axiosInstance.put(`/user/wishlist/${id}`),
    {
      onSuccess: (res) => {
        dispatch(
          exitsInWishList
            ? userActions.removeFromWishList(product?._id)
            : userActions.addToWishList(product)
        );
        toast.success(
          !exitsInWishList
            ? "Product Added to WishList!"
            : "Product Removed from WishList!"
        );
      },
      onError: (err) => console.log(err),
    }
  );

  const reDirectHandler = () => {
    setIsRedirect((prevState) => !prevState);
    // alert(isRedirect)
  };

  // console.log(product, "product");

  return (
    <li className="w-full sml:w-[47%] md:w-[31%] lg:w-[23%] mb-6 ">
      {createPortal(
        <ModelSignup product={product} />,
        document.getElementById("modal")
      )}
      {createPortal(
        <ProductDetailModal product={product?.itemTitle} />,
        document.getElementById("modal")
      )}
      <div
        className="relative group/card mb-2 cursor-pointer"
        onClick={() =>
          !isRedirect
            ? navigate(
                `/products/${
                  category ? category : product?.subCategory.split("/")[0]
                }/${product?._id}`
              )
            : null
        }
      >
        <img
          src={product?.images ? product?.images[0] : productImg}
          alt=""
          loading="lazy"
          className=" object-cover object-center h-[400px] w-full"
        />
        {product?.discountPercentage && (
          <div className=" absolute top-4 right-4 text-sm bg-primary text-white px-2 py-[1px]">
            {`-${product?.discountPercentage}%`}
          </div>
        )}
        <div
          className="opacity-0 group-hover/card:opacity-100 absolute inset-0 bg-black/10 
                    flex p-4 justify-center items-center transition-all ease-linear duration-[400ms]"
        >
          <div className="flex gap-2 h-fit">
            <button
              className="group/eye bg-white hover:bg-black p-[15px] rounded-full transition-all ease-linear"
              onClick={() =>
                dispatch(uiActions.productDetailModalHandler(product))
              }
              onMouseEnter={reDirectHandler}
              onMouseLeave={reDirectHandler}
            >
              <LuEye className="scale-[1.3] group-hover/eye:text-white" />
            </button>
            <button
              className="group/cart bg-white hover:bg-black p-[15px] rounded-full transition-all ease-linear"
              onClick={() => {
                if (product) {
                  dispatch(
                    cartActions.addProduct({
                      ...product,
                      actualPrice: product?.discountPercentage
                        ? getDiscountedPrice(
                            product?.actualPrice,
                            product?.discountPercentage
                          )
                        : product?.actualPrice,
                      productQuantity: 1,
                    })
                  );
                  toast.success("Product Added to Cart!");
                }
              }}
              onMouseEnter={reDirectHandler}
              onMouseLeave={reDirectHandler}
            >
              <LuShoppingCart className="scale-[1.3] group-hover/cart:text-white" />
            </button>
          </div>
          <button
            className="absolute top-4 left-4"
            onClick={() =>
              isAuthenticated
                ? processWishList(product?._id)
                : dispatch(uiActions.wishListSignInModalHandler())
            }
            onMouseEnter={reDirectHandler}
            onMouseLeave={reDirectHandler}
          >
            <LuHeart
              className={`scale-115 hover:text-pink-600 transition-all ease-linear ${
                isAuthenticated &&
                exitsInWishList &&
                "text-pink-500 fill-pink-500"
              }`}
              fill={exitsInWishList ? "pink" : "transparent"}
            />
          </button>
        </div>
      </div>

      <div className="relative">
        <Link
          to={`/products/${
            category ? category : product?.subCategory.split("/")[0]
          }/${product?._id}`}
          className="text-[15px] font-medium text-ternary hover:text-pink-500
                  transition-all ease-linear cursor-pointer capitalize"
        >
          {product?.itemTitle}
        </Link>

        <div className="relative">
          <p className="text-[13px] font-medium absolute -bottom-5 left-0">
            {product?.discountPercentage ? (
              <span className="flex items-center gap-1">
                <span className="line-through">₹{product?.actualPrice}</span>{" "}
                <span className="text-primary">{`₹${
                  product?.actualPrice -
                  (product?.actualPrice * product?.discountPercentage) / 100
                }`}</span>
              </span>
            ) : (
              <span className="text-primary">{`₹ ${product?.actualPrice}`}</span>
            )}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;

const ModelSignup = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  

  const wishListSignInModal = useSelector(
    (state) => state.ui.modal.wishListSignInModal
  );

  const { mutate: loginUser } = useMutation(
    (data) => axiosInstance.post("/user/login", data),
    {
      onSuccess: (res) => {
        toast.success(onlyText(res.data.message));
        dispatch(uiActions.wishListSignInModalHandler());
        dispatch(userActions.loginUser());
        dispatch(userActions.setUser(res.data.user));
        dispatch(userActions.setWishList(res.data.user.wishList));
        navigate("/");
      },
      onError: (err) => {
        toast.error(onlyText(err?.response.data.message));
      },
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser({
      email: email.trim(),
      pswd: password.trim(),
    });
  };

  return (
    <>
      {wishListSignInModal && (
        <Modal isOpen={wishListSignInModal}>
          <div className="flex gap-2 w-full justify-center items-start z-[100] px-3">
            <div className="bg-white border ">
              <div className="border-b flex justify-between items-center p-3">
                <h1 className="text-lg font-medium ">SIGN IN</h1>
                <AiOutlineClose
                  className=" md:hidden scale-150 cursor-pointer
              duration-300 transition-all ease-linear "
                  onClick={() =>
                    dispatch(uiActions.wishListSignInModalHandler())
                  }
                />
              </div>
              <div className="p-5 md:p-7">
                <form
                  action=""
                  className="flex flex-col gap-10"
                  onSubmit={submitHandler}
                >
                  <div className="space-y-5">
                    <input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border outline-none p-2 text-sm focus:border-black w-full"
                      placeholder="Email"
                    />
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border outline-none p-2 text-sm focus:border-black w-full"
                      placeholder="Password"
                    />
                    <button
                      className="text-sm text-gray-500 text-right"
                      onClick={() => {
                        // document.body.style.overflow = "";
                        dispatch(uiActions.wishListSignInModalHandler());
                        navigate("/password/reset");
                      }}
                    >
                      Forget Your password?
                    </button>
                  </div>
                  <div className="space-y-4">
                    <button className="text-white bg-primary text-sm font-medium w-full p-[10px]">
                      Sign In
                    </button>
                    <button
                      className="text-white bg-ternary text-sm font-medium w-full p-[10px]"
                      onClick={() => {
                        dispatch(uiActions.wishListSignInModalHandler());
                        navigate("/account/sign-up");
                      }}
                    >
                      Create an Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <button
              className="bg-ternary hidden md:block h-fit p-3 cursor-pointer group/close"
              onClick={() => dispatch(uiActions.wishListSignInModalHandler())}
            >
              <AiOutlineClose
                className="text-white  scale-150 group-hover/close:rotate-180
              duration-300 transition-all ease-linear"
              />
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

const ProductDetailModal = () => {
  const dispatch = useDispatch();
  const productDetailModal = useSelector(
    (state) => state.ui.modal.productDetailModal
  );
  const product = useSelector((state) => state.ui.modal.product);
  productDetailModal && console.log(product);
  return (
    <>
      {productDetailModal && (
        <Modal isOpen={productDetailModal} className="">
          <div className="bg-white overflow-y-scroll h-[90vh] w-[90%] mdl:w-[75%]">
            <AiOutlineClose
              className="ml-auto scale-125 md:scale-150 mr-6 translate-y-3 md:translate-y-5 cursor-pointer "
              onClick={() => dispatch(uiActions.productDetailModalHandler())}
            />
            <ProductDetails
              product={product && product}
              showBreadCrumbs={false}
              showAllImage={false}
            />
          </div>
        </Modal>
      )}
    </>
  );
};
