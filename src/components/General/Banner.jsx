import React from "react";
import banner from "../../assets/bannerBg.jpg";
const Banner = ({ bannerBg = banner, text = "Banner", style, desc }) => {
  return (
    <div
      style={{ backgroundImage: `url(${bannerBg})` }}
      className={`bg-cover bg-no-repeat bg-center py-16
      relative ${style}`}
    >
      <div className="bg-black/50 absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className=" text-xl font-medium pb-3">{text}</h1>
        {desc && <p className="text-center w-[80%] text-[15px]">{desc}</p>}
      </div>
    </div>
  );
};

export default Banner;
