import React from "react";
import productImg from "../../../assets/product1.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cartSlice";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../services/axios";
import { toast } from "react-toastify";
import { userActions } from "../../../store/userSlice";
import { getDiscountedPrice } from "../../../utils/helperFunction";

const WishListItem = ({ product }) => {
  const dispatch = useDispatch();

  const { mutate: processWishList } = useMutation(
    (id) => axiosInstance.put(`/user/wishlist/${id}`),
    {
      onSuccess: (res) => {
        // console.log(res);
        dispatch(userActions.removeFromWishList(product?._id));
        toast.success("Product Removed from WishList!");
      },
      onError: (err) => console.log(err),
    }
  );

  return (
    <li
      className="w-full mdl:w-[33%] lg:w-[24.5%] mb-6 space-y-3 p-2
    border mdl:border-0"
    >
      <div className="flex gap-6 mdl:gap-0 mdl:block">
        <div className="relative cursor-pointer group/card mb-2">
          <img
            src={product?.images ? product?.images[0] : productImg}
            alt=""
            loading="lazy"
            className=" object-cover object-center h-20 mdl:h-64 w-full"
          />
        </div>
        <div className="space-y-1">
          <Link
            to={`/products/${product?.subCategory.split("/")[0]}/${
              product?._id
            }`}
            className="text-[15px] font-medium text-ternary hover:text-pink-500
                transition-all ease-linear cursor-pointer"
          >
            {product?.itemTitle ? product?.itemTitle : "Product Name"}
          </Link>
          <p className="text-[13px] font-medium">
            ₹ {`${product?.actualPrice ? product?.actualPrice : 0}.00`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mdl:block space-y-3">
        <button
          className="text-white   bg-primary font-semibold px-5 py-[6px] rounded-full"
          onClick={() => {
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
          }}
        >
          Add to cart
        </button>
        <h6
          className="txt cursor-pointer w-fit"
          onClick={() => processWishList(product?._id)}
        >
          Remove Item
        </h6>
      </div>
    </li>
  );
};

export default WishListItem;
