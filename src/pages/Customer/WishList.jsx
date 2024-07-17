import React from "react";

import WishListItem from "./components/WishListItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Disclaimer from "../../components/General/UI/Disclaimer";

import { cartActions } from "../../store/cartSlice";
import { userActions } from "../../store/userSlice";
import { getDiscountedPrice } from "../../utils/helperFunction";

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishList: wishListItems } = useSelector((state) => state.user);

  return (
    <>
      {wishListItems.length > 0 ? (
        <div>
          <ul className="flex flex-wrap">
            {wishListItems.map((product) => (
              <WishListItem key={product._id} product={product} />
            ))}
          </ul>
          <div className="flex flex-wrap md:flex-nowrap items-center gap-3">
            <button
              className="secondaryBttn w-full md:w-fit"
              onClick={() => {
                dispatch(userActions.clearWishList());
                window.scrollTo(0, 0);
              }}
            >
              Clear Wish List
            </button>
            <button
              className="primaryBttn w-full md:w-fit"
              onClick={() => {
                dispatch(
                  cartActions.addAllProducts(
                    wishListItems.map((product) => ({
                      ...product,
                      actualPrice: product?.discountPercentage
                        ? getDiscountedPrice(
                            product?.actualPrice,
                            product?.discountPercentage
                          )
                        : product?.actualPrice,
                      productQuantity: 1,
                    }))
                  )
                );
                
                navigate("/cart");
              }}
            >
              Add All To Cart
            </button>
            <Link
              className="primaryBttn w-full md:w-fit text-center"
              to="/cart"
            >
              Go To Cart
            </Link>
          </div>
        </div>
      ) : (
        <Disclaimer text="You have no items in your wish list." />
      )}
    </>
  );
};

export default WishList;
