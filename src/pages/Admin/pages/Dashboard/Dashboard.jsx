import React from "react";
import { FaShoppingBag, FaList, FaUser } from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../../store/adminSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.admin.dashboard);
  console.log(dashboard);

  useQuery(["getDashboardData"], () => axiosInstance.get("/admin/dashboard"), {
    onSuccess: (res) => dispatch(adminActions.setDashboard(res.data.data)),
    onError: (err) => console.log(err),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="text-ternary space-y-4">
      <h1 className="text-3xl font-medium ">Dashboard</h1>
      <ul className="flex justify-between gap-4">
        {/* Orders */}
        <li className="flex items-center bg-white w-1/4 p-4 border gap-3">
          <div className="w-12 h-12 rounded-full bg-green-200 flex justify-center items-center">
            <BiSolidShoppingBags className="text-green-500 scale-125" />
          </div>
          <div className="text-[15px]">
            <h1 className="font-semibold">Total Orders</h1>
            <h6>{dashboard?.ordersCount ? dashboard?.ordersCount : "-"}</h6>
          </div>
        </li>
        {/* Category */}
        <li className="flex items-center bg-white w-1/4 p-4 border gap-3">
          <div className="w-12 h-12 rounded-full bg-pink-200 flex justify-center items-center">
            <FaList className="text-pink-500 scale-125" />
          </div>
          <div className="text-[15px]">
            <h1 className="font-semibold">Total Categorys</h1>
            <h6>
              {dashboard?.categoriesCount ? dashboard?.categoriesCount : "-"}
            </h6>
          </div>
        </li>
        {/* Product */}
        <li className="flex items-center bg-white w-1/4 p-4 border gap-3">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex justify-center items-center">
            <FaShoppingBag className="text-yellow-500 scale-125" />
          </div>
          <div className="text-[15px]">
            <h1 className="font-semibold">Total Products</h1>
            <h6>{dashboard?.itemsCount ? dashboard?.itemsCount : "-"}</h6>
          </div>
        </li>
        {/* User */}
        <li className="flex items-center bg-white w-1/4 p-4 border gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-200 flex justify-center items-center">
            <FaUser className="text-blue-500 scale-125" />
          </div>
          <div className="text-[15px]">
            <h1 className="font-semibold">Total Users</h1>
            <h6>{dashboard?.usersCount ? dashboard?.usersCount : "-"}</h6>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
