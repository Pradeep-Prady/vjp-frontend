import React, { useReducer } from "react";
import Banner from "../../../components/General/Banner";
import Input, { LabelText } from "../../../components/General/Input";
import { UserInformationForm } from "../../../components/General/UserInformationForm";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../services/axios";
import { toast } from "react-toastify";
import { onlyText } from "../../../utils/helperFunction";

const initialValue = {
  isValid: { error: "" },
  email: { value: "dineshbalansrinivasan@gmail.com", error: "" },
  pswd: { value: "Balan@1582", error: "" },
  confirmPswd: { value: "Balan@1582", error: "" },
  gstNum: { value: "abcd1582e9f6g7h", error: "" },

  fName: { value: "Dinesh", error: "" },
  lName: { value: "Balan", error: "" },
  cmpny: { value: "nextskill", error: "" },
  phNum: { value: "8610495955", error: "" },

  strtAddrss: { value: "SAP Theatre", error: "" },
  cntry: { value: "India", error: "" },
  state: { value: "Tamil Nadu", error: "" },
  city: { value: "Tiruppur", error: "" },
  zipCode: { value: "641603", error: "" },
};

const reducer = (prevState, action) => {
  if (action.type === "formIsNotValid" || action.type === "formIsValid") {
    return {
      ...prevState,
      isValid: { ...prevState.isValid, error: action.payload },
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
          email: { ...prevState.email, error: action.payload },
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
          pswd: { ...prevState.pswd, error: action.payload },
        };
  }
  // Repeat Password
  else if (
    action.type === "confirmPswdVal" ||
    action.type === "confirmPswdErr"
  ) {
    return action.type === "confirmPswdVal"
      ? {
          ...prevState,
          confirmPswd: { ...prevState.confirmPswd, value: action.payload },
        }
      : {
          ...prevState,
          confirmPswd: { ...prevState.confirmPswd, error: action.payload },
        };
  }
  // First Name
  else if (action.type === "fNameVal" || action.type === "fNameErr") {
    return action.type === "fNameVal"
      ? {
          ...prevState,
          fName: { ...prevState.fName, value: action.payload },
        }
      : {
          ...prevState,
          fName: { ...prevState.fName, error: action.payload },
        };
  } else if (action.type === "lNameVal" || action.type === "lNameErr") {
    return action.type === "lNameVal"
      ? {
          ...prevState,
          lName: { ...prevState.lName, value: action.payload },
        }
      : {
          ...prevState,
          lName: { ...prevState.lName, error: action.payload },
        };
  }
  // Company : Not Mandatory
  else if (action.type === "cmpnyVal" || action.type === "cmpnyErr") {
    return action.type === "cmpnyVal"
      ? {
          ...prevState,
          cmpny: { ...prevState.cmpny, value: action.payload },
        }
      : {
          ...prevState,
          cmpny: { ...prevState.cmpny, error: action.payload },
        };
  } else if (
    action.type === "strtAddrssVal" ||
    action.type === "strtAddrssErr"
  ) {
    return action.type === "strtAddrssVal"
      ? {
          ...prevState,
          strtAddrss: { ...prevState.strtAddrss, value: action.payload },
        }
      : {
          ...prevState,
          strtAddrss: { ...prevState.strtAddrss, error: action.payload },
        };
  } else if (action.type === "cntryVal" || action.type === "cntryErr") {
    return action.type === "cntryVal"
      ? {
          ...prevState,
          cntry: { ...prevState.cntry, value: action.payload },
        }
      : {
          ...prevState,
          cntry: { ...prevState.cntry, error: action.payload },
        };
  } else if (action.type === "stateVal" || action.type === "stateErr") {
    return action.type === "stateVal"
      ? {
          ...prevState,
          state: { ...prevState.state, value: action.payload },
        }
      : {
          ...prevState,
          state: { ...prevState.state, error: action.payload },
        };
  } else if (action.type === "cityVal" || action.type === "cityErr") {
    return action.type === "cityVal"
      ? {
          ...prevState,
          city: { ...prevState.city, value: action.payload },
        }
      : {
          ...prevState,
          city: { ...prevState.city, error: action.payload },
        };
  } else if (action.type === "zipCodeVal" || action.type === "zipCodeErr") {
    return action.type === "zipCodeVal"
      ? {
          ...prevState,
          zipCode: { ...prevState.zipCode, value: action.payload },
        }
      : {
          ...prevState,
          zipCode: { ...prevState.zipCode, error: action.payload },
        };
  } else if (action.type === "phNumVal" || action.type === "phNumErr") {
    return action.type === "phNumVal"
      ? {
          ...prevState,
          phNum: { ...prevState.phNum, value: action.payload },
        }
      : {
          ...prevState,
          phNum: { ...prevState.phNum, error: action.payload },
        };
  } else if (
    action.type === "additionalInfoVal" ||
    action.type === "additionalInfoErr"
  ) {
    return action.type === "additionalInfoVal"
      ? {
          ...prevState,
          additionalInfo: {
            ...prevState.additionalInfo,
            value: action.payload,
          },
        }
      : {
          ...prevState,
          additionalInfo: {
            ...prevState.additionalInfo,
            error: action.payload,
          },
        };
  } else if (
    action.type === "shippingMethodVal" ||
    action.type === "shippingMethodErr"
  ) {
    return action.type === "shippingMethodVal"
      ? {
          ...prevState,
          shippingMethod: {
            ...prevState.shippingMethod,
            value: action.payload,
          },
        }
      : {
          ...prevState,
          shippingMethod: {
            ...prevState.shippingMethod,
            error: action.payload,
          },
        };
  } else if (action.type == "RESET") {
    return initialValue;
  }
  return prevState;
};

// Register Page
const SignUp = () => {
  const [signUpForm, dispatch] = useReducer(reducer, initialValue);

  const { mutate: createUser } = useMutation(
    (data) =>
      axiosInstance.post("/verify", data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    {
      onSuccess: (res) => toast.success(onlyText(res.data.message)),
      onError: (err) => toast.error(onlyText(err?.response.data.message)),
    }
  );

  const signUpFormSubmitHandler = (event) => {
    event.preventDefault();

    const extractedData = {};

    for (const [key, value] of Object.entries(signUpForm)) {
      if (key !== "isValid" && key !== "confirmPswd") {
        extractedData[key] = value.value || "";
      }
    }

    console.log(extractedData);
    createUser(extractedData);
    //   if (
    //     form.fName.value.trim().length === 0 &&
    //     form.lName.value.trim().length === 0 &&
    //     form.email.value.trim().length === 0 &&
    //     form.pswd.value.trim().length === 0 &&
    //     form.confirmPswd.value.trim().length === 0
    //   ) {
    //     dispatch({
    //       type: "formIsNotValid",
    //       payload: "Please fill the form to proceed further",
    //     });
    //   }
    //   // First Name
    //   else if (
    //     form.fName.value.trim().length === 0 ||
    //     form.fName.value.trim().length < 5
    //   ) {
    //     form.fName.value.trim().length === 0
    //       ? dispatch({ type: "fnameErr", payload: "Enter a valid First Name!" })
    //       : dispatch({
    //           type: "fnameErr",
    //           payload: "FirstName length must be of greater than 4",
    //         });
    //   }
    //   // Last Name
    //   else if (form.lName.value.trim().length === 0) {
    //     dispatch({ type: "lnameErr", payload: "Enter a valid Last Name!" });
    //   }
    //   // Email
    //   else if (form.email.value.trim().length === 0) {
    //     dispatch({ type: "emailErr", payload: "Enter a valid Email Address!" });
    //   } else {
    //     console.log("CHECK OUT Form Submitted Successfully");
    //     console.log(form);
    //     dispatch({ type: "RESET" });
    //   }
  };

  return (
    <div>
      <Banner text="Create New Customer Account" />
      <div className="px-5 lg:px-0 py-14 flex flex-wrap justify-center gap-6">
        {/* <div className="border w-full lg:w-1/3 p-6 space-y-8 h-fit">
          <h1 className="text-xl font-semibold">Personal Information</h1>
          <form action="" className="text-[15px] text-gray-500 space-y-5">
            <div>
              <LabelText text="First Name" htmlFor="fName" />
              <Input
                id="fName"
                dispatch={dispatch}
                value={signUpForm.fName.value}
                isError={signUpForm.fName.isError}
              />
            </div>
            <div>
              <LabelText text="Last Name" htmlFor="lName" />
              <Input
                id="lName"
                dispatch={dispatch}
                value={signUpForm.lName.value}
              />
            </div>
            <div className="fle items-center gap-2">
              <input type="checkbox" name="newsLetter" id="newsLetter" />
              <label htmlFor="newsLetter"> Sign Up for Newsletter</label>
            </div>
            <div className="fle items-center gap-2">
              <input type="checkbox" name="rmtShpping" id="rmtShpping" />
              <label htmlFor="rmtShpping">
                {" "}
                Allow remote shopping assistance
              </label>
            </div>
          </form>
        </div> */}
        <UserInformationForm
          className="w-full lg:w-[35%]"
          role="CREATE"
          userInfo={signUpForm}
          dispatch={dispatch}
        />
        <div className="border w-full lg:w-[35%] p-6 space-y-8 h-fit sticky top-0">
          <h1 className="text-xl font-semibold">Sign-in Information</h1>
          <form action="" className="text-[15px] text-gray-500 space-y-5">
            
            <div>
              <LabelText
                text="Email"
                htmlFor="email"
                error={signUpForm.email.error}
              />
              <Input
                id="email"
                dispatch={dispatch}
                value={signUpForm.email.value}
                isError={signUpForm.email.error}
              />
            </div>
            <div>
              <LabelText
                text="Password"
                htmlFor="pswd"
                error={signUpForm.pswd.error}
              />
              <Input
                id="pswd"
                dispatch={dispatch}
                value={signUpForm.pswd.value}
                isError={signUpForm.pswd.error}
              />
            </div>
            <div>
              <LabelText
                text="Confirm Password"
                htmlFor="confirmPswd"
                error={signUpForm.confirmPswd.error}
              />
              <Input
                id="confirmPswd"
                dispatch={dispatch}
                value={signUpForm.confirmPswd.value}
                isError={signUpForm.confirmPswd.error}
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="shwPswd" id="shwPswd" />
              <label htmlFor="shwPswd" className="">
                Show Password
              </label>
            </div>
          </form>
          <button
            type="button"
            className="bg-primary text-white rounded-full px-8 py-2 text-[15px] font-medium"
            onClick={signUpFormSubmitHandler}
          >
            Create An Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
