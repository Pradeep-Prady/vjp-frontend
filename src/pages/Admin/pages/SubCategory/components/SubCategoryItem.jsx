import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaBullseye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../../../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../../../store/adminSlice";
import { useNavigate } from "react-router-dom";

const SubCategoryItem = ({ ctgryId, sbCtgry, dispatch, CategoriesData }) => {
  const queryClient = useQueryClient();

  const [value, setValue] = useState(sbCtgry.name);
  const [updateSbCtgry, setUpdateSbCtgry] = useState(false);
  const navigate = useNavigate();

  const categories = useSelector((state) => state.admin.categorys);

  // const dispatch = useDispatch();

  // const fetchData = async () => {
  //   const response = await axiosInstance.get("/categories");

  //   console.log(response.data.data, "fetchData");
  //   dispatch(adminActions.addCategories(response.data.data));
  // };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      const updatedCategories = response.data.data;
      CategoriesData(updatedCategories);
      dispatch(adminActions.addCategories(updatedCategories));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const { mutate: updateHandler } = useMutation(
    (data) =>
      axiosInstance.put(`category/${ctgryId}/${sbCtgry._id}/update`, data),
    {
      onSuccess: (res) => {
        setUpdateSbCtgry(false);
        fetchData();
      },
      onError: (error) => console.log(error),
    }
  );

  // const { mutate: deleteHandler, isSuccess } = useMutation(
  //   () => axiosInstance.delete(`category/${ctgryId}/${sbCtgry._id}/delete`),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["category"]);
  //       fetchData();
  //     },
  //     onError: (error) => console.log(error),
  //   }
  // );

  const { mutate: deleteHandler } = useMutation(
    () => axiosInstance.delete(`category/${ctgryId}/${sbCtgry._id}/delete`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["category"]); // Ensure this matches your query key
        fetchData(); // Refetch categories from backend and update Redux
      },
      onError: (error) => console.log(error),
    }
  );

  return (
    <li className={``}>
      <div className="bg-white flex justify-between items-center p-2 border rounded">
        <h1>{value}</h1>
        <div className="flex gap-5">
          <button
            className=" rounded bg-green-200 flex justify-center px-8 py-2
        hover:bg-green-300 transition-all ease-linear"
            onClick={() => setUpdateSbCtgry((prevState) => !prevState)}
          >
            <FaEdit className="text-green-800 scale-125" />
          </button>
          <button
            className=" rounded bg-red-200 flex justify-center px-8 py-2
        hover:bg-red-300 transition-all ease-linear"
            onClick={deleteHandler}
          >
            <MdDelete className="text-red-500 scale-125" />
          </button>
        </div>
      </div>
      {updateSbCtgry && (
        <div className="mt-2 flex justify-between gap-8 pr-2">
          <input
            type="text"
            className={`input bg-slate-400/5 py-2 ${
              !updateSbCtgry && "cursor-not-allowed"
            }`}
            value={value}
            disabled={!updateSbCtgry}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex gap-5">
            <button
              className="bg-green-200 text-green-800 px-5 rounded font-medium
              hover:bg-green-300 transition-all ease-linear"
              onClick={() => updateHandler({ name: value })}
            >
              Save
            </button>
            <button
              className="bg-red-200 text-red-800 px-5 rounded font-medium
              hover:bg-red-300 transition-all ease-linear"
              onClick={() => setUpdateSbCtgry(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default SubCategoryItem;
