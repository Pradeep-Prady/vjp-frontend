// import React from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useMutation, useQueryClient } from "react-query";
// import { Link } from "react-router-dom";
// import { axiosInstance } from "../../../../../services/axios";
// import { toast } from "react-toastify";
// import { adminActions } from "../../../../../store/adminSlice";

// const CategoryItem = ({ setNewCategories, categories=[] }) => {
//   const queryClient = useQueryClient();

//   const fetchData = async () => {
//     const response = await axiosInstance.get("/categories");
//     setNewCategories(response.data.data);
//     dispatch(adminActions.addCategories(response.data.data));
//   };

//   const { mutateAsync: deleteCategory } = useMutation(
//     () => axiosInstance.delete(`/category/delete/${categoryId}`),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries(["category"]);
//         toast.success("Category deleted Successfully!");
//         fetchData();
//       },
//       onError: (error) => console.log(error),
//     }
//   );

//   return (
//     <>
//       {categories?.map((item, index) => (
//         <li key={index} className="rounded bg-[#F8F9FA] flex justify-between items-center p-2 border">
//           <Link
//             className="underline text-blue-800"
//             to={`/admin/category/edit/${item?.categoryId}`}
//           >
//             {item?.categoryId ? item?.categoryId : "Category ID"}
//           </Link>
//           <h1>{item?.title ? item?.title : "Category Name"}</h1>
//           <h3>{`${
//             item?.subCategorys ? item?.subCategorys.length : 0
//           } Sub Categories`}</h3>
//           <div className="flex gap-5">
//             <Link
//               to={`/admin/category/edit/${item?.categoryId}`}
//               className=" rounded bg-green-200 flex justify-center px-8 py-2
//    hover:bg-green-300 transition-all ease-linear"
//             >
//               <FaEdit className="text-green-800 scale-125" />
//             </Link>
//             <button
//               className=" rounded bg-red-200 flex justify-center px-8 py-2
//    hover:bg-red-300 transition-all ease-linear"
//               onClick={deleteCategory}
//             >
//               <MdDelete className="text-red-500 scale-125" />
//             </button>
//           </div>
//         </li>
//       ))}
//     </>
//   );
// };

// export default CategoryItem;

import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../../../services/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { adminActions } from "../../../../../store/adminSlice";

const CategoryItem = ({ categories = [] }) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutateAsync: deleteCategory } = useMutation(
    (categoryId) => axiosInstance.delete(`/category/delete/${categoryId}`),
    {
      onSuccess: (res, categoryId) => {
        toast.success("Category deleted successfully!");
        queryClient.invalidateQueries("categories");
      },
      onError: (error) => console.log(error),
    }
  );

  const handleDelete = (categoryId) => {
    deleteCategory(categoryId);
  };

  return (
    <>
      <table className="table-auto w-full text-sm">
        <thead>
          <tr>
            {/* <th className="px-4 py-2">Order ID</th> */}
            <th className="px-4 py-2 text-start">Category Name</th>
            <th className="px-4 py-2 text-start">Sub Categories Count</th>
            <th className="px-4 py-2 text-start">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => (
            <CategoryRow key={item.categoryId} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CategoryItem;

const CategoryRow = ({ item }) => {
  return (
    <>
      <tr className="rounded w-full bg-[#F8F9FA]   p-2 border"></tr>

      {/* <td className="py-3">
        <Link
          className="underline text-blue-800"
          to={`/admin/category/edit/${item._id}`}
        >
          {item._id}
        </Link>
      </td> */}

      <td className="py-3">
        <h1>{item.title}</h1>
      </td>

      <td>
        <h3>{`${
          item.subCategorys ? item.subCategorys.length : 0
        } Sub Categories`}</h3>
      </td>

      <td>
        <div className="flex gap-5">
          <Link
            to={`/admin/category/edit/${item._id}`}
            className="rounded bg-green-200 flex justify-center px-8 py-2 hover:bg-green-300 transition-all ease-linear"
          >
            <FaEdit className="text-green-800 scale-125" />
          </Link>
          <button
            className="rounded bg-red-200 flex justify-center px-8 py-2 hover:bg-red-300 transition-all ease-linear"
            onClick={() => handleDelete(item._id)}
          >
            <MdDelete className="text-red-500 scale-125" />
          </button>
        </div>
      </td>
    </>
  );
};
