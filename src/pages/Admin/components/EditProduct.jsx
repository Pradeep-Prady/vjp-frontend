// import React, { useEffect, useReducer } from "react";
// import Breadcrumbs from "../../../components/General/UI/Breadcrumbs";
// import Input, { LabelText } from "../../../components/General/Input";
// import ImageUploader from "../pages/AddProduct/components/ImageUploader";
// import SlctSubCtgry from "../pages/AddProduct/components/SlctSubCtgry";
// import HighlightsForm from "../pages/AddProduct/components/HighlightsForm";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useMutation, useQueryClient } from "react-query";
// import { axiosInstance } from "../../../services/axios";

// const initialState = {
//   pName: { value: "", error: "" },
//   pDesc: { value: "", error: "" },
//   pImg: { value: [], error: "" },
//   pCtgry: { value: "", error: "" },
//   pSbCtgry: { value: "", error: "" },
//   pTrend: { value: false, error: "" },
//   pSale: { value: false, error: "" },
//   pPrice: { value: null, error: "" },
//   pDiscPer: { value: null, error: "" },
//   pHighlts: {
//     value: {},
//     error: {
//       index: "",
//       type: "",
//     },
//   },
//   pStock: { value: null, error: "" },
// };
// const reducer = (prevState, action) => {
//   // Product Name
//   if (action.type === "pNameVal" || action.type === "pNameErr") {
//     return action.type === "pNameVal"
//       ? {
//           ...prevState,
//           pName: { ...prevState.pName, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pName: { ...prevState.pName, error: action.payload },
//         };
//   }
//   // Product Description
//   if (action.type === "pDescVal" || action.type === "pDescErr") {
//     return action.type === "pDescVal"
//       ? {
//           ...prevState,
//           pDesc: { ...prevState.pDesc, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pDesc: { ...prevState.pDesc, error: action.payload },
//         };
//   }
//   // Product Image
//   if (action.type === "pImgVal" || action.type === "pImgErr") {
//     return action.type === "pImgVal"
//       ? {
//           ...prevState,
//           pImg: { ...prevState.pImg, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pImg: { ...prevState.pImg, error: action.payload },
//         };
//   }
//   // Product Category
//   if (action.type === "pCtgryVal" || action.type === "pCtgryErr") {
//     return action.type === "pCtgryVal"
//       ? {
//           ...prevState,
//           pCtgry: { ...prevState.pCtgry, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pCtgry: { ...prevState.pCtgry, error: action.payload },
//         };
//   }
//   // Product Sub Category
//   if (action.type === "pSbCtgryVal" || action.type === "pSbCtgryErr") {
//     return action.type === "pSbCtgryVal"
//       ? {
//           ...prevState,
//           pSbCtgry: { ...prevState.pSbCtgry, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pSbCtgry: { ...prevState.pSbCtgry, error: action.payload },
//         };
//   }
//   // Is Trending
//   if (action.type === "pTrendVal" || action.type === "pTrendErr") {
//     return action.type === "pTrendVal"
//       ? {
//           ...prevState,
//           pTrend: { ...prevState.pTrend, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pTrend: { ...prevState.pTrend, error: action.payload },
//         };
//   }
//   // Is Sale
//   if (action.type === "pSaleVal" || action.type === "pSaleErr") {
//     return action.type === "pSaleVal"
//       ? {
//           ...prevState,
//           pSale: { ...prevState.pSale, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pSale: { ...prevState.pSale, error: action.payload },
//         };
//   }
//   // Price
//   if (action.type === "pPriceVal" || action.type === "pPriceErr") {
//     return action.type === "pPriceVal"
//       ? {
//           ...prevState,
//           pPrice: { ...prevState.pPrice, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pPrice: { ...prevState.pPrice, error: action.payload },
//         };
//   }
//   // Discount
//   if (action.type === "pDiscPerVal" || action.type === "pDiscPerErr") {
//     return action.type === "pDiscPerVal"
//       ? {
//           ...prevState,
//           pDiscPer: { ...prevState.pDiscPer, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pDiscPer: { ...prevState.pDiscPer, error: action.payload },
//         };
//   }
//   // Highlights
//   if (action.type === "pHighltsVal" || action.type === "pHighltsErr") {
//     return action.type === "pHighltsVal"
//       ? {
//           ...prevState,
//           pHighlts: { ...prevState.pHighlts, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pHighlts: { ...prevState.pHighlts, error: action.payload },
//         };
//   }
//   // Stock
//   if (action.type === "pStockVal" || action.type === "pStockErr") {
//     return action.type === "pStockVal"
//       ? {
//           ...prevState,
//           pStock: { ...prevState.pStock, value: action.payload },
//         }
//       : {
//           ...prevState,
//           pStock: { ...prevState.pStock, error: action.payload },
//         };
//   }
//   if (action.type === "INIT") {
//     return action.payload;
//   }
//   return prevState;
// };

// const EditProduct = () => {
//   const { productId } = useParams();
//   const queryClient = useQueryClient();

//   const [product, dispatch] = useReducer(reducer, initialState);
//   const adminProducts = useSelector((state) => state.admin.products);

//   const productDetails = adminProducts.find(
//     (product) => product._id === productId
//   );

//   console.log(adminProducts, "adminProducts");
//   console.log(productDetails, "productDetails");

//   const { mutate: updateProduct } = useMutation(
//     (data) =>
//       axiosInstance.put(`/item/update/${productId}`, data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }),
//     {
//       onSuccess: (res) => {
//         // console.log(res.data);
//         queryClient.invalidateQueries(["category"]);
//       },
//       onError: (error) => console.log(error),
//     }
//   );

//   // console.log(product, "product");
//   const submitHandler = (e) => {
//     e.preventDefault();
//     // console.log(product);
//     const formData = new FormData();
//     formData.append("itemTitle", product.pName.value);
//     formData.append("itemDescription", product.pDesc.value);
//     // formData.append("images", product.pImg.value);
//     formData.append("stock", product.pStock.value);
//     formData.append(
//       "subCategory",
//       product.pCtgry.value && product.pSbCtgry.value
//         ? `${product.pCtgry.value}/${product.pSbCtgry.value}`
//         : ""
//     );
//     formData.append("isSale", product.pSale.value);
//     formData.append("isTrending", product.pTrend.value);
//     formData.append("actualPrice", product.pPrice.value);
//     formData.append("discountPercentage", product.pDiscPer.value);
//     formData.append("highlights", JSON.stringify(product.pHighlts.value));

//     // Separate new files and existing URLs
//     const imageFiles = product.pImg.value.filter(
//       (image) => image instanceof File
//     );
//     const imageUrls = product.pImg.value.filter(
//       (image) => typeof image === "string"
//     );

//     imageUrls.forEach((url) => {
//       formData.append("existingImages", url);
//     });

//     imageFiles.forEach((file) => {
//       formData.append("newImages", file);
//     });

//     // console.log(productDetails);
//     // console.log(formData);
//     updateProduct(formData);
//     alert("Product Updated Successfully");
//   };

//   useEffect(() => {
//     const initialVal = {
//       pName: { value: productDetails?.itemTitle, error: "" },
//       pDesc: { value: productDetails?.itemDescription, error: "" },
//       pImg: { value: productDetails?.images, error: "" },
//       pCtgry: { value: productDetails?.category, error: "" },
//       pSbCtgry: { value: productDetails?.subCategoryId, error: "" },
//       pTrend: { value: productDetails?.isTrending, error: "" },
//       pSale: { value: productDetails?.isSale, error: "" },
//       pPrice: { value: productDetails?.actualPrice, error: "" },
//       pDiscPer: { value: productDetails?.discountPercentage, error: "" },
//       pHighlts: {
//         value:
//           productDetails?.highlights && JSON.parse(productDetails?.highlights),
//         error: {
//           index: "",
//           type: "",
//         },
//       },
//       pStock: { value: productDetails?.stock, error: "" },
//     };

//     dispatch({ type: "INIT", payload: initialVal });
//   }, [productDetails]);

//   // console.log(adminProducts);
//   // console.log(product);

//   return (
//     <div>
//       <Breadcrumbs
//         group="admin"
//         currentPage={[
//           { text: "Product", URL: ".." },
//           { text: `${productDetails?.itemTitle}` },
//         ]}
//         bldInPdng={false}
//       />
//       <div className="text-ternary space-y-4 w-full">
//         <h1 className="text-3xl font-medium ">Update Product</h1>
//         <form
//           action=""
//           className="bg-white p-5 border rounded space-y-5"
//           onSubmit={submitHandler}
//         >
//           {/* Product Title : input */}
//           <div>
//             <LabelText
//               text="Product Name"
//               htmlFor="pName"
//               error={product.pName.error}
//             />
//             <Input
//               id="pName"
//               value={product.pName.value}
//               isError={product.pName.error}
//               dispatch={dispatch}
//               placeholder="Eg: Laptop"
//               className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//             />
//           </div>

//           {/* Product Description : input */}
//           <div>
//             <LabelText
//               text="Product Description"
//               htmlFor="pDesc"
//               error={product.pDesc.error}
//             />
//             <textarea
//               id="pDesc"
//               name="pDesc"
//               value={product.pDesc.value}
//               placeholder="Eg: This is a Gaming Laptop"
//               className={`border px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] h-40 focus:outline-dotted text-ternary w-full placeholder:text-gray-500
//             ${
//               product.pDesc.error &&
//               "text-red-600 placeholder:text-red-600 border-red-600"
//             }`}
//               onChange={(e) => {
//                 product.pDesc.error &&
//                   dispatch({ type: `pDescErr`, payload: "" });
//                 dispatch({ type: `pDescVal`, payload: e.target.value });
//               }}
//             />
//             {product.pDesc.error && (
//               <h1 className="text-red-600 p-2 animate-pulse">
//                 {product.pDesc.error}
//               </h1>
//             )}
//           </div>

//           {/* Product Images : File */}
//           <div>
//             <LabelText
//               text="Product Images"
//               htmlFor="pImg"
//               error={product.pImg.error}
//             />
//             <ImageUploader
//               id="pImg"
//               dispatch={dispatch}
//               img={product.pImg.value}
//               error={product.pImg.error}
//             />
//           </div>

//           {/* Product SubCategory : Select*/}
//           <SlctSubCtgry
//             dispatch={dispatch}
//             pCtgry={product.pCtgry.value}
//             pCtgryErr={product.pCtgry.error}
//             pSbCtgry={product.pSbCtgry.value}
//             pSbCtgryErr={product.pSbCtgry.error}
//           />

//           {/* Product isTrending : CheckBox */}
//           <div>
//             <div className="flex items-baseline gap-3">
//               <input
//                 type="checkbox"
//                 id="pTrend"
//                 className="translate-y-[1.5px]"
//                 checked={product.pTrend.value}
//                 onChange={(e) => {
//                   product.pTrend.error &&
//                     dispatch({ type: `pTrendErr`, payload: "" });
//                   dispatch({ type: `pTrendVal`, payload: e.target.checked });
//                 }}
//               />
//               <LabelText
//                 text="Is This Product Trending?"
//                 htmlFor="pTrend"
//                 isMandatory={false}
//                 className="cursor-pointer"
//                 error={product.pTrend.error}
//               />
//             </div>
//             {product.pTrend.error && (
//               <h1 className="text-red-600 p-2 animate-pulse">
//                 {product.pTrend.error}
//               </h1>
//             )}
//           </div>

//           {/* Product isSale : CheckBox */}
//           <div>
//             <div className="flex items-baseline gap-3">
//               <input
//                 type="checkbox"
//                 id="pSale"
//                 className="translate-y-[1.5px]"
//                 checked={product.pSale.value}
//                 onChange={(e) => {
//                   product.pSale.error &&
//                     dispatch({ type: `pSaleErr`, payload: "" });
//                   dispatch({ type: `pSaleVal`, payload: e.target.checked });
//                 }}
//               />
//               <LabelText
//                 text="Is This Product Live For Sale?"
//                 htmlFor="pSale"
//                 isMandatory={false}
//                 className="cursor-pointer"
//                 error={product.pSale.error}
//               />
//             </div>
//             {product.pSale.error && (
//               <h1 className="text-red-600 p-2 animate-pulse">
//                 {product.pSale.error}
//               </h1>
//             )}
//           </div>

//           {/* Product Price : input */}
//           <div>
//             <LabelText
//               text="Product Price"
//               htmlFor="pPrice"
//               error={product.pPrice.error}
//             />
//             <Input
//               id="pPrice"
//               type="number"
//               placeholder="Eg: $100"
//               className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//               dispatch={dispatch}
//               value={product.pPrice.value}
//               isError={product.pPrice.error}
//             />
//           </div>

//           {/* Product Discount Percentage : input */}
//           <div>
//             <LabelText
//               text="Product Discount Percentage"
//               htmlFor="pDiscPer"
//               error={product.pDiscPer.error}
//             />
//             <Input
//               id="pDiscPer"
//               type="number"
//               placeholder="Eg: 10 (Value Should be Within 0-100)"
//               className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//               dispatch={dispatch}
//               value={product.pDiscPer.value}
//               isError={product.pDiscPer.error}
//             />
//           </div>

//           {/* Product HighLights : Object */}
//           <div>
//             <LabelText
//               text="Product HighLights"
//               htmlFor="pHighlts"
//               error={product.pHighlts.error["index"]}
//             />
//             <HighlightsForm
//               dispatch={dispatch}
//               error={product.pHighlts.error}
//               init={product.pHighlts.value}
//               role="UPDATE"
//             />
//           </div>

//           {/* Product Count (Stock) : input */}
//           <div>
//             <LabelText
//               text="Product Stock"
//               htmlFor="pStock"
//               error={product.pStock.error}
//             />
//             <Input
//               id="pStock"
//               type="number"
//               placeholder="Eg: 100"
//               className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//               dispatch={dispatch}
//               value={product.pStock.value}
//               isError={product.pStock.error}
//             />
//           </div>
//           <button className="text-white bg-primary p-2 rounded">
//             Update Product
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditProduct;

import React, { useEffect, useReducer, useState } from "react";
import Breadcrumbs from "../../../components/General/UI/Breadcrumbs";
import Input, { LabelText } from "../../../components/General/Input";
import ImageUploader from "../pages/AddProduct/components/ImageUploader";
import SlctSubCtgry from "../pages/AddProduct/components/SlctSubCtgry";
import HighlightsForm from "../pages/AddProduct/components/HighlightsForm";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../../services/axios";
import Loading from "../../../components/General/UI/Loading";
import SelectCategorySubCategory from "../pages/AddProduct/components/SelectCategorySubCategory";

const initialState = {
  pName: { value: "", error: "" },
  pDesc: { value: "", error: "" },
  pImg: { value: [], error: "" },
  pCtgry: { value: "", error: "" },
  pSbCtgry: { value: "", error: "" },
  pTrend: { value: false, error: "" },
  pSale: { value: false, error: "" },
  pPrice: { value: "", error: "" },
  pDiscPer: { value: "", error: "" },
  pHighlts: {
    value: {},
    error: {
      index: "",
      type: "",
    },
  },
  pStock: { value: "", error: "" },
};

const reducer = (prevState, action) => {
  // Product Name
  if (action.type === "pNameVal" || action.type === "pNameErr") {
    return action.type === "pNameVal"
      ? {
          ...prevState,
          pName: { ...prevState.pName, value: action.payload },
        }
      : {
          ...prevState,
          pName: { ...prevState.pName, error: action.payload },
        };
  }
  // Product Description
  if (action.type === "pDescVal" || action.type === "pDescErr") {
    return action.type === "pDescVal"
      ? {
          ...prevState,
          pDesc: { ...prevState.pDesc, value: action.payload },
        }
      : {
          ...prevState,
          pDesc: { ...prevState.pDesc, error: action.payload },
        };
  }
  // Product Image
  if (action.type === "pImgVal" || action.type === "pImgErr") {
    return action.type === "pImgVal"
      ? {
          ...prevState,
          pImg: { ...prevState.pImg, value: action.payload },
        }
      : {
          ...prevState,
          pImg: { ...prevState.pImg, error: action.payload },
        };
  }
  // Product Category
  if (action.type === "pCtgryVal" || action.type === "pCtgryErr") {
    return action.type === "pCtgryVal"
      ? {
          ...prevState,
          pCtgry: { ...prevState.pCtgry, value: action.payload },
        }
      : {
          ...prevState,
          pCtgry: { ...prevState.pCtgry, error: action.payload },
        };
  }
  // Product Sub Category
  if (action.type === "pSbCtgryVal" || action.type === "pSbCtgryErr") {
    return action.type === "pSbCtgryVal"
      ? {
          ...prevState,
          pSbCtgry: { ...prevState.pSbCtgry, value: action.payload },
        }
      : {
          ...prevState,
          pSbCtgry: { ...prevState.pSbCtgry, error: action.payload },
        };
  }
  // Is Trending
  if (action.type === "pTrendVal" || action.type === "pTrendErr") {
    return action.type === "pTrendVal"
      ? {
          ...prevState,
          pTrend: { ...prevState.pTrend, value: action.payload },
        }
      : {
          ...prevState,
          pTrend: { ...prevState.pTrend, error: action.payload },
        };
  }
  // Is Sale
  if (action.type === "pSaleVal" || action.type === "pSaleErr") {
    return action.type === "pSaleVal"
      ? {
          ...prevState,
          pSale: { ...prevState.pSale, value: action.payload },
        }
      : {
          ...prevState,
          pSale: { ...prevState.pSale, error: action.payload },
        };
  }
  // Price
  if (action.type === "pPriceVal" || action.type === "pPriceErr") {
    return action.type === "pPriceVal"
      ? {
          ...prevState,
          pPrice: { ...prevState.pPrice, value: action.payload },
        }
      : {
          ...prevState,
          pPrice: { ...prevState.pPrice, error: action.payload },
        };
  }
  // Discount
  if (action.type === "pDiscPerVal" || action.type === "pDiscPerErr") {
    return action.type === "pDiscPerVal"
      ? {
          ...prevState,
          pDiscPer: { ...prevState.pDiscPer, value: action.payload },
        }
      : {
          ...prevState,
          pDiscPer: { ...prevState.pDiscPer, error: action.payload },
        };
  }
  // Highlights
  if (action.type === "pHighltsVal" || action.type === "pHighltsErr") {
    return action.type === "pHighltsVal"
      ? {
          ...prevState,
          pHighlts: { ...prevState.pHighlts, value: action.payload },
        }
      : {
          ...prevState,
          pHighlts: { ...prevState.pHighlts, error: action.payload },
        };
  }
  // Stock
  if (action.type === "pStockVal" || action.type === "pStockErr") {
    return action.type === "pStockVal"
      ? {
          ...prevState,
          pStock: { ...prevState.pStock, value: action.payload },
        }
      : {
          ...prevState,
          pStock: { ...prevState.pStock, error: action.payload },
        };
  }
  if (action.type === "INIT") {
    return action.payload;
  }
  return prevState;
};

const EditProduct = () => {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const [product, dispatch] = useReducer(reducer, initialState);

  const [productDetails, setProduct] = useState({});

  const [categoryID, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleSubCategoryChange = (selectedSubCategory) => {
    setSubCategory(selectedSubCategory);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true when fetching data

      try {
        const response = await axiosInstance.get(`/item/${productId}`);
        setProduct(response.data.data.item);
        // console.log(response.data.data.item, "setProduct");
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  // const { mutate: updateProduct } = useMutation(
  //   (data) =>
  //     axiosInstance.put(`/item/update/${productId}`, data, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }),
  //   {
  //     onSuccess: (res) => {
  //       queryClient.invalidateQueries(["category"]);
  //     },
  //     onError: (error) => console.log(error),
  //   }
  // );

  const updateProduct = (data) => {
    try {
      axiosInstance
        .put(`/item/update/${productId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          queryClient.invalidateQueries(["category"]);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(productDetails,"productDetails")
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemTitle", product.pName.value);
    formData.append("itemDescription", product.pDesc.value);
    formData.append("stock", product.pStock.value);

    // console.log(product.pCtgry, "product.pCtgry");
    // console.log(product.pSbCtgry, "product.pSbCtgry");

    // formData.append(
    //   "subCategory",
    //   product.pCtgry.value && product.pSbCtgry.value
    //     ? `${product.pCtgry.value}/${product.pSbCtgry.value}`
    //     : ""
    // );

    // console.log(categoryID, subCategory, "category,setCategory");

    formData.append(
      "subCategory",
      categoryID && subCategory
        ? `${typeof categoryID === "string" ? categoryID : categoryID?._id}/${
            typeof subCategory === "string" ? subCategory : subCategory?._id
          }`
        : ""
    );
    formData.append("isSale", product.pSale.value);
    formData.append("isTrending", product.pTrend.value);
    formData.append("actualPrice", product.pPrice.value);
    formData.append("discountPercentage", product.pDiscPer.value);
    formData.append("highlights", JSON.stringify(product.pHighlts.value));

    const imageFiles = product.pImg.value.filter(
      (image) => image instanceof File
    );
    const imageUrls = product.pImg.value.filter(
      (image) => typeof image === "string"
    );

    imageUrls.forEach((url) => {
      formData.append("existingImages", url);
    });

    imageFiles.forEach((file) => {
      formData.append("newImages", file);
    });

    updateProduct(formData);
    alert("Product Updated Successfully");
  };

  useEffect(() => {
    if (productDetails) {
      // console.log(productDetails, "productDetails");

      setCategory(productDetails?.category?._id);
      // console.log(productDetails?.category?._id, "productDetails.category._id");
      setSubCategory(productDetails?.subCategoryId);

      const initialVal = {
        pName: { value: productDetails.itemTitle || "", error: "" },
        pDesc: { value: productDetails.itemDescription || "", error: "" },
        pImg: { value: productDetails.images || [], error: "" },

        pCtgry: { value: productDetails.category || "", error: "" },
        pSbCtgry: { value: productDetails.subCategoryId || "", error: "" },
        pTrend: { value: productDetails.isTrending || false, error: "" },
        pSale: { value: productDetails.isSale || false, error: "" },
        pPrice: { value: productDetails.actualPrice || "", error: "" },
        pDiscPer: {
          value: productDetails.discountPercentage || "",
          error: "",
        },
        pHighlts: {
          value: productDetails.highlights
            ? JSON.parse(productDetails.highlights)
            : {},
          error: {
            index: "",
            type: "",
          },
        },
        pStock: { value: productDetails.stock || "", error: "" },
      };
      dispatch({ type: "INIT", payload: initialVal });
    }
  }, [productDetails]);

  // console.log(
  //   productDetails?.category?._id,
  //   "category",
  //   productDetails?.subCategoryId,
  //   "subCategory"
  // );

  // console.log(categoryID, "category");
  // console.log(subCategory, "subCategory");
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumbs
            group="admin"
            currentPage={[
              { text: "Product", URL: ".." },
              { text: `${productDetails?.itemTitle}` },
            ]}
            bldInPdng={false}
          />

          <div className="text-ternary space-y-4 w-full">
            <h1 className="text-3xl font-medium ">Update Product</h1>
            <form
              action=""
              className="bg-white p-5 border rounded space-y-5"
              onSubmit={submitHandler}
            >
              {/* Product Title : input */}
              <div>
                <LabelText
                  text="Product Name"
                  htmlFor="pName"
                  error={product.pName.error}
                />
                <Input
                  id="pName"
                  value={product.pName.value}
                  isError={product.pName.error}
                  dispatch={dispatch}
                  placeholder="Eg: Laptop"
                  className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
                />
              </div>

              {/* Product Description : input */}
              <div>
                <LabelText
                  text="Product Description"
                  htmlFor="pDesc"
                  error={product.pDesc.error}
                />
                <textarea
                  id="pDesc"
                  name="pDesc"
                  value={product.pDesc.value}
                  placeholder="Eg: This is a Gaming Laptop"
                  className={`border px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] h-40 focus:outline-dotted text-ternary w-full placeholder:text-gray-500
              ${
                product.pDesc.error &&
                "text-red-600 placeholder:text-red-600 border-red-600"
              }`}
                  onChange={(e) => {
                    product.pDesc.error &&
                      dispatch({ type: `pDescErr`, payload: "" });
                    dispatch({ type: `pDescVal`, payload: e.target.value });
                  }}
                />
                {product.pDesc.error && (
                  <h1 className="text-red-600 p-2 animate-pulse">
                    {product.pDesc.error}
                  </h1>
                )}
              </div>

              {/* Product Images : File */}
              <div>
                <LabelText
                  text="Product Images"
                  htmlFor="pImg"
                  error={product.pImg.error}
                />
                <ImageUploader
                  id="pImg"
                  dispatch={dispatch}
                  img={product.pImg.value}
                  error={product.pImg.error}
                />
              </div>

              {/* Product SubCategory : Select*/}

              <SelectCategorySubCategory
                category={productDetails.category}
                subCategory={productDetails.subCategoryId}
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={handleSubCategoryChange}
              />
              {/* <SlctSubCtgry
                dispatch={dispatch}
                pCtgry={product.pCtgry.value}
                pCtgryErr={product.pCtgry.error}
                pSbCtgry={product.pSbCtgry.value}
                pSbCtgryErr={product.pSbCtgry.error}
              /> */}

              {/* Product isTrending : CheckBox */}
              <div>
                <div className="flex items-baseline gap-3">
                  <input
                    type="checkbox"
                    id="pTrend"
                    className="translate-y-[1.5px]"
                    checked={product.pTrend.value}
                    onChange={(e) => {
                      product.pTrend.error &&
                        dispatch({ type: `pTrendErr`, payload: "" });
                      dispatch({
                        type: `pTrendVal`,
                        payload: e.target.checked,
                      });
                    }}
                  />
                  <LabelText
                    text="Is This Product Today Deal?"
                    htmlFor="pTrend"
                    isMandatory={false}
                    className="cursor-pointer"
                    error={product.pTrend.error}
                  />
                </div>
                {product.pTrend.error && (
                  <h1 className="text-red-600 p-2 animate-pulse">
                    {product.pTrend.error}
                  </h1>
                )}
              </div>

              {/* Product isSale : CheckBox */}
              <div>
                <div className="flex items-baseline gap-3">
                  <input
                    type="checkbox"
                    id="pSale"
                    className="translate-y-[1.5px]"
                    checked={product.pSale.value}
                    onChange={(e) => {
                      product.pSale.error &&
                        dispatch({ type: `pSaleErr`, payload: "" });
                      dispatch({ type: `pSaleVal`, payload: e.target.checked });
                    }}
                  />
                  <LabelText
                    text="Is This Product New Arrival?"
                    htmlFor="pSale"
                    isMandatory={false}
                    className="cursor-pointer"
                    error={product.pSale.error}
                  />
                </div>
                {product.pSale.error && (
                  <h1 className="text-red-600 p-2 animate-pulse">
                    {product.pSale.error}
                  </h1>
                )}
              </div>

              {/* Product Price : input */}
              <div>
                <LabelText
                  text="Product Price"
                  htmlFor="pPrice"
                  error={product.pPrice.error}
                />
                <Input
                  id="pPrice"
                  type="number"
                  placeholder="Eg: $100"
                  className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
                  dispatch={dispatch}
                  value={product.pPrice.value}
                  isError={product.pPrice.error}
                />
              </div>

              {/* Product Discount Percentage : input */}
              <div>
                <LabelText
                  text="Product Discount Percentage"
                  htmlFor="pDiscPer"
                  error={product.pDiscPer.error}
                />
                <Input
                  id="pDiscPer"
                  type="number"
                  placeholder="Eg: 10 (Value Should be Within 0-100)"
                  className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
                  dispatch={dispatch}
                  value={product.pDiscPer.value}
                  isError={product.pDiscPer.error}
                />
              </div>

              {/* Product HighLights : Object */}
              <div>
                <LabelText
                  text="Product HighLights"
                  htmlFor="pHighlts"
                  error={product.pHighlts.error["index"]}
                />
                <HighlightsForm
                  dispatch={dispatch}
                  error={product.pHighlts.error}
                  init={product.pHighlts.value}
                  role="UPDATE"
                />
              </div>

              {/* Product Count (Stock) : input */}
              <div>
                <LabelText
                  text="Product Stock"
                  htmlFor="pStock"
                  error={product.pStock.error}
                />
                <Input
                  id="pStock"
                  type="number"
                  placeholder="Eg: 100"
                  className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
                  dispatch={dispatch}
                  value={product.pStock.value}
                  isError={product.pStock.error}
                />
              </div>
              <button className="text-white bg-primary p-2 rounded">
                Update Product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProduct;
