import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Account = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="space-y-7">
      <div className="border p-7 space-y-4 pb-11">
        <h1 className="text-2xl font-bold text-lblack">Account Information</h1>
        <div className="flex flex-wrap gap-5 lg:gap-0">
          <div className="text-gray-500 text-[15px] space-y-1 w-full lg:w-1/2">
            <h1 className="text-lblack text-lg font-semibold mb-2">
              Contact Information
            </h1>
            <h5>
              <span className="capitalize">{user?.fName}</span>
              <span className="capitalize">{user?.lName}</span>
            </h5>
            <h5>{user?.email}</h5>
            <h5>+91 {user?.phNum}</h5>
            <Link className="txt" to="/customer/address-book">
              Edit
            </Link>
          </div>
          <div className="text-gray-500 text-[15px] space-y-1 w-1/2">
            <h1 className="text-lblack text-lg font-semibold mb-2">
              Newsletters
            </h1>
            <p>You aren't subscribed to our newsletter.</p>
            <button className="txt">Edit</button>
          </div>
        </div>
      </div>
      <div className="border p-7 space-y-4 pb-11">
        <h1 className="text-2xl font-bold text-lblack">Address Book </h1>
        <div className="flex flex-wrap gap-5 lg:gap-0">
          <div className="text-gray-500 text-[15px] space-y-1 w-full lg:w-1/2">
            <h1 className="text-lblack text-lg font-semibold mb-2">
              Default Billing Address
            </h1>
            <p>You have not set a default billing address.</p>
            <Link className="txt" to="/customer/address-book">
              Edit Address
            </Link>
          </div>
          <div className="text-gray-500 text-[15px] space-y-1 w-1/2">
            <h1 className="text-lblack text-lg font-semibold mb-2">
              Default Shipping Address
            </h1>
            <p>You have not set a default shipping address.</p>
            <Link className="txt" to="/customer/address-book">
              Edit Address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
