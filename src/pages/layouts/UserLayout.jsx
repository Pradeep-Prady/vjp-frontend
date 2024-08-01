import React, { useEffect } from "react";
import Banner from "../../components/General/Banner";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { userLayoutData } from "./layoutData";
import ProtectedRoute from "../../components/General/ProtectedRoute";
import { useMutation } from "react-query";
import { axiosInstance } from "../../services/axios";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/userSlice";

const UserLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];

  const { mutate: logOutUser } = useMutation(
    () => {
      axiosInstance.post("user/logout");
    },
    {
      onSuccess: () => {
        dispatch(userActions.logOutUser());
        toast.success("Logged Out Successfully");
      },
      onError: (err) => {
        toast.error(onlyText(err?.response.data.message));
      },
    }
  );

  return (
    <ProtectedRoute URL="/account/sign-in">
      <Banner
        text={lastSegment
          .split("-")
          .map((i) => i[0].toUpperCase() + i.slice(1))
          .join(" ")}
      />
      <div className="w-full flex justify-center">
        <div
          className="flex min-w-[1200px] max-w-[1300px]  flex-wrap-reverse lg:flex-nowrap px-3 lg:px-5 py-14 justify-between items-start relative
     gap-5 lg:gap-0"
        >
          <ul className="text-gray-500 border p-7 space-y-5 w-full lg:w-[20%] sticky top-10 ">
            {userLayoutData.map(({ id, path, text }) => (
              <li key={id}>
                <NavLink
                  to={`/customer${path}`}
                  className={({ isActive }) =>
                    `text-[15px] hover:text-primary transition-all ease-linear duration-300
                  
                  ${isActive && "text-primary cursor-text font-medium"}`
                  }
                >
                  {text}
                </NavLink>
              </li>
            ))}
            <li
              className="text-[15px] hover:text-primary transition-all ease-linear duration-300 cursor-pointer w-fit"
              onClick={logOutUser}
            >
              Logout
            </li>
          </ul>
          <div className="w-full lg:w-[78%]">
            <Outlet />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserLayout;

// Try to Upgrade to useQuery
// useEffect(() => {
//   const checkIfUserIsLoggedInOrNot = async () => {
//     try {
//       const res = await axiosInstance.get("/user/profile/me");
//       console.log(res.data);
//       if (res.data.data) {
//         dispatch(userActions.setUser(res.data.data));
//       }
//     } catch (error) {
//       console.log("An error happened:", error);
//     }
//   };
//   checkIfUserIsLoggedInOrNot();
// }, []);
