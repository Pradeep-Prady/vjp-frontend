import React, { useEffect, useReducer, useState } from "react";
import { LabelText } from "../../../../components/General/Input";
import { useSelector } from "react-redux";
import SubCategoryItem from "./components/SubCategoryItem";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../../../services/axios";
import Disclaimer from "../../../../components/General/UI/Disclaimer";

const initialState = {
  aCtgry: { value: "", error: "" },
  aSbCtgry: { value: [], error: "" },
};

const reducer = (prevState, action) => {
  // Category
  if (action.type === "aCtgryVal" || action.type === "aCtgryErr") {
    return action.type === "aCtgryVal"
      ? { ...prevState, aCtgry: { ...prevState.aCtgry, value: action.payload } }
      : {
          ...prevState,
          aCtgry: { ...prevState.aCtgry, error: action.payload },
        };
  }
  //   Sub Category
  if (action.type === "aSbCtgryVal" || action.type === "aSbCtgryErr") {
    return action.type === "aSbCtgryVal"
      ? {
          ...prevState,
          aSbCtgry: { ...prevState.aSbCtgry, value: action.payload },
        }
      : {
          ...prevState,
          aSbCtgry: { ...prevState.aSbCtgry, error: action.payload },
        };
  }
  return prevState;
};

const SubCategory = () => {
  const [admin, dispatch] = useReducer(reducer, initialState);
  const categories = useSelector((state) => state.admin.categorys);

  const selectedCategory = admin.aCtgry.value;
  console.log(admin.aSbCtgry.value);

  useEffect(() => {
    const subCategories = categories.find(
      (category) => category._id === selectedCategory
    )?.subCategorys;

    if (selectedCategory) {
      dispatch({
        type: "aSbCtgryVal",
        payload: subCategories,
      });
    }
  }, [selectedCategory, categories]);

  return (
    <div className="text-ternary space-y-4">
      <h1 className="text-3xl font-medium ">Sub Category</h1>
      <div>
        <LabelText
          htmlFor="aCtgry"
          text="Select a Category"
          error={admin.aCtgry.error}
        />
        <select
          id="aCtgry"
          className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
            admin.aCtgry.error &&
            "text-red-600 placeholder:text-red-600 border-red-600"
          }`}
          value={admin.aCtgry.value}
          onChange={(e) =>
            dispatch({ type: "aCtgryVal", payload: e.target.value })
          }
          onClick={() =>
            admin.aCtgry.error && dispatch({ type: "aCtgryErr", payload: "" })
          }
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
        {admin.aCtgry.error && (
          <h1 className="text-red-600 p-2 animate-pulse">
            {admin.aCtgry.error}
          </h1>
        )}
      </div>
      
      {admin.aCtgry.value && (
        <div className="space-y-3 pt-3">
          <h1 className="text-lblack font-medium text-lg">Edit Subcategory</h1>
          {admin.aSbCtgry.value.length <= 0 ? (
            <h1>No subcategories at this moment &#128577;</h1>
          ) : (
            <ul className="space-y-4">
              {admin.aSbCtgry.value?.map((sbCtgry) => (
                <SubCategoryItem
                  key={sbCtgry._id}
                  sbCtgry={sbCtgry}
                  ctgryId={selectedCategory}
                  dispatch={dispatch}
                />
              ))}
            </ul>
          )}
        </div>
      )}

      {admin.aCtgry.value && (
        <CreateSubCategory
          ctgryId={admin.aCtgry.value}
          dispatch={dispatch}
          existingSubCategories={admin.aSbCtgry.value}
        />
      )}
    </div>
  );
};

export default SubCategory;

const CreateSubCategory = ({ ctgryId, existingSubCategories, dispatch }) => {
  const [category, setCategory] = useState("");

  const {
    mutate: createSubCategory,
    isLoading,
    isError,
    error,
    reset: resetError,
  } = useMutation(
    (data) => axiosInstance.put(`/category/${ctgryId}/create`, data),
    {
      onSuccess: (res) => {
        dispatch({
          type: "aSbCtgryVal",
          payload: [...existingSubCategories, res.data.data],
        });
        setCategory("");
      },

      onError: (error) => console.log(error),
    }
  );
  isError && console.log(error.response.data.message);

  return (
    <div className="space-y-3 pt-3">
      <label
        className="text-lblack font-medium text-lg block"
        htmlFor="crtSbctgry"
      >
        Create Subcategory
      </label>
      <div className="flex gap-5">
        <input
          id="crtSbctgry"
          name="crtSbctgry"
          type="text"
          className={`input bg-slate-400/5 py-2 ${isError && "text-red-500"}`}
          value={category}
          onChange={(e) => {
            isError && resetError();
            setCategory(e.target.value);
          }}
        />
        <button
          className={`primaryBttn ${isLoading && "cursor-not-allowed"}`}
          disabled={isLoading}
          onClick={() => createSubCategory({ name: category })}
        >
          {isLoading ? "Creating" : "Create"}
        </button>
      </div>
      {isError && (
        <Disclaimer
          bgClr="bg-red-500/40"
          txtClr="text-red-500"
          icnClr="text-red-500"
          text={error?.response.data.message.trim().replace(/"/g, "")}
          className="font-semibold"
        />
      )}
    </div>
  );
};
