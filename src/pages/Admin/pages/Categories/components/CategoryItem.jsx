import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../../services/axios";
import { toast } from "react-toastify";

const CategoryItem = ({ item: { _id: categoryId, title, subCategorys } }) => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteCategory } = useMutation(
    () => axiosInstance.delete(`/category/delete/${categoryId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["category"])
        toast.success("Category deleted Successfully!")
      },
      onError: (error) => console.log(error),
    }
  );

  return (
    <li className="rounded bg-[#F8F9FA] flex justify-between items-center p-2 border">
      <Link
        className="underline text-blue-800"
        to={`/admin/category/edit/${categoryId}`}
      >
        {categoryId ? categoryId : "Category ID"}
      </Link>
      <h1>{title ? title : "Category Name"}</h1>
      <h3>{`${subCategorys ? subCategorys.length : 0} Sub Categories`}</h3>
      <div className="flex gap-5">
        <Link
          to={`/admin/category/edit/${categoryId}`}
          className=" rounded bg-green-200 flex justify-center px-8 py-2
        hover:bg-green-300 transition-all ease-linear"
        >
          <FaEdit className="text-green-800 scale-125" />
        </Link>
        <button
          className=" rounded bg-red-200 flex justify-center px-8 py-2
        hover:bg-red-300 transition-all ease-linear"
          onClick={deleteCategory}
        >
          <MdDelete className="text-red-500 scale-125" />
        </button>
      </div>
    </li>
  );
};

export default CategoryItem;
