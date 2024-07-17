import Banner from "../../components/General/Banner";
import product from "../../assets/product1.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./components/CartItem";
import { cartActions } from "../../store/cartSlice";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  console.log(cart);
  console.log(totalPrice);
  return (
    <section>
      <Banner text="Shopping Cart" />
      {cart.length > 0 ? (
        <div className="px-[10px] sml:px-4 py-10 sml:py-16">
          {/* CART */}
          <div>
            {/* CART TITLE */}
            <ul
              className="flex text-[15px] font-semibold justify-between items-center border-b pb-0 lg:pb-3 
              mb-0 lg:mb-3 bg-[#E6E6E6] lg:bg-transparent"
            >
              <li className="w-full p-2 lg:p-0 lg:w-[38%] ">ITEM</li>
              <li className="w-[15%] hidden lg:block">PRICE</li>
              <li className="w-[15%] hidden lg:block">QTY</li>
              <li className="w-[20%] hidden lg:block">SUBTOTAL</li>
            </ul>
            {/* CART ITEMS */}
            <ul className="text-gray-500 text-[15px] space-y-3 lg:space-y-0">
              {cart.map((product) => (
                <CartItem key={product.itemId} product={product} />
              ))}
            </ul>
            <div className="flex justify-between items-center py-8">
              <Link to="/" className="txt">
                Continue Shopping
              </Link>
              <button
                onClick={() => {
                  window.scrollTo(0, 0);
                  dispatch(cartActions.clearCart());
                }}
                className="txt"
              >
                Clear Shopping Cart
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 md:gap-0 justify-end">
            {/* Apply Discount */}
            {/* <div className="w-full md:w-fit space-y-2">
              <label htmlFor="discountCode" className="text-sm">
                Enter Discount Code
              </label>
              <div className="flex flex-wrap gap-4 md:gap-2 w-full">
                <input
                  id="discountCode"
                  type="text"
                  className="outline-none border w-full md:w-fit p-3 text-sm"
                  placeholder="Enter Discount Code"
                />
                <button className="bg-black text-white w-full md:w-fit p-3">
                  Apply Discount
                </button>
              </div>
            </div> */}
            <div className="w-full md:w-[35%] space-y-5">
              <div className="flex justify-between text-gray-500 text-sm">
                <h1>Sub Total</h1>
                <h3>₹{Number(totalPrice).toFixed(2)}</h3>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <h1>Tax</h1>
                <h3>₹{Number(0).toFixed(2)}</h3>
              </div>
              <div className="flex justify-between text-ternary text-lg font-semibold">
                <h1>ORDER TOTAL</h1>
                <h3>₹{Number(totalPrice).toFixed(2)}</h3>
              </div>
              <div className="flex justify-end">
                <Link
                  className="primeBttnWhOut"
                  to={isAuthenticated ? "/checkout" : "/account/sign-in"}
                  onClick={() => {
                    !isAuthenticated &&
                      toast.error("Please Login to proceed with checkout");
                  }}
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="text-sm text-gray-500 flex flex-col items-center
        gap-6 py-12 h-96"
        >
          <h1>You have no items in your shopping cart.</h1>
          <h6>
            Click{" "}
            <Link to="/" className="text-primary">
              here{" "}
            </Link>
            to continue shopping.
          </h6>
        </div>
      )}
    </section>
  );
};

export default Cart;
