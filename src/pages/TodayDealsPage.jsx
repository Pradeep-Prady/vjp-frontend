import React, { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Adtile2 } from "../components/General/Adtiles";
import SpecialDeal from "../components/General/SpecialDeal";
import ProductItem from "../components/Product/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/productSlice";
import Pagination from "../components/General/Pagination";

const TodayDealsPage = () => {
  const allCategories = useSelector((state) => state.product.products);

  const [dealProducts, setDealProducts] = useState([]);
  console.log(dealProducts);

  const productLength = dealProducts?.length;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPageNumber - 1) * itemsPerPage;
  const endIndex = currentPageNumber * itemsPerPage;
  const totalpages = Math.ceil(productLength / itemsPerPage);

  useEffect(() => {
    if (allCategories.length > 0) {
      console.log(allCategories);
      allCategories.forEach((category) =>
        category.items.forEach(
          (product) =>
            product.isSale &&
            setDealProducts((prevState) => [...prevState, product])
        )
      );
    }
  }, [allCategories]);

  return (
    <section>
      <div className="bg-white mb-16">
        <div className="flex flex-wrap justify-between items-center 2xl:container 2xl:mx-auto mdl:divide-x-2 p-2 mdl:p-10">
          <h1 className="w-full mdl:w-1/2 text-5xl xl:text-6xl font-semibold md:text-ternary p-5 text-primary pt-16 sml:pt-0">
            Today's Deal
          </h1>
          <h5 className="w-full mdl:w-1/2  p-5 mdl:px-10 lgl:px-20 text-ternary leading-7">
            Discover today's unbeatable deals. Limited-time offers on
            electronics, gadgets, and more. Don't miss out on huge savings -
            shop now!
          </h5>
        </div>
      </div>
      <div className="px-4 mdl:px-10 2xl:container 2xl:mx-auto">
        <Adtile2 />
        <ul className="bg-white border border-gray-300 mb-16 p-5 flex flex-wrap justify-between">
          {dealProducts?.slice(startIndex, endIndex).map((product) => (
            <ProductItem key={product._id} {...{ product }} />
          ))}
        </ul>
        <div className="p-4 mb-10">
          {productLength > 7 && (
            <Pagination
              totalpages={totalpages}
              itemsPerpage={itemsPerPage}
              currentPageNumber={currentPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
            />
          )}
        </div>
        <SpecialDeal />
      </div>
    </section>
  );
};

export default TodayDealsPage;
