import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <AiOutlineLoading3Quarters className="text-primary animate-spin text-[32px]" />
    </div>
  );
};

export default Loading;
