import React, { useEffect, useReducer } from "react";
import { UserInformationForm } from "../../components/General/UserInformationForm";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { axiosInstance } from "../../services/axios";
import { toast } from "react-toastify";
import { userActions } from "../../store/userSlice";

const DefaultAddress = ({ user }) => {
  return (
    <div className="border p-7 space-y-4 pb-11">
      <h1 className="text-2xl font-bold text-lblack">Default Addresses</h1>
      <div className="flex flex-wrap gap-5 lg:gap-0">
        {/* Default Billing Address */}
        <div className="text-gray-500 text-[15px] space-y-1 w-full lg:w-1/2">
          <h1 className="text-lblack text-lg font-semibold mb-2">
            Default Billing Address
          </h1>
          <h5>{`${user?.fName} ${user?.lName}`}</h5>
          <h5>{user?.strtAddrss}</h5>
          <h5>{`${user?.city}, ${user?.state}, ${user?.zipCode}`}</h5>
          <h5>{user?.zipCode}</h5>
          <button className="txt">Change Billing Address</button>
        </div>
        {/* Default Shipping Address */}
        <div className="text-gray-500 text-[15px] space-y-1 w-full lg:w-1/2">
          <h1 className="text-lblack text-lg font-semibold mb-2">
            Default Shipping Address
          </h1>
          <h5>{`${user?.fName} ${user?.lName}`}</h5>
          <h5>{user?.strtAddrss}</h5>
          <h5>{`${user?.city}, ${user?.state}, ${user?.zipCode}`}</h5>
          <h5>{user?.zipCode}</h5>
          <button className="txt">Change Shipping Address</button>
        </div>
      </div>
    </div>
  );
};

const initialValue = {
  isValid: { error: "" },
  gstNum: { value: "", error: "" },

  fName: { value: "", error: "" },
  lName: { value: "", error: "" },
  cmpny: { value: "", error: "" },
  phNum: { value: "", error: "" },

  strtAddrss: { value: "", error: "" },
  cntry: { value: "", error: "" },
  state: { value: "", error: "" },
  city: { value: "", error: "" },
  zipCode: { value: "", error: "" },
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
  } else if (action.type === "INIT") {
    return action.payload;
  } else if (action.type == "RESET") {
    return initialValue;
  }
  return prevState;
};

const AddressBook = () => {
  const rdxDispatch = useDispatch();
  const [userInfo, dispatch] = useReducer(reducer, initialValue);

  const user = useSelector((state) => state.user.user);

  const { mutate: updateUserInfo } = useMutation(
    (data) => axiosInstance.put(`user/update/${user._id}`, data),
    {
      onSuccess: (res) => {
        toast.success("User Info Updated Successfully");
        rdxDispatch(userActions.setUser(res.data.data));
      },
      onError: (err) => console.log(err),
    }
  );

  const saveHandler = () => {
    const updatedUserInfo = {
      gstNum: userInfo.gstNum.value,
      fName: userInfo.fName.value,
      lName: userInfo.lName.value,
      cmpny: userInfo.cmpny.value,
      phNum: userInfo.phNum.value,
      strtAddrss: userInfo.strtAddrss.value,
      cntry: userInfo.cntry.value,
      state: userInfo.state.value,
      city: userInfo.city.value,
      zipCode: userInfo.zipCode.value,
    };
    // console.log(updatedUserInfo);
    updateUserInfo(updatedUserInfo);
  };

  useEffect(() => {
    if (user) {
      const init = {
        ...initialValue,
        gstNum: { ...userInfo.gstNum, value: user.gstNum },
        fName: { ...userInfo.fName, value: user.fName },
        lName: { ...userInfo.lName, value: user.lName },
        cmpny: { ...userInfo.cmpny, value: user.cmpny },
        phNum: { ...userInfo.phNum, value: user.phNum },
        strtAddrss: { ...userInfo.strtAddrss, value: user.strtAddrss },
        cntry: { ...userInfo.cntry, value: user.cntry },
        state: { ...userInfo.state, value: user.state },
        city: { ...userInfo.city, value: user.city },
        zipCode: { ...userInfo.zipCode, value: user.zipCode },
      };
      dispatch({ type: "INIT", payload: init });
    }
  }, []);
  return (
    <div className="space-y-7">
      <DefaultAddress user={user} />
      <UserInformationForm userInfo={userInfo} dispatch={dispatch} />
      <button onClick={saveHandler} className="primaryBttn mx-2">
        Save
      </button>
    </div>
  );
};

export default AddressBook;
