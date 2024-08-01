// import React, { useReducer } from "react";
// import Input, { LabelText } from "../../../../components/General/Input";
// import ImageUploader from "./components/ImageUploader";
// import HighlightsForm from "./components/HighlightsForm";
// import SlctSubCtgry from "./components/SlctSubCtgry";
// import { useMutation, useQueryClient } from "react-query";
// import { axiosInstance } from "../../../../services/axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

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
//   // RESET
//   if (action.type === "RESET") {
//     return initialState;
//   }

//   return prevState;
// };

// const AddProduct = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const [product, dispatch] = useReducer(reducer, initialState);

//   const { mutate: createProduct } = useMutation(
//     (productData) =>
//       axiosInstance.post("/item/create", productData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }),
//     {
//       onSuccess: (res) => {
//         toast.success(
//           "Product Added Successfully!, Please wait some time to see changes"
//         );
//         queryClient.invalidateQueries(["category"]);
//         dispatch({ type: "RESET" });
//         navigate("/admin/products");
//       },
//       onError: (error) => console.log(error),
//     }
//   );

//   const submitHandler = (e) => {
//     e.preventDefault();
//     // console.log(product);
//     // console.log(JSON.stringify(product.pHighlts.value));

//     const formData = new FormData();
//     formData.append("itemTitle", product.pName.value);
//     formData.append("itemDescription", product.pDesc.value);
//     formData.append("images", product.pImg.value);
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

//     product.pImg.value.forEach((image, index) => {
//       formData.append(`images`, image);
//     });

//     createProduct(formData);
//   };
//   return (
//     <div className="text-ternary space-y-4 w-full">
//       <h1 className="text-3xl font-medium ">Add Product</h1>
//       <form
//         action=""
//         className="bg-white p-5 border rounded space-y-5"
//         onSubmit={submitHandler}
//       >
//         {/* Product Title : input */}
//         <div>
//           <LabelText
//             text="Product Name"
//             htmlFor="pName"
//             error={product.pName.error}
//           />
//           <Input
//             id="pName"
//             value={product.pName.value}
//             isError={product.pName.error}
//             dispatch={dispatch}
//             placeholder="Eg: Laptop"
//             className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//           />
//         </div>

//         {/* Product Description : input */}
//         <div>
//           <LabelText
//             text="Product Description"
//             htmlFor="pDesc"
//             error={product.pDesc.error}
//           />
//           <textarea
//             id="pDesc"
//             name="pDesc"
//             value={product.pDesc.value}
//             placeholder="Eg: This is a Gaming Laptop"
//             className={`border px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA] h-40 focus:outline-dotted text-ternary w-full placeholder:text-gray-500
//             ${
//               product.pDesc.error &&
//               "text-red-600 placeholder:text-red-600 border-red-600"
//             }`}
//             onChange={(e) => {
//               product.pDesc.error &&
//                 dispatch({ type: `pDescErr`, payload: "" });
//               dispatch({ type: `pDescVal`, payload: e.target.value });
//             }}
//           />
//           {product.pDesc.error && (
//             <h1 className="text-red-600 p-2 animate-pulse">
//               {product.pDesc.error}
//             </h1>
//           )}
//         </div>

//         {/* Product Images : File */}
//         <div>
//           <LabelText
//             text="Product Images"
//             htmlFor="pImg"
//             error={product.pImg.error}
//           />
//           <ImageUploader
//             id="pImg"
//             dispatch={dispatch}
//             img={product.pImg.value}
//             error={product.pImg.error}
//           />
//         </div>

//         {/* Product SubCategory : Select*/}
//         <SlctSubCtgry
//           dispatch={dispatch}
//           pCtgry={product.pCtgry.value}
//           pCtgryErr={product.pCtgry.error}
//           pSbCtgry={product.pSbCtgry.value}
//           pSbCtgryErr={product.pSbCtgry.error}
//         />

//         {/* Product isTrending : CheckBox */}
//         <div>
//           <div className="flex items-baseline gap-3">
//             <input
//               type="checkbox"
//               id="pTrend"
//               className="translate-y-[1.5px]"
//               checked={product.pTrend.value}
//               onChange={(e) => {
//                 product.pTrend.error &&
//                   dispatch({ type: `pTrendErr`, payload: "" });
//                 dispatch({ type: `pTrendVal`, payload: e.target.checked });
//               }}
//             />
//             <LabelText
//               text="Is This Product Trending?"
//               htmlFor="pTrend"
//               isMandatory={false}
//               className="cursor-pointer"
//               error={product.pTrend.error}
//             />
//           </div>
//           {product.pTrend.error && (
//             <h1 className="text-red-600 p-2 animate-pulse">
//               {product.pTrend.error}
//             </h1>
//           )}
//         </div>

//         {/* Product isSale : CheckBox */}
//         <div>
//           <div className="flex items-baseline gap-3">
//             <input
//               type="checkbox"
//               id="pSale"
//               className="translate-y-[1.5px]"
//               checked={product.pSale.value}
//               onChange={(e) => {
//                 product.pSale.error &&
//                   dispatch({ type: `pSaleErr`, payload: "" });
//                 dispatch({ type: `pSaleVal`, payload: e.target.checked });
//               }}
//             />
//             <LabelText
//               text="Is This Product Live For Sale?"
//               htmlFor="pSale"
//               isMandatory={false}
//               className="cursor-pointer"
//               error={product.pSale.error}
//             />
//           </div>
//           {product.pSale.error && (
//             <h1 className="text-red-600 p-2 animate-pulse">
//               {product.pSale.error}
//             </h1>
//           )}
//         </div>

//         {/* Product Price : input */}
//         <div>
//           <LabelText
//             text="Product Price"
//             htmlFor="pPrice"
//             error={product.pPrice.error}
//           />
//           <Input
//             id="pPrice"
//             type="number"
//             placeholder="Eg: $100"
//             className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//             dispatch={dispatch}
//             value={product.pPrice.value}
//             isError={product.pPrice.error}
//           />
//         </div>

//         {/* Product Discount Percentage : input */}
//         <div>
//           <LabelText
//             text="Product Discount Percentage"
//             htmlFor="pDiscPer"
//             error={product.pDiscPer.error}
//           />
//           <Input
//             id="pDiscPer"
//             type="number"
//             placeholder="Eg: 10 (Value Should be Within 0-100)"
//             className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//             dispatch={dispatch}
//             value={product.pDiscPer.value}
//             isError={product.pDiscPer.error}
//           />
//         </div>

//         {/* Product HighLights : Object */}
//         <div>
//           <LabelText
//             text="Product HighLights"
//             htmlFor="pHighlts"
//             error={product.pHighlts.error["index"]}
//           />
//           <HighlightsForm
//             dispatch={dispatch}
//             error={product.pHighlts.error}
//             role="CREATE"
//           />
//         </div>

//         {/* Product Count (Stock) : input */}
//         <div>
//           <LabelText
//             text="Product Stock"
//             htmlFor="pStock"
//             error={product.pStock.error}
//           />
//           <Input
//             id="pStock"
//             type="number"
//             placeholder="Eg: 100"
//             className="px-[7px] py-[7px] text-[15px] focus:bg-[#F8F9FA]"
//             dispatch={dispatch}
//             value={product.pStock.value}
//             isError={product.pStock.error}
//           />
//         </div>
//         <button className="text-white bg-primary p-2 rounded">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import React, { useEffect, useReducer } from "react";
import Input, { LabelText } from "../../../../components/General/Input";
import ImageUploader from "./components/ImageUploader";
import HighlightsForm from "./components/HighlightsForm";
import SlctSubCtgry from "./components/SlctSubCtgry";
import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../../../services/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { adminActions } from "../../../../store/adminSlice";
import { useDispatch } from "react-redux";

const initialState = {
  pName: { value: "", error: "" },
  pDesc: { value: "", error: "" },
  pImg: { value: [], error: "" },
  pCtgry: { value: "", error: "" },
  pSbCtgry: { value: "", error: "" },
  pTrend: { value: false, error: "" },
  pSale: { value: false, error: "" },
  pPrice: { value: null, error: "" },
  pDiscPer: { value: null, error: "" },
  pHighlts: {
    value: {},
    error: {
      index: "",
      type: "",
    },
  },
  pStock: { value: null, error: "" },
};

const reducer = (prevState, action) => {
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
  // RESET
  if (action.type === "RESET") {
    return initialState;
  }

  return prevState;
};

const AddProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [product, dispatch] = useReducer(reducer, initialState);

  const { mutate: createProduct } = useMutation(
    (productData) =>
      axiosInstance.post("/item/create", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    {
      onSuccess: (res) => {
        toast.success(
          "Product Added Successfully!, Please wait some time to see changes"
        );
        queryClient.invalidateQueries(["category"]);
        dispatch({ type: "RESET" });
        navigate("/admin/products");
      },
      onError: (error) => console.log(error),
    }
  );

  const dispatcher = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/categories");
      dispatcher(adminActions.addCategories(response.data.data));
    };
    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(product);
    // console.log(JSON.stringify(product.pHighlts.value));

    const formData = new FormData();
    formData.append("itemTitle", product.pName.value);
    formData.append("itemDescription", product.pDesc.value);
    formData.append("images", product.pImg.value);
    formData.append("stock", product.pStock.value);
    formData.append(
      "subCategory",
      product.pCtgry.value && product.pSbCtgry.value
        ? `${product.pCtgry.value}/${product.pSbCtgry.value}`
        : ""
    );
    formData.append("isSale", product.pSale.value);
    formData.append("isTrending", product.pTrend.value);
    formData.append("actualPrice", product.pPrice.value);
    formData.append("discountPercentage", product.pDiscPer.value);
    formData.append("highlights", JSON.stringify(product.pHighlts.value));

    product.pImg.value.forEach((image, index) => {
      formData.append(`images`, image);
    });

    createProduct(formData);
  };
  return (
    <div className="text-ternary space-y-4 w-full">
      <h1 className="text-3xl font-medium ">Add Product</h1>
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
        <SlctSubCtgry
          dispatch={dispatch}
          pCtgry={product.pCtgry.value}
          pCtgryErr={product.pCtgry.error}
          pSbCtgry={product.pSbCtgry.value}
          pSbCtgryErr={product.pSbCtgry.error}
        />

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
                dispatch({ type: `pTrendVal`, payload: e.target.checked });
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
            role="CREATE"
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
