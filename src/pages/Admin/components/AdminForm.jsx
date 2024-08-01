import React, { useEffect, useReducer } from "react";
import Input, { LabelText } from "../../../components/General/Input";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../store/adminSlice";

import { useMutation } from "react-query";
import axios from "axios";
import { axiosInstance } from "../../../services/axios";

const initialArg = {
  email: { value: "", error: "" },
  pswd: { value: "", error: "" },
};

const reducer = (prevState, action) => {
  // Email
  if (action.type === "emailVal" || action.type === "emailErr") {
    return action.type === "emailVal"
      ? {
          ...prevState,
          email: { ...prevState.email, value: action.payload },
        }
      : {
          ...prevState,
          email: { ...prevState.email, error: action.payload },
        };
  }
  // Password
  if (action.type === "pswdVal" || action.type === "pswdErr") {
    return action.type === "pswdVal"
      ? {
          ...prevState,
          pswd: { ...prevState.pswd, value: action.payload },
        }
      : {
          ...prevState,
          pswd: { ...prevState.pswd, error: action.payload },
        };
  }
};

const AdminForm = () => {
  const dispatch = useDispatch();

  const [admin, reducerDispatch] = useReducer(reducer, initialArg);

  const { mutateAsync: loginAdmin, isLoading } = useMutation(
    (data) => {
      return axiosInstance.post("/admin/login", data);
    },
    {
      onSuccess: (res) => {
        // console.log(res);
        // console.log(document.cookie);
        dispatch(adminActions.loginAdmin());
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  // useEffect(() => {
  //   if (isSuccess) {
  //     // console.log(adminData.data);
  //     // console.log(document.cookie);
  //     document.cookie = `at=${adminData.data.at}`;
  //     dispatch(adminActions.loginAdmin());
  //   }
  // }, [isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();
    const adminData = {
      username: admin.email.value,
      password: admin.pswd.value,
    };
    console.log(adminData);

    loginAdmin(adminData);
    // dispatch(adminActions.loginAdmin());
  };
  return (
    <div className="border flex justify-center items-center h-[100vh] bg-gradient-to-tr from-primary/30 to-[#ADD4F1]">
      <form
        action=""
        className="border-4 w-[33%] p-12 space-y-6 bg-white rounded-2xl"
        onSubmit={submitHandler}
      >
        <h1 className="text-2xl font-semibold text-gray-500">Admin Login</h1>
        <div className="flex flex-col gap-2 text-[15px]">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={admin.email.value}
            onChange={(e) =>
              reducerDispatch({ type: "emailVal", payload: e.target.value })
            }
            className="outline-none border rounded-md p-3 text-sm bg-[#F9FAFB]"
          />
        </div>
        <div className="flex flex-col gap-2 text-[15px]">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={admin.pswd.value}
            onChange={(e) =>
              reducerDispatch({ type: "pswdVal", payload: e.target.value })
            }
            className="outline-none border rounded-md p-3 text-sm bg-[#F9FAFB]"
          />
        </div>
        <button
          className={`bg-[#818CF8] text-white w-full p-2 rounded-lg
        hover:bg-[#727ff0] transition-all ease-linear ${
          isLoading && "cursor-not-allowed"
        }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminForm;
