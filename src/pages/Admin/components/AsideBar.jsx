import React from "react";
import logo from "../../../assets/vjp_logo_color.png";
import { CgMenuRightAlt, CgMenuLeftAlt } from "react-icons/cg";
import { asideBarData } from "../data";
import { NavLink } from "react-router-dom";

const AsideBar = ({ isOpen, setIsOpen }) => {
  return (
    <aside
      className={`h-screen border sticky top-0 p-2 space-y-3 ${
        isOpen ? "w-[19%]" : "w-[5%]"
      }`}
    >
      <div
        className={`flex ${
          isOpen ? "justify-between" : "justify-center"
        } items-center py-3`}
      >
        {isOpen && (
          <img
            src={logo}
            alt="VJP Admin Logo"
            loading="lazy"
            className="object-contain w-40"
          />
        )}
        <button
          className={`p-1 h-fit scale-[1.5] rounded hover:bg-[#EBF0FD] transition-all ease-linear
          ${isOpen ? "-translate-x-1" : ""}`}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {isOpen ? (
            <CgMenuRightAlt className="text-ternary" />
          ) : (
            <CgMenuLeftAlt className="text-ternary" />
          )}
        </button>
      </div>
      <ul className="space-y-2">
        {asideBarData.map(({ id, Icon, path, text }) => (
          <li key={id} className="">
            <NavLink
              end
              to={path}
              className={({ isActive }) =>
                `w-full rounded hover:bg-[#EBF0FD] transition-all ease-linear
              flex items-center gap-3 p-3 ${isActive && "bg-[#EBF0FD]"}
              ${!isOpen && "justify-center"} `
              }
            >
              <Icon className="scale-125 text-primary/90" />
              {isOpen && <h1 className="font-medium text-ternary">{text}</h1>}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AsideBar;
