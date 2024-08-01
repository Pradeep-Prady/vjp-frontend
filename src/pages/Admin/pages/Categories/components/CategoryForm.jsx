import React, { useEffect, useReducer, useState } from "react";
import Input, { LabelText } from "../../../../../components/General/Input";
import { useQueryEvents } from "../../../../../hooks/useQueryWithCallbacks";
import { useQuery } from "react-query";
import { axiosInstance } from "../../../../../services/axios";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const initialState = {
  cName: { value: "", error: "" },
  cDesc: { value: "", error: "" },
  cTopCtgry: { value: false, error: "" },
};

const reducer = (prevState, action) => {
  // Category Name
  if (action.type === "cNameVal" || action.type === "cNameErr") {
    return action.type === "cNameVal"
      ? {
          ...prevState,
          cName: { ...prevState.cName, value: action.payload },
        }
      : {
          ...prevState,
          cName: { ...prevState.cName, error: action.payload },
        };
  }
  // Category Description
  if (action.type === "cDescVal" || action.type === "cDescErr") {
    return action.type === "cDescVal"
      ? {
          ...prevState,
          cDesc: { ...prevState.cDesc, value: action.payload },
        }
      : {
          ...prevState,
          cDesc: { ...prevState.cDesc, error: action.payload },
        };
  }
  // Is Top Category
  if (action.type === "cTopCtgryVal" || action.type === "cTopCtgryErr") {
    return action.type === "cTopCtgryVal"
      ? {
          ...prevState,
          cTopCtgry: { ...prevState.cTopCtgry, value: action.payload },
        }
      : {
          ...prevState,
          cTopCtgry: { ...prevState.cTopCtgry, error: action.payload },
        };
  }
  //   Set Initial State
  if (action.type === "INITIAL_VALUE") {
    return {
      ...initialState,
      cName: { value: action.payload.cName, error: "" },
      cDesc: { value: action.payload.cDesc, error: "" },
      cTopCtgry: { value: action.payload.cTopCtgry, error: "" },
    };
  }
  // Reset form to initial state
  if (action.type === "RESET") {
    return initialState;
  }
  // if no action match then return previous state
  return prevState;
};

const CategoryForm = ({ init, type = "ADD", getFormData }) => {
  const rdxDispatch = useDispatch();
  const { categoryId } = useParams();

  const [flag, setFlag] = useState(true);
  const [category, dispatch] = useReducer(reducer, initialState);

  useQueryEvents(
    useQuery(
      ["categoryById", categoryId], // Include categoryId in the query key array
      () => axiosInstance.get(`/category/${categoryId}`),
      {
        enabled: !!categoryId, // Enable the query only when categoryId is available
        refetchOnWindowFocus: false,
      }
    ),
    {
      onSuccess: (res) => {
        // console.log(categoryId);
        // console.log(res.data);
        if (flag) {
          dispatch({
            type: "INITIAL_VALUE",
            payload: {
              cName: res.data.data.title,
              cDesc: res.data.data.description,
              cTopCtgry: res.data.data.isTopCategory,
            },
          });
          setFlag(false);
        }
      },
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    type === "ADD" && dispatch({ type: "RESET" });
    const categoryBckEndFormat = {
      title: category.cName.value,
      description: category.cDesc.value,
      isTopCategory: category.cTopCtgry.value,
      category: category.cName.value.toLowerCase(),
    };
    getFormData(categoryBckEndFormat);
  };

  return (
    <form
      action=""
      className="bg-white p-5 border rounded space-y-5"
      onSubmit={submitHandler}
    >
      <h1 className="text-lg ">{`${
        type === "ADD" ? "Add" : "Edit"
      } Category`}</h1>

      {/* Category Name : input */}
      <div>
        <LabelText
          text="Category Name"
          htmlFor="cName"
          error={category.cName.error}
        />
        <Input
          id="cName"
          value={category.cName.value}
          isError={category.cName.error}
          dispatch={dispatch}
          placeholder="Eg: Laptop"
          className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
        />
      </div>

      {/* Category Description : input */}
      <div>
        <LabelText
          text="Category Description"
          htmlFor="cDesc"
          error={category.cDesc.error}
        />
        <textarea
          id="cDesc"
          name="cDesc"
          value={category.cDesc.value}
          placeholder="Eg: This is a Gaming Laptop"
          className={`border px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] h-40 focus:outline-dotted text-ternary w-full placeholder:text-gray-500
      ${
        category.cDesc.error &&
        "text-red-600 placeholder:text-red-600 border-red-600"
      }`}
          onChange={(e) => {
            category.cDesc.error && dispatch({ type: `cDescErr`, payload: "" });
            dispatch({ type: `cDescVal`, payload: e.target.value });
          }}
        />
        {category.cDesc.error && (
          <h1 className="text-red-600 p-2 animate-pulse">
            {category.cDesc.error}
          </h1>
        )}
      </div>

      {/* Is Top Category : CheckBox */}
      <div>
        <div className="flex items-baseline gap-3">
          <input
            type="checkbox"
            id="cTopCtgry"
            className="translate-y-[1.5px]"
            checked={category.cTopCtgry.value}
            onChange={(e) => {
              category.cTopCtgry.error &&
                dispatch({ type: `cTopCtgryErr`, payload: "" });
              dispatch({ type: `cTopCtgryVal`, payload: e.target.checked });
            }}
          />
          <LabelText
            text="Is This A Top Category?"
            htmlFor="cTopCtgry"
            isMandatory={false}
            className="cursor-pointer"
            error={category.cTopCtgry.error}
          />
        </div>
        {category.cTopCtgry.error && (
          <h1 className="text-red-600 p-2 animate-pulse">
            {category.cTopCtgry.error}
          </h1>
        )}
      </div>
      <button className="text-white bg-primary p-2 rounded">
        {`${type === "ADD" ? "Add" : "Update"} Category`}
      </button>
    </form>
  );
};

export default CategoryForm;

// Setting initial data from Parent
//   useEffect(() => {
//     // Setting data fetched from backend
//     if ((type = "EDIT" && JSON.stringify(init) !== "{}")) {
//       //   dispatch({ type: "INITIAL_VALUE", payload: init});
//       console.log(init);
//     }
//   }, [init]);

// USE EFFECT method to Fetch data from backend
// const getCategoryByID = async () => {
//   if (categoryId) {
//     const res = await axiosInstance.get(`/category/${categoryId}`);
//     console.log(res);
//     if (flag) {
//       dispatch({
//         type: "INITIAL_VALUE",
//         payload: {
//           cName: res.data.data.title,
//           cDesc: res.data.data.description,
//           cTopCtgry: res.data.data.isTopCategory,
//         },
//       });
//       setFlag(false);
//     }
//   }
// };
// useEffect(() => {
//   getCategoryByID();
// }, [categoryId]);
