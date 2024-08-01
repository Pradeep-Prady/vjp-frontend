// import React, { useEffect, useState } from "react";
// import { LabelText } from "../../../../../components/General/Input";
// import { useSelector } from "react-redux";

// const SlctSubCtgry = ({
//   dispatch,
//   pCtgry,
//   pCtgryErr,
//   pSbCtgry,
//   pSbCtgryErr,
// }) => {
//   const categories = useSelector((state) => state.admin.categorys);

//   const [categoriesData, setCategoriesData] = useState(categories);
//   const [subCategoryData, setSubCategoryData] = useState([]);

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   console.log(categories, "categories");
//   console.log(pSbCtgry, "pSbCtgry");
//   const handleCategoryChange = (e) => {
//     dispatch({ type: "pCtgryVal", payload: e.target.value });
//   };

//   const handleSubcategoryChange = (e) => {
//     dispatch({ type: "pSbCtgryVal", payload: e.target.value });
//   };

//   useEffect(() => {

//   }, []);
//   return (
//     <div className="space-y-5">
//       <div>
//         <LabelText
//           htmlFor="pCtgry"
//           text="Select a Category"
//           error={pCtgryErr}
//         />
//         <select
//           id="pCtgry"
//           className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
//             pCtgryErr && "text-red-600 placeholder:text-red-600 border-red-600"
//           }`}
//           value={pCtgry.title}
//           onChange={handleCategoryChange}
//           onClick={() =>
//             pCtgryErr && dispatch({ type: "pCtgryErr", payload: "" })
//           }
//         >
//           {/* <option value="">Select a category</option> */}
//           {categoriesData?.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.title}
//             </option>
//           ))}
//         </select>
//       </div>
//       {pCtgry && (
//         <div className="">
//           <LabelText
//             htmlFor="pSbCtgry"
//             text="Select a Subcategory"
//             error={pSbCtgryErr}
//           />
//           <select
//             id="pSbCtgry"
//             className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
//               pSbCtgryErr &&
//               "text-red-600 placeholder:text-red-600 border-red-600"
//             }`}
//             value={pSbCtgry.title}
//             onClick={() =>
//               pSbCtgryErr && dispatch({ type: "pSbCtgryErr", payload: "" })
//             }
//             onChange={handleSubcategoryChange}
//           >
//             {/* <option value="">Select a subcategory</option> */}
//             {categoriesData
//               .find((category) => category._id === pCtgry)
//               ?.subCategorys?.map((subcategory, index) => (
//                 <option key={index} value={subcategory._id}>
//                   {subcategory.name}
//                 </option>
//               ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SlctSubCtgry;


//  2

// import React, { useEffect, useState } from "react";
// import { LabelText } from "../../../../../components/General/Input";
// import { useSelector } from "react-redux";

// const SlctSubCtgry = ({
//   dispatch,
//   pCtgry,
//   pCtgryErr,
//   pSbCtgry,
//   pSbCtgryErr,
// }) => {
//   const categories = useSelector((state) => state.admin.categorys);

//   const [categoriesData, setCategoriesData] = useState(categories);
//   const [subCategoryData, setSubCategoryData] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   // Set categories data when categories from redux store change
//   useEffect(() => {
//     setCategoriesData(categories);
//   }, [categories]);

//   // Set the default selected category and subcategory
//   useEffect(() => {
//     if (pCtgry) {
//       const selectedCat = categories.find(
//         (category) => category._id === pCtgry
//       );
//       console.log(categories, "categories");
//       console.log(selectedCat, "selectedCat");
//       console.log(pCtgry, "pCtgry");
//       setSelectedCategory(selectedCat);
//       setSubCategoryData(selectedCat?.subCategorys || []);
//       if (pSbCtgry) {
//         setSelectedSubCategory(pSbCtgry);
//       }
//     } else {
//       setSelectedCategory(null);
//       setSubCategoryData([]);
//     }
//   }, [categories, pCtgry, pSbCtgry]);

//   // Update subcategories when selectedCategory changes
//   useEffect(() => {
//     if (selectedCategory) {
//       setSubCategoryData(selectedCategory.subCategorys || []);
//     } else {
//       setSubCategoryData([]);
//     }
//   }, [selectedCategory]);

//   const handleCategoryChange = (e) => {
//     const selectedCategoryId = e.target.value;
//     dispatch({ type: "pCtgryVal", payload: selectedCategoryId });
//     dispatch({ type: "pSbCtgryVal", payload: "" }); // Reset subcategory when category changes
//   };

//   const handleSubcategoryChange = (e) => {
//     dispatch({ type: "pSbCtgryVal", payload: e.target.value });
//   };

//   useEffect(() => {
//     categories.forEach((category) => {
//       if (category._id === pCtgry._id) {
//         setSelectedCategory(category);
//         category.subCategorys.forEach((subcategory) => {
//           if (subcategory._id === pSbCtgry._id) {
//             setSelectedSubCategory(subcategory);
//           }
//         });
//       }
//     });
//   }, [pCtgry._id]);
//   return (
//     <div className="space-y-5">
//       <div>
//         <LabelText
//           htmlFor="pCtgry"
//           text="Select a Category"
//           error={pCtgryErr}
//         />
//         <select
//           id="pCtgry"
//           className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
//             pCtgryErr && "text-red-600 placeholder:text-red-600 border-red-600"
//           }`}
//           value={selectedCategory?._id || ""}
//           onChange={handleCategoryChange}
//           onClick={() =>
//             pCtgryErr && dispatch({ type: "pCtgryErr", payload: "" })
//           }
//         >
//           <option value="">Select a category</option>
//           {categoriesData?.map((category) => (
//             <option key={category._id} value={category._id}>
//               {category.title}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedCategory && (
//         <div className="">
//           <LabelText
//             htmlFor="pSbCtgry"
//             text="Select a Subcategory"
//             error={pSbCtgryErr}
//           />
//           <select
//             id="pSbCtgry"
//             className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
//               pSbCtgryErr &&
//               "text-red-600 placeholder:text-red-600 border-red-600"
//             }`}
//             value={selectedSubCategory || ""}
//             onClick={() =>
//               pSbCtgryErr && dispatch({ type: "pSbCtgryErr", payload: "" })
//             }
//             onChange={handleSubcategoryChange}
//           >
//             <option value="">Select a subcategory</option>
//             {subCategoryData?.map((subcategory) => (
//               <option key={subcategory._id} value={subcategory._id}>
//                 {subcategory.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SlctSubCtgry;


import React, { useEffect, useState } from "react";
import { LabelText } from "../../../../../components/General/Input";
import { useSelector } from "react-redux";

const SlctSubCtgry = ({
  dispatch,
  pCtgry,
  pCtgryErr,
  pSbCtgry,
  pSbCtgryErr,
}) => {
  const categories = useSelector((state) => state.admin.categorys);

  const [categoriesData, setCategoriesData] = useState(categories);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Set categories data when categories from redux store change
  useEffect(() => {
    setCategoriesData(categories);
  }, [categories]);

  // Set the default selected category and subcategory
  useEffect(() => {
    if (pCtgry) {
      const selectedCat = categories.find((category) => category._id === pCtgry);
      setSelectedCategory(selectedCat);
      setSubCategoryData(selectedCat?.subCategorys || []);
      setSelectedSubCategory(pSbCtgry || "");
    } else {
      setSelectedCategory(null);
      setSubCategoryData([]);
      setSelectedSubCategory(null);
    }
  }, [categories, pCtgry, pSbCtgry]);

  // Update subcategories when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      setSubCategoryData(selectedCategory.subCategorys || []);
    } else {
      setSubCategoryData([]);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    dispatch({ type: "pCtgryVal", payload: selectedCategoryId });
    dispatch({ type: "pSbCtgryVal", payload: "" }); // Reset subcategory when category changes
  };

  const handleSubcategoryChange = (e) => {
    dispatch({ type: "pSbCtgryVal", payload: e.target.value });
  };

  return (
    <div className="space-y-5">
      <div>
        <LabelText htmlFor="pCtgry" text="Select a Category" error={pCtgryErr} />
        <select
          id="pCtgry"
          className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
            pCtgryErr && "text-red-600 placeholder:text-red-600 border-red-600"
          }`}
          value={selectedCategory?._id || ""}
          onChange={handleCategoryChange}
          onClick={() => pCtgryErr && dispatch({ type: "pCtgryErr", payload: "" })}
        >
          <option value="">Select a category</option>
          {categoriesData?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      {selectedCategory && (
        <div>
          <LabelText htmlFor="pSbCtgry" text="Select a Subcategory" error={pSbCtgryErr} />
          <select
            id="pSbCtgry"
            className={`border p-[7px] text-[15px] focus:outline-dotted focus:bg-[#F8F9FA] text-ternary w-full placeholder:text-gray-500 ${
              pSbCtgryErr && "text-red-600 placeholder:text-red-600 border-red-600"
            }`}
            value={selectedSubCategory || ""}
            onClick={() => pSbCtgryErr && dispatch({ type: "pSbCtgryErr", payload: "" })}
            onChange={handleSubcategoryChange}
          >
            <option value="">Select a subcategory</option>
            {subCategoryData?.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default SlctSubCtgry;
