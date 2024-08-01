import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import newsLetterBg from "../../assets/Newsletter-banner.jpg";
import ProductItem from "../../components/Product/ProductItem";
import { featuresData } from "../../data/featuresData";
import TopCollection from "./components/TopCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectRandomElements } from "../../utils/helperFunction";
import { useQueryEvents } from "../../hooks/useQueryWithCallbacks";
import { useQuery } from "react-query";
import { axiosInstance } from "../../services/axios";
import { productActions } from "../../store/productSlice";
import { Link } from "react-router-dom";
import { IoIosArrowRoundDown } from "react-icons/io";

const LandingPage = () => {
  const [todayDealProducts, setTodayDealProducts] = useState([]);
  const [newArrivalsProducts, setNewArrivalsProducts] = useState([]);

  const allCategories = useSelector((state) => state.product.categories);
  const [topCategories, setTopCategories] = useState([]);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (allCategories.length > 0) {
  //     // console.log(allCategories);āā
  //     allCategories.forEach((category) =>
  //       category.items.forEach(
  //         (product) =>
  //           product.isTrending &&
  //           setTrendingProducts((prevState) => [...prevState, product])
  //       )
  //     );
  //   }
  // }, [allCategories]);
  // console.log(trendingProducts);

  useQueryEvents(
    useQuery(["getTopCategories"], () => axiosInstance.get("/top-categories")),
    {
      onSuccess: (res) => {
        // dispatch(productActions.addProducts(res.data.data));
        // console.log(res.data.data, "topCategories");

        dispatch(productActions.addTopCategories(res.data.data));
        setTopCategories(res.data.data);
      },

      onError: (err) => console.log("An error happened:", err.message),
    }
  );
 

  const [todayDealsCount, setTodayDealsCount] = useState(0);
  const [liveForSaleCount, setLiveForSaleCount] = useState(0);
  

  console.log(liveForSaleCount, todayDealsCount);

  useQueryEvents(
    useQuery(["getHomeDeals"], () => axiosInstance.get("/home-deals")),
    {
      onSuccess: (res) => {
        // dispatch(productActions.addProducts(res.data.data));
        console.log(res.data.data, "todayDeals");
        setLiveForSaleCount(res.data.data.liveForSaleCount)  
        setTodayDealsCount(res.data.data.todayDealsCount)
        // dispatch(productActions.addTopCategories(res.data.data));
        setTodayDealProducts(res.data.data.items.todayDeals);
        setNewArrivalsProducts(res.data.data.items.liveForSale);
      },

      onError: (err) => console.log("An error happened:", err.message),
    }
  );

  // useQueryEvents(
  //   useQuery(["getTrendingItems"], () => axiosInstance.get("/trending-items")),
  //   {
  //     onSuccess: (res) => {
  //       // dispatch(productActions.addProducts(res.data.data));
  //       // console.log(res.data.data, "topCategories");

  //       // dispatch(productActions.addTopCategories(res.data.data));
  //       setTrendingProducts(res.data.data);
  //     },

  //     onError: (err) => console.log("An error happened:", err.message),
  //   }
  // );

  return (
    <section className="">
      <Carousel />
      <div className="px-4 sml:px-6 lg:px-12 space-y-16">
        <TopCollection />
        {/* NEWSLETTERS */}
        <div
          className="bg-cover mxl:bg-center bg-no-repeat flex flex-wrap gap-8 lg:gap-0ā
          justify-evenly items-center px-4 sml:px-8 lg:px-0 py-24"
          style={{ backgroundImage: `url(${newsLetterBg})` }}
        >
          <div className="w-full lg:w-[45%] space-y-2">
            <h1 className="text-[#696969]">SUBSCRIBE TO OUR NEWSLETTERS </h1>
            <h4 className="text-[27px] leading-10 font-semibold">
              Keep up to Date with Our New Collection and Exclusive Offers
            </h4>
          </div>
          <div className="w-full lg:w-[45%] flex flex-wrap sml:flex-nowrap gap-3">
            <input
              type="text"
              className="outline-none p-3 border border-white text-white bg-transparent
              placeholder:text-white w-full placeholder:text-sm"
              placeholder="Your email Address"
            />
            <button className="bg-black text-white px-5 py-2 w-full sml:w-fit">
              Subscribe
            </button>
          </div>
        </div>

        {/* New Arrivals */}
        <div>
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-center text-3xl font-semibold">
                New Arrivals
              </h1>
              <h3 className="text-center">
                Get through all trending products and get your best deal.
              </h3>
            </div>
            {newArrivalsProducts.length > 0 && (
              <ul className="flex flex-wrap justify-between">
                {newArrivalsProducts.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </ul>
            )}
          </div>

          {/* See More Button */}

          {liveForSaleCount > 7 && (
            <div className="flex justify-center items-center  -translate-y-5">
              <div className=" flex justify-center items-center border px-8 py-3 mt-14 bg-ternary text-white rounded-full hover:bg-primary transition-all ease-linear duration-[400ms]">
                <Link
                  to={`/new-arrivals`}
                  className="
                "
                >
                  Load More
                </Link>
                <IoIosArrowRoundDown className="ml-2 text-[20px]" />
              </div>
            </div>
          )}
        </div>

        <div
          className="bg-cover mxl:bg-center bg-no-repeat flex flex-wrap gap-8 lg:gap-0ā
          justify-evenly items-center px-4 sml:px-8 lg:px-0 py-24"
          style={{ backgroundImage: `url(${newsLetterBg})` }}
        >
          <div className="w-full lg:w-[45%] space-y-2">
            <h1 className="text-[#696969]">SUBSCRIBE TO OUR NEWSLETTERS </h1>
            <h4 className="text-[27px] leading-10 font-semibold">
              Keep up to Date with Our New Collection and Exclusive Offers
            </h4>
          </div>
          <div className="w-full lg:w-[45%] flex flex-wrap sml:flex-nowrap gap-3">
            <input
              type="text"
              className="outline-none p-3 border border-white text-white bg-transparent
              placeholder:text-white w-full placeholder:text-sm"
              placeholder="Your email Address"
            />
            <button className="bg-black text-white px-5 py-2 w-full sml:w-fit">
              Subscribe
            </button>
          </div>
        </div>
        {/* Trending product */}
        <div>
          <div className="space-y-10">
            <div className="space-y-4">
              <h1 className="text-center text-3xl font-semibold">
                Today Deals
              </h1>
              <h3 className="text-center">
                Get through all trending products and get your best deal.
              </h3>
            </div>
            {/* {trendingProducts.length > 0 && (
              <ul className="flex flex-wrap justify-between">
                {todayDealProducts
                  ?.reverse()
                  .slice(0, 4)
                  .map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
              </ul>
            )} */}
            {todayDealProducts.length > 0 && (
              <ul className="flex flex-wrap justify-between">
                {todayDealProducts.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </ul>
            )}
          </div>

          {/* See More Button */}

          {todayDealsCount > 3 && (
            <div className="flex justify-center items-center mt-10 -translate-y-5">
              <div className=" flex justify-center items-center border px-8 py-3 mt-10 bg-ternary text-white rounded-full hover:bg-primary transition-all ease-linear duration-[400ms]">
                <Link
                  to={`/today-deals`}
                  className="
              "
                >
                  Load More
                </Link>
                <IoIosArrowRoundDown className="ml-2 text-[20px]" />
              </div>
            </div>
          )}
        </div>
        {/* Features List */}
        <ul className="flex flex-wrap justify-evenly pb-6">
          {featuresData.map(({ id, title, desc, image }) => (
            <li
              key={id}
              className="text-center space-y-1 w-full md:w-[27%] p-4 pb-16"
            >
              <img src={image} alt="" className="mx-auto mb-4" />
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-gray-500">{desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LandingPage;
