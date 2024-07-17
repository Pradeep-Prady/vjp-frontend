import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/userSlice";

const ResetPassword = () => {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPswdVisible, setIsPswdVisible] = useState(false);
  const { token } = useParams();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

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

  const { mutate: resetPassword } = useMutation(
    (data) => axiosInstance.post(`user/password/reset/${token}`, data),
    {
      onSuccess: () => {
        navigate("/account/sign-in");
        isAuthenticated && dispatch(userActions.logOutUser());
        toast.success("Password reset successfully");
      },
      onError: (err) => toast.error(err?.response.data.message),
    }
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type={isPswdVisible ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div>
              <label
                for="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <input
                type={isPswdVisible ? "text" : "password"}
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required=""
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="showPassword"
                id="showPassword"
                checked={isPswdVisible}
                onChange={(e) => setIsPswdVisible(e.target.checked)}
              />
              <label
                htmlFor="showPassword"
                className=" text-sm -translate-y-[0.6px] cursor-pointer"
              >
                Show Password
              </label>
            </div>
            <button
              type="button"
              onClick={() => resetPassword({ password, confirmPassword })}
              className="w-full text-white bg-primary hover:bg-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset passwod
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
