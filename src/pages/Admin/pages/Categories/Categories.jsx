// import React, { useEffect, useState } from "react";

// import CategoryForm from "./components/CategoryForm";
// import CategoryItem from "./components/CategoryItem";
// import { useMutation } from "react-query";
// import { axiosInstance } from "../../../../services/axios";
// import { useDispatch, useSelector } from "react-redux";
// import { adminActions } from "../../../../store/adminSlice";
// import { toast } from "react-toastify";

// const Categories = () => {
//   const dispatch = useDispatch();
//   const categorys = useSelector((state) => state.admin.categorys);
//   // console.log(categorys);

//   const [categories, setCategories] = useState(categorys);

//   const setNewCategories = (data) => {
//     setCategories(data);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axiosInstance.get("/categories");
//       setCategories(response.data.data);
//       dispatch(adminActions.addCategories(response.data.data));
//     };
//     fetchData();
//   }, [dispatch]);

//   // Create Category
//   const { mutateAsync: createCategory } = useMutation(
//     (data) => axiosInstance.post("/category/create", data),
//     {
//       onSuccess: (res) => {
//         toast.success(res.data.message);
//         setCategories(res.data.data);

//         dispatch(adminActions.addCategory(res.data.data));
//       },
//       onError: (error) => console.log(error),
//     }
//   );

//   const addFormDataHandler = (data) => {
//     // console.log(data);
//     createCategory(data);
//   };

//   return (
//     <div className="text-ternary space-y-4">
//       <h1 className="text-3xl font-medium ">Category</h1>
//       <CategoryForm getFormData={addFormDataHandler} type="ADD" />
//       <div className="bg-white p-5 border rounded space-y-4">
//         <h1 className="text-lg">Edit Category</h1>
//         <ul className="space-y-3">
//           {/* {categories?.map((item, index) => ( */}
//           <CategoryItem
//             categories={categories}
//             setNewCategories={setNewCategories}
//           />
//           {/* ))} */}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Categories;

// // Example Initaial State from Parent
// // const [initialState, setInitialState] = useState({
// //   cName: { value: "", error: "" },
// //   cDesc: { value: "", error: "" },
// //   cTopCtgry: { value: false, error: "" },
// // });


import React, { useEffect, useState } from "react";
import CategoryForm from "./components/CategoryForm";
import CategoryItem from "./components/CategoryItem";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../../../../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../../../store/adminSlice";
import { toast } from "react-toastify";

const Categories = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { data: categories = [], refetch } = useQuery("categories", async () => {
    const response = await axiosInstance.get("/categories");
    dispatch(adminActions.addCategories(response.data.data));
    return response.data.data;
  });

  // Create Category
  const { mutateAsync: createCategory } = useMutation(
    (data) => axiosInstance.post("/category/create", data),
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        queryClient.invalidateQueries("categories");
      },
      onError: (error) => console.log(error),
    }
  );

  const addFormDataHandler = (data) => {
    createCategory(data);
  };

  return (
    <div className="text-ternary space-y-4">
      <h1 className="text-3xl font-medium">Category</h1>
      <CategoryForm getFormData={addFormDataHandler} type="ADD" />
      <div className="bg-white p-5 border rounded space-y-4">
        <h1 className="text-lg">Edit Category</h1>
        <ul className="space-y-3">
          <CategoryItem categories={categories} />
        </ul>
      </div>
    </div>
  );
};

export default Categories;
