import React from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const Breadcrumbs = ({
  currentPage,
  style,
  bldInPdng = true,
  group = "user",
}) => {
  return (
    <div
      className={`${
        bldInPdng && "pdngx"
      } flex items-center gap-3 py-4 text-[15px] bg-[#F6F6F8] ${style}`}
    >
      <Link
        to={group === "user" ? "/" : "/admin"}
        className="text-gray-500 hover:underline transition-all ease-linear"
      >
        Home
      </Link>
      {currentPage && (
        <ul className="flex items-center gap-3">
          {currentPage.map(({ URL, text }, index) => (
            <li className="flex items-center gap-3" key={index}>
              <FaAngleRight className="text-gray-500 scale-90" />
              {URL ? (
                <Link
                  to={URL}
                  className="text-gray-500 hover:underline transition-all ease-linear"
                >
                  {text}
                </Link>
              ) : (
                <h3>{text}</h3>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Breadcrumbs;
