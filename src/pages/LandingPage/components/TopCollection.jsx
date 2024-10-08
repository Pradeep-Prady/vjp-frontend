// import React, { useEffect, useState } from "react";
// import TopCategorys from "./TopCategorys";
// import {
//   topThreeCategory,
//   topThreeCategoryData,
// } from "../data/landingPageData";
// import ProductItem from "../../../components/Product/ProductItem";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";

// let selectedCategoryProducts;

// const TopCollection = () => {
//   const allProducts = useSelector((state) => state.product.categories);
//   const [topProdCategories, setTopProdCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   const topCategories = useSelector((state) => state.product.categories);

//   selectedCategoryProducts = topProdCategories.find(
//     (category) => category.category === selectedCategory
//   );

//   useEffect(() => {
//     const isTopCategoryProducts = allProducts.filter(
//       (product) => product.isTopCategory
//     );

//     isTopCategoryProducts.forEach((category, index) => {
//       index === 0 && setSelectedCategory(category.category);
//       setTopProdCategories((prevState) => [...prevState, category]);
//     });
//   }, [allProducts]);

//   return (
//     <>
//       {/* <TopCategorys data={topThreeCategory} /> */}
//       {/* Shop The Collection */}
//       <div>
//         <div className="space-y-10">
//           {/* Heading */}
//           <div className="space-y-4">
//             <h1 className="text-center text-4xl font-semibold">
//               Shop The Collection
//             </h1>
//             <hr className="border w-[13%] border-black mx-auto" />
//           </div>

//           {/* Categories */}
//           <ul className="flex flex-col sml:flex-row justify-center gap-4 text-[15px] ">
//             {topProdCategories.slice(0, 4).map(({ _id, title, category }) => (
//               <li
//                 key={_id}
//                 className={`border border-dashed rounded-full px-6 py-[6px] cursor-pointer text-center ${
//                   selectedCategory === category
//                     ? "border-black"
//                     : "border-transparent"
//                 }`}
//                 onClick={() => setSelectedCategory(category)}
//               >
//                 {title}
//               </li>
//             ))}
//           </ul>

//           {/* Products */}
//           <ul className="flex flex-wrap gap-5 justify-center">
//             {selectedCategoryProducts?.items
//               .slice(
//                 0,
//                 selectedCategoryProducts?.items.length > 8
//                   ? 8
//                   : selectedCategoryProducts?.items.length
//               )
//               .map((product,i) => (
//                 <ProductItem
//                   key={i}
//                   category={selectedCategory}
//                   product={product}
//                 />
//               ))}
//           </ul>

//           {/* See More Button */}
//           <div className="flex justify-center -translate-y-5">
//             <Link
//               to={`/products/${selectedCategory}`}
//               className="border px-8 py-3 bg-ternary text-white rounded-full
//               hover:bg-primary transition-all ease-linear duration-[400ms]"
//             >
//               See More
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TopCollection;

import React, { useEffect, useState } from "react";
import TopCategorys from "./TopCategorys";
import {
  topThreeCategory,
  topThreeCategoryData,
} from "../data/landingPageData";
import ProductItem from "../../../components/Product/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowRoundDown } from "react-icons/io";
let selectedCategoryProducts;

const TopCollection = () => {
  const [topProdCategories, setTopProdCategories] = useState([]);

  const topCategories = useSelector((state) => state.product.topCategories);

  const [selectedCategory, setSelectedCategory] = useState(null);

  selectedCategoryProducts = topProdCategories.find(
    (category) => category.category === selectedCategory
  );

  useEffect(() => {
    if (topCategories.length > 0) {
      setSelectedCategory(topCategories[0]);
    }
  }, [topCategories]);

  return (
    <>
      <TopCategorys data={topThreeCategory} />
      {/* Shop The Collection */}
      <div>
        <div className="space-y-10">
          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-center text-3xl font-semibold">
              Shop The Collection
            </h1>
            {/* <hr className="border w-[13%] border-black mx-auto" /> */}
          </div>

          {/* Categories */}
          <ul className="flex flex-col sml:flex-row justify-center gap-4 text-[15px] ">
            {topCategories?.map((category) => (
              <li
                key={category?._id}
                className={`border border-dashed rounded-full px-6 py-[6px] cursor-pointer text-center ${
                  selectedCategory?.category === category?.category
                    ? "border-black"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category?.title}
              </li>
            ))}
          </ul>

          {/* Products */}
          <ul className="flex flex-wrap gap-5 justify-center">
            {selectedCategory?.items?.map((product, i) => (
              <ProductItem
                key={i}
                category={selectedCategory}
                product={product}
              />
            ))}
          </ul>

          {/* See More Button */}
          <div className="flex justify-center items-center  -translate-y-5">
            <div className=" flex justify-center items-center border px-8 py-3 mt-5 bg-ternary text-white rounded-full hover:bg-primary transition-all ease-linear duration-[400ms]">
              <Link
                to={`/products/${selectedCategory?.category}`}
                className="
              "
              >
                Load More
              </Link>
              <IoIosArrowRoundDown className="ml-2 text-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCollection;
