import React from "react";

import CategoryForm from "./components/CategoryForm";
import CategoryItem from "./components/CategoryItem";
import { useMutation } from "react-query";
import { axiosInstance } from "../../../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../../store/adminSlice";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch();
  const categorys = useSelector((state) => state.admin.categorys);
  console.log(categorys);

  // Create Category
  const { mutateAsync: createCategory } = useMutation(
    (data) => axiosInstance.post("/category/create", data),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        dispatch(adminActions.addCategory(res.data.data));
      },
      onError: (error) => console.log(error),
    }
  );

  const addFormDataHandler = (data) => {
    console.log(data);
    createCategory(data);
  };

  return (
    <div className="text-ternary space-y-4">
      <h1 className="text-3xl font-medium ">Category</h1>
      <CategoryForm getFormData={addFormDataHandler} type="ADD" />
      <div className="bg-white p-5 border rounded space-y-4">
        <h1 className="text-lg">Edit Category</h1>
        <ul className="space-y-3">
          {categorys?.map((item, index) => (
            <CategoryItem key={item._id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;

// Example Initaial State from Parent
// const [initialState, setInitialState] = useState({
//   cName: { value: "", error: "" },
//   cDesc: { value: "", error: "" },
//   cTopCtgry: { value: false, error: "" },
// });
