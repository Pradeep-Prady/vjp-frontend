import React, { useReducer, useState } from "react";
import CategoryForm from "../pages/Categories/components/CategoryForm";
import Breadcrumbs from "../../../components/General/UI/Breadcrumbs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../../../services/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryEvents } from "../../../hooks/useQueryWithCallbacks";
import { toast } from "react-toastify";
import { adminActions } from "../../../store/adminSlice";

const EditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const fetchData = async () => {
    const response = await axiosInstance.get("/categories");
    dispatch(adminActions.addCategories(response.data.data));
  };

  const { mutate: updateCategory } = useMutation(
    (data) => axiosInstance.put(`/category/update/${categoryId}`, data),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        queryClient.invalidateQueries(["categoryById"]);
        fetchData();

        navigate("/admin/category");
      },
      onError: (error) => console.log(error),
    }
  );

  const updateFormDataHandler = (data) => {
    // console.log(data);
    updateCategory(data);
  };
  return (
    <div>
      <Breadcrumbs
        group="admin"
        currentPage={[
          { text: "Category", URL: ".." },
          { text: "Edit Category" },
          { text: "Category ID" },
        ]}
      />
      <CategoryForm getFormData={updateFormDataHandler} type="EDIT" />
    </div>
  );
};

export default EditCategory;
