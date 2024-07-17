import React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

const Disclaimer = ({
  className,
  text = "",
  Icon = FaTriangleExclamation,
  bgClr = "bg-[#FDF0D5]",
  icnClr = "text-[#C07600]",
  txtClr = "text-[#7C5C37]",
}) => {
  return (
    <div className={`${bgClr} ${className} flex items-center  py-3 px-4 gap-3`}>
      <Icon className={`${icnClr} `} />
      <p className={`${txtClr} text-sm`}>{text}</p>
    </div>
  );
};

export default Disclaimer;
