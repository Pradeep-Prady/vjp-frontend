// import React from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import ProductList from "../../components/Product/ProductList";

// const CategoryPage = () => {
//   const { category } = useParams();

//   const allProducts = useSelector((state) => state.product.products);

//   const categorizedProducts = allProducts?.find(
//     (product) => product.category === category
//   );

//   let subCategory = categorizedProducts?.subCategorys;

//   const allProductCategoryObject = {
//     subCategorys: false,
//     description:
//       "Explore our extensive product selection, where innovation meets convenience. From high-tech gadgets and essential appliances to smart home devices and entertainment equipment, we have everything you need to elevate your lifestyle. Find top-quality solutions for your home and stay ahead of the curve with our diverse range of products.",
//     category: "all-products",
//     title: "All Products",
//     items: [],
//   };

//   if (!categorizedProducts) {
//     allProducts.forEach((product) => {
//       // console.log(product.items);
//       allProductCategoryObject.items.push(...product.items);
//     });
//     // console.log("ALL Products");
//     // console.log(allProductCategoryObject.items);
//   }

//   // console.log(category);
//   // console.log(allProducts);
//   // console.log(subCategory);
//   // console.log(categorizedProducts);
//   // console.log(allProductCategoryObject);

//   return (
//     <ProductList
//       products={
//         categorizedProducts ? categorizedProducts : allProductCategoryObject
//       }
//       category={category}
//       subCategory={subCategory}
//     />
//   );
// };

// export default CategoryPage;

// // let info = allProducts?.filter((item) =>
// //   item.category === category ? item : []
// // );
// // console.log("Info :" + info);

// // let allProductItems = [];
// // if (category === "all-products") {
// //   allProducts.forEach((product) => allProductItems.push(...product.items));

// //   const allProductObjCopy = { ...info[0] };
// //   console.log(allProductItems);
// //   allProductObjCopy.items = allProductItems;
// //   info[0] = allProductObjCopy;
// // } else {
// //   allProductItems = allProducts.find(
// //     (product) => product.category === category
// //   )?.items;
// // }

// // console.log(allProductItems);

import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
import ProductList from "../../components/Product/ProductList";
// import { useQueryEvents } from "../../hooks/useQueryWithCallbacks";
// import { useQuery } from "react-query";
// import { axiosInstance } from "../../services/axios";

const CategoryPage = () => {
  // const { category } = useParams();

  const allProductCategoryObject = {
    subCategorys: [],
    description:
      "Explore our extensive product selection, where innovation meets convenience. From high-tech gadgets and essential appliances to smart home devices and entertainment equipment, we have everything you need to elevate your lifestyle. Find top-quality solutions for your home and stay ahead of the curve with our diverse range of products.",
    category: "all-products",
    title: "All Products",
    items: [],
  };
  const [currentCategory, setCurrentCategory] = useState(
    allProductCategoryObject
  );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axiosInstance.get(`/category/${category}`);
  //     setCurrentCategory(response.data.data);
  //     console.log(response.data.data, "category");
  //   };

  //   fetchData();
  // }, [category]);

  console.log(currentCategory?.subCategorys, "subCategorys in category page");

  return (
    <ProductList
      categoryId={currentCategory?._id}
      categoryName={currentCategory?.category}
      description={currentCategory?.description}
      subCategories={currentCategory?.subCategorys}
    />
  );
};

export default CategoryPage;
