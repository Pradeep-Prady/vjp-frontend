import React, { useReducer } from "react";
import Input, { LabelText } from "../../../components/General/Input";
import Banner from "../../../components/General/Banner";
import { LuAsterisk } from "react-icons/lu";
import { signInData } from "./data/signInData";
import { IoCheckmarkOutline } from "react-icons/io5";
import { Link, redirect, useNavigate } from "react-router-dom";
import { userActions } from "../../../store/userSlice";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../services/axios";
import { toast } from "react-toastify";
import { onlyText } from "../../../utils/helperFunction";

const initialValue = {
  isValid: { isError: "" },
  email: { value: "dineshbalansrinivasan@gmail.com", isError: "" },
  pswd: { value: "Balan@1582", isError: "" },
  showPswd: { value: false, isError: "" },
};

const reducer = (prevState, action) => {
  if (action.type === "formIsNotValid" || action.type === "formIsValid") {
    return {
      ...prevState,
      isValid: { ...prevState.isValid, isError: action.payload },
    };
  }
  // Email
  else if (action.type === "emailVal" || action.type === "emailErr") {
    return action.type === "emailVal"
      ? {
          ...prevState,
          email: { ...prevState.email, value: action.payload },
        }
      : {
          ...prevState,
          email: { ...prevState.email, isError: action.payload },
        };
  }
  // Password
  else if (action.type === "pswdVal" || action.type === "pswdErr") {
    return action.type === "pswdVal"
      ? {
          ...prevState,
          pswd: { ...prevState.pswd, value: action.payload },
        }
      : {
          ...prevState,
          pswd: { ...prevState.pswd, isError: action.payload },
        };
  }
  // Show Password
  else if (action.type === "showPswdVal" || action.type === "showPswdErr") {
    return action.type === "showPswdVal"
      ? {
          ...prevState,
          showPswd: {
            ...prevState.showPswd,
            value: !prevState.showPswd.value,
          },
        }
      : {
          ...prevState,
          showPswd: { ...prevState.showPswd, isError: action.payload },
        };
  }
  // Reset
  else if (action.type == "RESET") {
    return initialValue;
  }
  return prevState;
};

// Login Page
const SignIn = () => {
  const dispatchRedux = useDispatch();
  const navigate = useNavigate();
  const [signInForm, dispatch] = useReducer(reducer, initialValue);

  const { mutate: loginUser } = useMutation(
    (data) => axiosInstance.post("/user/login", data),
    {
      onSuccess: (res) => {
        console.log(res.data);
        toast.success(onlyText(res.data.message));
        dispatchRedux(userActions.loginUser());
        dispatchRedux(userActions.setUser(res.data.user));
        dispatchRedux(userActions.setWishList(res.data.user.wishList));
        navigate("/");
      },
      onError: (err) => {
        toast.error(onlyText(err?.response.data.message));
      },
    }
  );

  const signInFormHandler = () => {
    if (
      signInForm.email.value.trim().length === 0 &&
      signInForm.pswd.value.trim().length === 0
    ) {
      dispatch({ type: "emailErr", payload: "Please enter an Email Address!" });
      dispatch({ type: "pswdErr", payload: "Please enter a Password" });
    }
    // Email
    else if (
      signInForm.email.value.trim().length === 0 ||
      !signInForm.email.value.trim().includes("@")
    ) {
      dispatch({
        type: "emailErr",
        payload:
          signInForm.email.value.trim().length === 0
            ? "Please enter an Email Address!"
            : "Please enter a valid email address (Ex: johndoe@domain.com).",
      });
    }
    // Password
    else if (
      signInForm.pswd.value.trim().length === 0 ||
      signInForm.pswd.value.trim().length < 6
    ) {
      dispatch({
        type: "pswdErr",
        payload:
          signInForm.pswd.value.trim().length === 0
            ? "Please enter a Password"
            : "Password must be at least 6 characters.",
      });
    } else {
      console.log(signInForm);
      loginUser({
        email: signInForm.email.value.trim(),
        pswd: signInForm.pswd.value.trim(),
      });
      // navigate("/customer/account");
    }
  };

  return (
    <div className="min-h-screen">
      <Banner text="Customer Login" />
      <div className="py-14 flex flex-wrap justify-center gap-6 divide-x border">
        <div className="w-full lg:w-[36%] p-6 space-y-8 h-fit">
          <div className="space-y-5">
            <h1 className="text-lg font-semibold text-ternary">
              Registered Customers
            </h1>
            <h6 className="text-[15px] text-gray-500">
              If you have an account, sign in with your email address.
            </h6>
          </div>
          <form
            className="text-[15px] text-gray-500 space-y-5"
            onClick={() => {
              if (signInForm.email.isError && signInForm.pswd.isError) {
                dispatch({ type: "emailErr", payload: "" });
                dispatch({ type: "pswdErr", payload: "" });
              }
            }}
          >
            <div>
              <LabelText text="Email" htmlFor="email" />
              <Input
                id="email"
                dispatch={dispatch}
                value={signInForm.email.value}
                isError={signInForm.email.isError}
              />
            </div>
            <div>
              <LabelText text="Password" htmlFor="pswd" />
              <Input
                id="pswd"
                type={signInForm.showPswd.value ? "text" : "password"}
                dispatch={dispatch}
                value={signInForm.pswd.value}
                isError={signInForm.pswd.isError}
              />
            </div>
            <div className="fle items-center gap-2 w-fit">
              <input
                type="checkbox"
                name="shwPswd"
                id="shwPswd"
                checked={signInForm.showPswd.value}
                onClick={() => dispatch({ type: "showPswdVal" })}
              />
              <label htmlFor="shwPswd"> Show Password</label>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={signInFormHandler}
                className="bg-primary text-white rounded-full px-8 py-2 text-[15px] font-medium"
              >
                Sign In
              </button>
              <div className="flex justify-between items-center">
                <div className="flex text-red-500 items-center gap-1">
                  <LuAsterisk className="scale-90" />
                  <h6 className="text-sm">Required Fields</h6>
                </div>
                <Link
                  className="text-gray-500 transition-all ease-linear hover:text-primary
                cursor-pointer text-sm"
                  to="/password/reset"
                >
                  Forgot Your Password?
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="w-full lg:w-[36%] p-6 space-y-8 lg:pl-12">
          <div className="space-y-5">
            <h1 className="text-lg font-semibold text-ternary">
              Create an Account
            </h1>
            <h6 className="text-[15px] text-gray-500">
              Enter your email address and fill in the form on the next page and
              enjoy the benefits of having an account.
            </h6>
            <ul className="text-[15px] text-gray-500 space-y-2">
              {signInData.map(({ id, text }) => (
                <li key={id} className="flex items-center gap-3">
                  <IoCheckmarkOutline />
                  <h6>{text}</h6>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="bg-primary text-white rounded-full px-8 py-2 text-[15px] font-medium"
              onClick={() => navigate("/account/sign-up")}
            >
              Create An Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
