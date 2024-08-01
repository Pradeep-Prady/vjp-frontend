// import React from "react";
// import productImg from "../../../../../assets/product1.jpg";
// import { Link } from "react-router-dom";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useMutation, useQueryClient } from "react-query";
// import { axiosInstance } from "../../../../../services/axios";

// const AdminProductItem = ({ product, category }) => {
//   const queryClient = useQueryClient();
//   const { mutate: deleteProduct } = useMutation(
//     (id) => axiosInstance.delete(`item/delete/${id}`),
//     {
//       onSuccess: () => queryClient.invalidateQueries(["getProducts"]),
//       onError: (err) => console.log(err),
//     }
//   );

//   const deleteHandler = (id) => {
//     if (window.confirm("Are you sure you want delete this product?")) {
//       deleteProduct(id);
      
//     }
//   };
//   return (
//     <li className="w-[24%] mb-6 border">
//       <div className="relative cursor-pointer group/card">
//         <img
//           src={product?.images ? product?.images[0] : productImg}
//           alt=""
//           loading="lazy"
//           className=" object-cover object-center h-64 w-full"
//         />
//       </div>
//       <div className="p-2">
//         <Link
//           to={`/admin/products/${product?._id}`}
//           className="text-[15px] font-medium text-ternary hover:text-pink-500
//                   transition-all ease-linear cursor-pointer"
//         >
//           {product?.itemTitle ? product?.itemTitle : "Product Name"}
//         </Link>
//         <p className="text-[13px] font-medium">
//           ₹ {`${product?.actualPrice ? product?.actualPrice : 0}.00`}
//         </p>
//         <div className="flex gap-2 mt-1">
//           <Link
//             to={`/admin/products/${product?._id}`}
//             className="w-1/2 rounded bg-green-200 flex justify-center p-2
//         hover:bg-green-300 transition-all ease-linear"
//           >
//             <FaEdit className="text-green-800 scale-125" />
//           </Link>
//           <button
//             className="w-1/2 rounded bg-red-200 flex justify-center p-2
//         hover:bg-red-300 transition-all ease-linear"
//             onClick={() => deleteHandler(product?._id)}
//           >
//             <MdDelete className="text-red-500 scale-125" />
//           </button>
//         </div>
//       </div>
//     </li>
//   );
// };

// export default AdminProductItem;


import React from "react";
import productImg from "../../../../../assets/product1.jpg";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../../../../services/axios";

const AdminProductItem = ({ product }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct } = useMutation(
    (id) => axiosInstance.delete(`item/delete/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getProducts");
      },
      onError: (err) => console.log(err),
    }
  );

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
  };

  return (
    <li className="w-[24%] mb-6 border">
      <div className="relative cursor-pointer group/card">
        <img
          src={product?.images ? product?.images[0] : productImg}
          alt=""
          loading="lazy"
          className="object-cover object-center h-64 w-full"
        />
      </div>
      <div className="p-2">
        <Link
          to={`/admin/products/${product?._id}`}
          className="text-[15px] font-medium text-ternary hover:text-pink-500
                  transition-all ease-linear cursor-pointer"
        >
          {product?.itemTitle ? product?.itemTitle : "Product Name"}
        </Link>
        <p className="text-[13px] font-medium">
          ₹ {`${product?.actualPrice ? product?.actualPrice : 0}.00`}
        </p>
        <div className="flex gap-2 mt-1">
          <Link
            to={`/admin/products/${product?._id}`}
            className="w-1/2 rounded bg-green-200 flex justify-center p-2
        hover:bg-green-300 transition-all ease-linear"
          >
            <FaEdit className="text-green-800 scale-125" />
          </Link>
          <button
            className="w-1/2 rounded bg-red-200 flex justify-center p-2
        hover:bg-red-300 transition-all ease-linear"
            onClick={() => deleteHandler(product?._id)}
          >
            <MdDelete className="text-red-500 scale-125" />
          </button>
        </div>
      </div>
    </li>
  );
};

export default AdminProductItem;
