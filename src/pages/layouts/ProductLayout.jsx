// // import { NavLink, Outlet, useParams } from "react-router-dom";
// // import { categoryItems } from "../../data/productData";
// // import { useState } from "react";
// // import { FaPlus, FaMinus } from "react-icons/fa";
// // import { useSelector } from "react-redux";

// // const ProductLayout = () => {

// //   const [isCtgryMenuOpen, setIsCtgryMenuOpen] = useState(false);
// //   const { category } = useParams();
// //   const categories = useSelector((state) => state.product.products);
// //   // console.log(categories);

// //   return (
// //     <section className=" bg-white text-gray-500 ">
// //       {/* IN WEB VIEW */}
// //       <ul className="hidden lg:flex justify-center iFtems-center gap-6 border-b py-3 text-[15px]">
// //         {categories?.map(({ _id, category, title }) => (
// //           <li key={_id}>
// //             <NavLink
// //               to={`/products/${category?.trim()}`}
// //               className={({ isActive }) =>
// //                 isActive
// //                   ? "text-primary"
// //                   : "text-gray-500 hover:text-primary transition-all"
// //               }
// //             >
// //               {title}
// //             </NavLink>
// //           </li>
// //         ))}
// //       </ul>
// //       {/* IN MOBILE VIEW */}
// //       <ul className="lg:hidden flex flex-col justify-center items-center gap-6 border-b  p-3 text-[15px]">
// //         <button
// //           className={`w-full p-2 flex items-center justify-between rounded hover:bg-gray-100 ${
// //             isCtgryMenuOpen ? "bg-gray-100" : ""
// //           }`}
// //           onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
// //         >
// //           <h1 className="font-medium">
// //             {category?.split("-").join(" ").toUpperCase()}
// //           </h1>
// //           {isCtgryMenuOpen ? <FaMinus /> : <FaPlus />}
// //         </button>
// //         {isCtgryMenuOpen &&
// //           categories.map(({ _id, category, title }) => (
// //             <li key={_id}>
// //               <NavLink
// //                 to={`/products/${category?.trim()}`}
// //                 onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
// //                 className={({ isActive }) =>
// //                   isActive
// //                     ? "text-primary"
// //                     : "text-gray-500 hover:text-primary transition-all"
// //                 }
// //                 o
// //               >
// //                 {title}
// //               </NavLink>
// //             </li>
// //           ))}
// //       </ul>
// //       <div className="w-full">
// //         <Outlet />
// //       </div>
// //     </section>
// //   );
// // };

// // export default ProductLayout;

// import { NavLink, Outlet, useParams } from "react-router-dom";
// import { categoryItems } from "../../data/productData";
// import { useState } from "react";
// import { FaPlus, FaMinus } from "react-icons/fa";
// import { useSelector } from "react-redux";
// import { useQuery } from "react-query";
// import { useQueryEvents } from "../../hooks/useQueryWithCallbacks";
// import { axiosInstance } from "../../services/axios";

// const ProductLayout = () => {

//   const [isCtgryMenuOpen, setIsCtgryMenuOpen] = useState(false);
//   const { category } = useParams();
//   const categories = useSelector((state) => state.product.categories);
//   // console.log(categories);

//   useQueryEvents(
//     useQuery(["getCategory"], () => axiosInstance.get(`/category/${category}`)),
//     {
//       onSuccess: (res) => {
//         // dispatch(productActions.addProducts(res.data.data));
//         console.log(res.data.data, "category");

//         // dispatch(productActions.addCategories(res.data.data));
//       },

//       onError: (err) => console.log("An error happened:", err.message),
//     }
//   );

//   return (
//     <section className=" bg-white text-gray-500 ">
//       {/* IN WEB VIEW */}
//       <ul className="hidden lg:flex justify-center iFtems-center gap-6 border-b py-3 text-[15px]">
//         {categories?.map(({ _id, category, title }) => (
//           <li key={_id}>
//             <NavLink
//               to={`/products/${category?.trim()}`}
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-primary"
//                   : "text-gray-500 hover:text-primary transition-all"
//               }
//             >
//               {title}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//       {/* IN MOBILE VIEW */}
//       <ul className="lg:hidden flex flex-col justify-center items-center gap-6 border-b  p-3 text-[15px]">
//         <button
//           className={`w-full p-2 flex items-center justify-between rounded hover:bg-gray-100 ${
//             isCtgryMenuOpen ? "bg-gray-100" : ""
//           }`}
//           onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
//         >
//           <h1 className="font-medium">
//             {category?.split("-").join(" ").toUpperCase()}
//           </h1>
//           {isCtgryMenuOpen ? <FaMinus /> : <FaPlus />}
//         </button>
//         {isCtgryMenuOpen &&
//           categories.map(({ _id, category, title }) => (
//             <li key={_id}>
//               <NavLink
//                 to={`/products/${category?.trim()}`}
//                 onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary"
//                     : "text-gray-500 hover:text-primary transition-all"
//                 }
//                 o
//               >
//                 {title}
//               </NavLink>
//             </li>
//           ))}
//       </ul>
//       <div className="w-full">
//         <Outlet />
//       </div>
//     </section>
//   );
// };

// export default ProductLayout;

// import { NavLink, Outlet, useParams } from "react-router-dom";
// import { categoryItems } from "../../data/productData";
// import { useState } from "react";
// import { FaPlus, FaMinus } from "react-icons/fa";
// import { useSelector } from "react-redux";

// const ProductLayout = () => {

//   const [isCtgryMenuOpen, setIsCtgryMenuOpen] = useState(false);
//   const { category } = useParams();
//   const categories = useSelector((state) => state.product.products);
//   // console.log(categories);

//   return (
//     <section className=" bg-white text-gray-500 ">
//       {/* IN WEB VIEW */}
//       <ul className="hidden lg:flex justify-center iFtems-center gap-6 border-b py-3 text-[15px]">
//         {categories?.map(({ _id, category, title }) => (
//           <li key={_id}>
//             <NavLink
//               to={`/products/${category?.trim()}`}
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-primary"
//                   : "text-gray-500 hover:text-primary transition-all"
//               }
//             >
//               {title}
//             </NavLink>
//           </li>
//         ))}
//       </ul>
//       {/* IN MOBILE VIEW */}
//       <ul className="lg:hidden flex flex-col justify-center items-center gap-6 border-b  p-3 text-[15px]">
//         <button
//           className={`w-full p-2 flex items-center justify-between rounded hover:bg-gray-100 ${
//             isCtgryMenuOpen ? "bg-gray-100" : ""
//           }`}
//           onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
//         >
//           <h1 className="font-medium">
//             {category?.split("-").join(" ").toUpperCase()}
//           </h1>
//           {isCtgryMenuOpen ? <FaMinus /> : <FaPlus />}
//         </button>
//         {isCtgryMenuOpen &&
//           categories.map(({ _id, category, title }) => (
//             <li key={_id}>
//               <NavLink
//                 to={`/products/${category?.trim()}`}
//                 onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-primary"
//                     : "text-gray-500 hover:text-primary transition-all"
//                 }
//                 o
//               >
//                 {title}
//               </NavLink>
//             </li>
//           ))}
//       </ul>
//       <div className="w-full">
//         <Outlet />
//       </div>
//     </section>
//   );
// };

// export default ProductLayout;

import { NavLink, Outlet, useParams } from "react-router-dom";
import { categoryItems } from "../../data/productData";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { useQueryEvents } from "../../hooks/useQueryWithCallbacks";
import { axiosInstance } from "../../services/axios";

const ProductLayout = () => {
  const [isCtgryMenuOpen, setIsCtgryMenuOpen] = useState(false);
  const { category } = useParams();
  const categories = useSelector((state) => state.product.categories);
  // console.log(categories);

  return (
    <section className=" bg-white text-gray-500 ">
      {/* IN WEB VIEW */}
      <ul className="hidden lg:flex justify-center iFtems-center gap-6 border-b py-3 text-[15px]">
        {categories?.map(({ _id, category, title }) => (
          <li key={_id}>
            <NavLink
              to={`/products/${category?.trim()}`}
              className={({ isActive }) =>
                isActive
                  ? "text-primary"
                  : "text-gray-500 hover:text-primary transition-all"
              }
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* IN MOBILE VIEW */}
      <ul className="lg:hidden flex flex-col justify-center items-center gap-6 border-b  p-3 text-[15px]">
        <button
          className={`w-full p-2 flex items-center justify-between rounded hover:bg-gray-100 ${
            isCtgryMenuOpen ? "bg-gray-100" : ""
          }`}
          onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
        >
          <h1 className="font-medium">
            {category?.split("-").join(" ").toUpperCase()}
          </h1>
          {isCtgryMenuOpen ? <FaMinus /> : <FaPlus />}
        </button>
        {isCtgryMenuOpen &&
          categories.map(({ _id, category, title }) => (
            <li key={_id}>
              <NavLink
                to={`/products/${category?.trim()}`}
                onClick={() => setIsCtgryMenuOpen((prevState) => !prevState)}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary"
                    : "text-gray-500 hover:text-primary transition-all"
                }
                o
              >
                {title}
              </NavLink>
            </li>
          ))}
      </ul>
      <div className="w-full">
        <Outlet />
      </div>
    </section>
  );
};

export default ProductLayout;
