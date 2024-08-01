import React from "react";
import { m } from "framer-motion";

const CarouselItem = ({ URL,textColor }) => {
  return (
    <li className="w-full relative">
      <img
        src={URL}
        alt=""
        className="m-auto max-h-full w-full max-w-full object-cover object-center"
      />
      {/* <div className="absolute inset-0 flex items-center p-3 sm:p-10 md:p-28">
        <div>
          <m.h1
            className={`text-[20px] md:text-[32px] lg:text-[68px] md:w-9/12 lg:w-1/2 ${textColor} leading-tight`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            "Breathe Fresh: Transform Your Space{" "}
            <span className="md:font-bold">Instantly</span>"
          </m.h1>
          <div className="flex my-2 md:my-5 lg:my-10">
            <m.h1
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className=" px-3 md:px-5 lg:px-10 py-1 md:py-2 lg:py-3 text-[13px] md:text-[16px] lg:text-[20px] font-medium md:font-semibold bg-blue-500 text-white"
            >
              Button
            </m.h1>
          </div>
        </div>
      </div> */}
    </li>
  );
};

export default CarouselItem;
