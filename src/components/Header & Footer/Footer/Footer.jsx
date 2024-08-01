import React from "react";
import footerImg1 from "../../../assets/vjp_logo_color.png";
import footerImg2 from "../../../assets/footer_img.png";
import { Link } from "react-router-dom";
import { footerData, links } from "./footerData";
import { useSelector } from "react-redux";

const Footer = () => {
  const { categories } = useSelector((state) => state.product);
  // console.log(products);

  return (
    <footer className="text-ternary w-full bg-[#F2F6F8] border-t text-[15px]">
      <section
        className="flex flex-wrap sml:justify-between 
        px-10 py-12 centerContainer"
      >
        <div className=" w-full lg:w-1/5 flex flex-col sml:flex-none gap-5 mb-5">
          <img
            src={footerImg1}
            alt=""
            className="w-52 mx-auto lg:mx-0 object-contain"
          />
          <ul className="space-y-5">
            {footerData.getInTouch.map(({ id, cntnt, Icon }) => (
              <li
                key={id}
                className="flex gap-3 items-center justify-center lg:justify-start"
              >
                <div>
                  <Icon className="scale-[1.2]" />
                </div>
                <h6 className="">{cntnt}</h6>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col gap-5 w-full md:w-1/3 lg:w-1/5 pb-8 lg:pb-0
      items-center lg:items-start text-center lg:text-left"
        >
          <h4 className="text-ternary text-xl font-semibold">Categories</h4>
          <ul className="space-y-1">
            {categories?.map((product) => (
              <li key={product?._id} className="capitalize">
                <Link to={`/products/${product?.category}`}>
                  {product?.title?.trim()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col gap-5 w-full md:w-1/3 lg:w-1/5 pb-8 lg:pb-0
      items-center lg:items-start text-center lg:text-left"
        >
          <h4 className="text-ternary text-xl font-semibold">Infomation</h4>
          <ul className="space-y-1">
            {footerData.information.map(({ id, path, title }) => (
              <li key={id}>
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col gap-5 w-full md:w-1/3 lg:w-1/5 pb-8 lg:pb-0
      items-center lg:items-start text-center lg:text-left"
        >
          <h4 className="text-ternary text-xl font-semibold">Policies</h4>
          <ul className="space-y-1">
            {footerData.policies.map(({ id, path, title }) => (
              <li key={id}>
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col gap-5 2 mx-auto w-full md:w-1/3 lg:w-1/5
      items-center lg:items-start text-center lg:text-left pb-8 lg:pb-0
      overflow-hidden"
        >
          <h4 className="text-ternary text-xl font-semibold">
            Connect With Us
          </h4>

          <ul className="space-y-1 flex items-center gap-7">
            {footerData.socials.map(({ id, Icon, URL }) => (
              <li key={id}>
                <a
                  href={URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-pink-600 transition-all ease-linear"
                >
                  <Icon className="scale-[1.7]" />
                </a>
              </li>
            ))}
          </ul>
          <h4 className="text-ternary text-xl font-semibold mt-2">
            Payment Methods
          </h4>
          <img src={footerImg2} alt="" className="" />
        </div>
      </section>
      <section className="bg-white px-10 py-5 text-[#9CA7AA] text-sm ">
        <div
          className="2xl:container mx-auto flex flex-wrap lg:flex-nowrap
    justify-center lg:justify-between gap-5"
        >
          <h6 className="w-full lg:1/2 text-center lg:text-left">
            Copyright © 2024{" "}
            <Link className="text-pink-600">VJP Enterprises</Link> all rights
            reserved. Powered by Shadow Arrow
          </h6>
          <ul className="flex gap-6 ">
            {links.map(({ id, path, title }) => (
              <li
                key={id}
                className="hover:text-pink-600 transition-all ease-linear"
              >
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
