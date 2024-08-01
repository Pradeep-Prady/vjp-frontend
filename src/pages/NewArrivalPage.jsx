// import React, { useEffect, useState } from "react";
// import { useRouteLoaderData } from "react-router-dom";
// import { Adtile1, Adtiles } from "../components/General/Adtiles";
// import ProductList from "../components/Product/ProductList";
// import { useDispatch, useSelector } from "react-redux";
// import { productActions } from "../store/productSlice";
// import Pagination from "../components/General/Pagination";
// import ProductItem from "../components/Product/ProductItem";
// import { useQuery } from "react-query";
// import { axiosInstance } from "../services/axios";

// const NewArrivalPage = () => {
//   const [newArrProducts, setNewArrProducts] = useState([]);

//   const productLength = newArrProducts?.length;
//   const [currentPageNumber, setCurrentPageNumber] = useState(1);
//   const itemsPerPage = 8;
//   const startIndex = (currentPageNumber - 1) * itemsPerPage;
//   const endIndex = currentPageNumber * itemsPerPage;
//   const totalpages = Math.ceil(productLength / itemsPerPage);

//   useQuery(["getLatestItems"], () => axiosInstance.get("/latest-items"), {
//     onSuccess: (res) => setNewArrProducts(res.data.data),
//     onError: (err) => console.log(err),
//     refetchOnWindowFocus: false,
//     staleTime: false,
//     cacheTime: false,
//   });

//   console.log(newArrProducts);
//   return (
//     <section>
//       <div className="bg-white mb-16">
//         <div className="flex flex-wrap justify-between items-center 2xl:container 2xl:mx-auto mdl:divide-x-2 p-2 mdl:p-10">
//           <h1 className="w-full mdl:w-1/2 text-5xl xl:text-6xl font-semibold md:text-ternary p-5 text-primary pt-16 sml:pt-0">
//             New Arrivals
//           </h1>
//           <h5 className="w-full mdl:w-1/2  p-5 mdl:px-10 lgl:px-20 text-ternary leading-7">
//             Stay in the know with our new arrivals. Explore the latest in tech,
//             gadgets, and home appliances for an upgraded life.
//           </h5>
//         </div>
//       </div>
//       <div className="px-4 mdl:px-10 2xl:container 2xl:mx-auto">
//         <Adtiles />
//         <ul className="bg-white border border-gray-300 mb-5 p-5 flex flex-wrap justify-between">
//           {newArrProducts.slice(startIndex, endIndex).map((product) => (
//             <ProductItem key={product._id} category={null} {...{ product }} />
//           ))}
//         </ul>
//         <div className="p-4 mb-10">
//           {productLength > 7 && (
//             <Pagination
//               totalpages={totalpages}
//               itemsPerpage={itemsPerPage}
//               currentPageNumber={currentPageNumber}
//               setCurrentPageNumber={setCurrentPageNumber}
//             />
//           )}
//         </div>
//         <Adtile1 />
//       </div>
//     </section>
//   );
// };

// export default NewArrivalPage;

import React, { useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Adtile1, Adtiles } from "../components/General/Adtiles";
import ProductList from "../components/Product/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/productSlice";
import Pagination from "../components/General/Pagination";
import ProductItem from "../components/Product/ProductItem";
import { useQuery } from "react-query";
import { axiosInstance } from "../services/axios";

const NewArrivalPage = () => {
  const [newArrProducts, setNewArrProducts] = useState({});

  // const productLength = newArrProducts?.length;
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  // const itemsPerPage = 8;
  // const startIndex = (currentPageNumber - 1) * itemsPerPage;
  // const endIndex = currentPageNumber * itemsPerPage;
  // const totalpages = Math.ceil(productLength / itemsPerPage);

  // useQuery(["getLatestItems"], () => axiosInstance.get("/latest-items"), {
  //   onSuccess: (res) => setNewArrProducts(res.data.data),
  //   onError: (err) => console.log(err),
  //   refetchOnWindowFocus: false,
  //   staleTime: false,
  //   cacheTime: false,
  // });

  useEffect(() => {
    axiosInstance
      .get(`/new-arrivals?page=${currentPageNumber}`)
      .then((res) => setNewArrProducts(res.data.data))
      .catch((err) => console.log(err));
  }, [currentPageNumber]);

  // console.log(newArrProducts);
  return (
    <section>
      <div className="bg-white mb-16">
        <div className="flex flex-wrap justify-between items-center 2xl:container 2xl:mx-auto mdl:divide-x-2 p-2 mdl:p-10">
          <h1 className="w-full mdl:w-1/2 text-5xl xl:text-6xl font-semibold md:text-ternary p-5 text-primary pt-16 sml:pt-0">
            New Arrivals
          </h1>
          <h5 className="w-full mdl:w-1/2  p-5 mdl:px-10 lgl:px-20 text-ternary leading-7">
            Stay in the know with our new arrivals. Explore the latest in tech,
            gadgets, and home appliances for an upgraded life.
          </h5>
        </div>
      </div>
      <div className="px-4 mdl:px-10 2xl:container 2xl:mx-auto">
        <Adtiles />
        {/* <ul className="bg-white border border-gray-300 mb-5 p-5 flex flex-wrap justify-between">
          {newArrProducts.slice(startIndex, endIndex).map((product) => (
            <ProductItem key={product._id} category={null} {...{ product }} />
          ))}
        </ul> */}
        <ul className="bg-white border border-gray-300 mb-5 p-5 flex flex-wrap justify-between">
          {newArrProducts?.items?.map((product) => (
            <ProductItem key={product._id} category={null} {...{ product }} />
          ))}
        </ul>
        <div className="p-4 mb-10">
          {newArrProducts?.itemsCount > 12 && (
            <Pagination
              totalpages={newArrProducts?.totalPages}
              itemsPerpage={newArrProducts?.resPerPage}
              currentPageNumber={newArrProducts?.currentPage}
              setCurrentPageNumber={setCurrentPageNumber}
            />
          )}
        </div>
        <Adtile1 />
      </div>
    </section>
  );
};

export default NewArrivalPage;
