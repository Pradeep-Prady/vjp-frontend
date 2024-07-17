import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminForm from "../Admin/components/AdminForm";
import AsideBar from "../Admin/components/AsideBar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { adminActions } from "../../store/adminSlice";
import { useMutation, useQuery } from "react-query";
import { axiosInstance } from "../../services/axios";
import useQueryWithCallbacks, {
  useQueryEvents,
} from "../../hooks/useQueryWithCallbacks";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const [isAsideOpen, setIsAsideOpen] = useState(true);
  const isAdminAuthenticated = useSelector(
    (state) => state.admin.isAuthenticated
  );

  // Get Categories Data
  useQueryEvents(
    useQuery(["category"], () => axiosInstance.get("/categories")),
    {
      onSuccess: (res) => dispatch(adminActions.addCategories(res.data.data)),
      onError: (err) => console.log("An error happened:", err.message),
    }
  );

  // Get Products Data
  useQueryEvents(
    useQuery(["getProducts"], () => axiosInstance.get("/items")),
    {
      onSuccess: (res) =>
        dispatch(adminActions.addProducts(res.data.data.items)),
      onError: (err) => console.log("An error happened:", err.message),
    }
  );

  // Check If Admin is Logged In Or Not
  useEffect(() => {
    const checkIfAdminIsLoggedInOrNot = async () => {
      try {
        const res = await axiosInstance.get("/admin/me");
        if (res.data.data) {
          dispatch(adminActions.loginAdmin());
        }
      } catch (error) {
        console.log("An error happened:", error);
      }
    };
    checkIfAdminIsLoggedInOrNot();
  }, []);

  // Log Out Handler
  const { mutate: logOutHandler } = useMutation(
    (data) => axiosInstance.get("/admin/logout", data),
    {
      onSuccess: (res) => {
        console.log(res.data);
        dispatch(adminActions.logOutAdmin());
      },
    }
  );

  return (
    <div>
      <div className="h-screen w-full flex justify-center items-center lgl:hidden">
        <p className="hidden sm:block text-center text-gray-600 p-8">
          This admin interface is optimized for desktop use. For the best
          experience, please access it on a desktop or laptop device.
        </p>
      </div>
      <ScrollRestoration />
      {isAdminAuthenticated ? (
        <div className="hidden lgl:flex centerContainer">
          <AsideBar isOpen={isAsideOpen} setIsOpen={setIsAsideOpen} />
          <div
            className={` bg-[#F8F9FA] ${isAsideOpen ? "w-[81%]" : "w-[95%]"}`}
          >
            <div className="bg-white border-b p-4 flex">
              <button
                className="bg-black text-white px-5 py-2 ml-auto"
                onClick={logOutHandler}
              >
                Logout
              </button>
            </div>
            <div className="p-8">
              <Outlet />
            </div>
          </div>
        </div>
      ) : (
        <AdminForm />
      )}
    </div>
  );
};

export default AdminLayout;

// Traditional Way :
// const { data, isSuccess } = useQuery("category", async () =>
//   axiosInstance.get("/categories")
// );

// Custom Hook for useQuery With CallBacks :
// useQueryWithCallbacks({
//   queryKey: ["category"],
//   queryFn: async () => axiosInstance.get("/categories"),
//   onError: (error) => console.error("An error occurred:", error),
//   onSuccess: (res) => console.log("Data fetched successfully:", res),
// });
