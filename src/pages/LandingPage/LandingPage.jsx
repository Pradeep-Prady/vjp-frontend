import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel/Carousel";
import newsLetterBg from "../../assets/Newsletter-banner.jpg";
import ProductItem from "../../components/Product/ProductItem";
import { featuresData } from "../../data/featuresData";
import TopCollection from "./components/TopCollection";
import { useSelector } from "react-redux";
import { selectRandomElements } from "../../utils/helperFunction";

const LandingPage = () => {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const allCategories = useSelector((state) => state.product.products);

  useEffect(() => {
    if (allCategories.length > 0) {
      console.log(allCategories);
      allCategories.forEach((category) =>
        category.items.forEach(
          (product) =>
            product.isTrending &&
            setTrendingProducts((prevState) => [...prevState, product])
        )
      );
    }
  }, [allCategories]);
  console.log(trendingProducts);

  return (
    <section className="">
      <Carousel />
      <div className="px-4 sml:px-6 lg:px-12 space-y-16">
        <TopCollection />
        {/* NEWSLETTERS */}
        <div
          className="bg-cover mxl:bg-center bg-no-repeat flex flex-wrap gap-8 lg:gap-0
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
              <h1 className="text-center text-4xl font-semibold">
                Trending product
              </h1>
              <h3 className="text-center">
                Get through all trending products and get your best deal.
              </h3>
            </div>
            {trendingProducts.length > 0 && (
              <ul className="flex flex-wrap justify-between">
                {trendingProducts
                  .slice()
                  .sort(() => 0.5 - Math.random())
                  .slice(0, 8)
                  ?.map((product) => (
                    <ProductItem key={product._id} product={product} />
                  ))}
              </ul>
            )}
          </div>
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
