import Input, { LabelText } from "./Input";
import {
  CountrySelect,
  StateSelect,
} from "../../pages/Checkout/data/checkoutData";

export const UserInformationForm = ({
  className,
  role,
  userInfo,
  dispatch,
  saveHandler,
}) => {
  return (
    <form action="" className={`border p-6 space-y-4 pb-11 ${className}`}>
      {/* Personal Information */}
      <div className="space-y-5">
        <h1 className="text-xl font-semibold text-lblack pb-3">
          Personal Information
        </h1>
        <div>
          <LabelText
            text="GST Number"
            htmlFor="gstNum"
            error={userInfo.gstNum.error}
          />
          <Input
          
            id="gstNum"
            dispatch={dispatch}
            value={userInfo.gstNum.value}
            isError={userInfo.gstNum.error}
          />
        </div>
        {/* First Name */}
        <div>
          <LabelText
            text="First Name"
            className="text-gray-600 text-[15px] pb-1"
            htmlFor="fName"
            error={userInfo.fName.error}
          />
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="fName"
            dispatch={dispatch}
            value={userInfo.fName.value}
            isError={userInfo.fName.error}
          />
        </div>
        {/* Last Name */}
        <div>
          <LabelText
            text="Last Name"
            className="text-gray-600 text-[15px] pb-1"
            htmlFor="lName"
            error={userInfo.lName.error}
          />
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="lName"
            dispatch={dispatch}
            value={userInfo.lName.value}
            isError={userInfo.lName.error}
          />
        </div>
        {/* Company */}
        <div>
          <LabelText
            text="Company"
            className="text-gray-600 text-[15px] pb-1"
            htmlFor="cmpny"
            isMandatory={false}
            error={userInfo.cmpny.error}
          />
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="cmpny"
            dispatch={dispatch}
            value={userInfo.cmpny.value}
            isError={userInfo.cmpny.error}
          />
        </div>
        {/* Phone Number */}
        <div>
          <LabelText
            text="Phone Number"
            className="text-gray-600 text-[15px] pb-1"
            htmlFor="phNum"
            error={userInfo.phNum.error}
          />
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="phNum"
            dispatch={dispatch}
            value={userInfo.phNum.value}
            isError={userInfo.phNum.error}
          />
        </div>
      </div>
      {/* Address */}
      <div className="space-y-5">
        <h1 className="text-xl  text-lblack pb-3">Address</h1>
        {/* Street Address */}
        <div>
          <LabelText
            text="Street Address"
            className="text-gray-600 text-[15px] pb-1"
            htmlFor="strtAddrss"
            error={userInfo.strtAddrss.error}
          />
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="strtAddrss"
            dispatch={dispatch}
            value={userInfo.strtAddrss.value}
            isError={userInfo.strtAddrss.error}
          />
        </div>
        {/* Country */}
        <div>
          <LabelText
            htmlFor="cntry"
            text="Country"
            className="text-gray-600 text-[15px] pb-1"
            error={userInfo.cntry.error}
          />
          <CountrySelect
            id="cntry"
            className="text-gray-600 text-sm pb-2 pt-2"
            dispatch={dispatch}
            isError={userInfo.cntry.error}
            value={userInfo.cntry.value}
          />
        </div>
        {/* State */}
        <div>
          <LabelText
            htmlFor="state"
            text="State"
            className="text-gray-600 text-[15px] pb-1"
            error={userInfo.state.error}
          />
          {/* <StateSelect
            id="state"
            className="text-gray-600 text-sm pb-2 pt-2"
            dispatch={dispatch}
            isError={userInfo.state.error}
            value={userInfo.state.value}
          /> */}
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="state"
            dispatch={dispatch}
            value={userInfo.state.value}
            isError={userInfo.state.error}
          />
        </div>
        {/* City */}
        <div>
          <LabelText
            text="City"
            className="text-gray-600 text-[15px] pb-1"
            htmlFor="city"
            error={userInfo.city.error}
          />
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="city"
            dispatch={dispatch}
            value={userInfo.city.value}
            isError={userInfo.city.error}
          />
        </div>
        {/* Zip/Postal Code */}
        <div>
          <LabelText
            text="Zip/Postal Code"
            className="text-gray-600 text-[15px] pb-1"
            htmlFor="zipCode"
            error={userInfo.zipCode.error}
          />
          <Input
            className="text-gray-600 text-sm pb-2 pt-2"
            id="zipCode"
            dispatch={dispatch}
            value={userInfo.zipCode.value}
            isError={userInfo.zipCode.error}
          />
        </div>
      </div>
      {saveHandler && (
        <button className="primaryBttn" onClick={saveHandler}>
          Save
        </button>
      )}
    </form>
  );
};
