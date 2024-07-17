import React, { useState } from "react";
import { LabelText } from "../../../../../components/General/Input";
import { useSelector } from "react-redux";

const SlctSubCtgry = ({
  dispatch,
  pCtgry,
  pCtgryErr,
  pSbCtgry,
  pSbCtgryErr,
}) => {
  const categories = useSelector((state) => state.admin.categorys);

  const handleCategoryChange = (e) => {
    dispatch({ type: "pCtgryVal", payload: e.target.value });
  };

  const handleSubcategoryChange = (e) => {
    dispatch({ type: "pSbCtgryVal", payload: e.target.value });
  };

  return (
    <div className="space-y-5">
      <div>
        <LabelText
          htmlFor="pCtgry"
          text="Select a Category"
          error={pCtgryErr}
        />
        <select
          id="pCtgry"
          className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
            pCtgryErr && "text-red-600 placeholder:text-red-600 border-red-600"
          }`}
          value={pCtgry}
          onChange={handleCategoryChange}
          onClick={() =>
            pCtgryErr && dispatch({ type: "pCtgryErr", payload: "" })
          }
        >
          <option value="">Select a category</option>
          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      {pCtgry && (
        <div className="">
          <LabelText
            htmlFor="pSbCtgry"
            text="Select a Subcategory"
            error={pSbCtgryErr}
          />
          <select
            id="pSbCtgry"
            className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
              pSbCtgryErr &&
              "text-red-600 placeholder:text-red-600 border-red-600"
            }`}
            value={pSbCtgry}
            onClick={() =>
              pSbCtgryErr && dispatch({ type: "pSbCtgryErr", payload: "" })
            }
            onChange={handleSubcategoryChange}
          >
            <option value="">Select a subcategory</option>
            {categories
              .find((category) => category._id === pCtgry)
              ?.subCategorys?.map((subcategory, index) => (
                <option key={index} value={subcategory._id}>
                  {subcategory.name}
                </option>
              ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SlctSubCtgry;
