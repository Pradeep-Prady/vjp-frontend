import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { uiActions } from "../../../store/uiSlice";

const MenuItem = ({ id, URL, text, subMenu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [subMenuItems, setSubMenuItems] = useState(subMenu);
  const [isSubMenuVisible, setIsSubMenuVisible] = useState(
    subMenu ? false : null
  );

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const clickHandler = (redirect_to) => {
    navigate(redirect_to);
    dispatch(uiActions.menuBarHanlder());
    // window.scrollTo(0, 0);  -> COMMENTED BECAUSE SCROLL_RESTORATION HAS BEEN ADDED IN ROOTLAYOUT
  };

  // console.log(subMenuItems);
  // console.log(isAuthenticated);

  return (
    <>
      <li key={id} className={`space-y-5 py-3 border-b`}>
        <div className="">
          {subMenu ? (
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsSubMenuVisible((prev) => !prev)}
            >
              <h1>{text}</h1>
              {isSubMenuVisible ? (
                <FaAngleUp className="text-primary" />
              ) : (
                <FaAngleDown className="text-primary" />
              )}
            </div>
          ) : (
            <NavLink
              end
              to={URL}
              onClick={() => dispatch(uiActions.menuBarHanlder())}
              className={({ isActive }) =>
                `w-fit  hover:text-primary transition-all ease-linear ${
                  isActive &&
                  "text-primary/90 hover:underline underline-offset-[3px]"
                }`
              }
            >
              {text}
            </NavLink>
          )}
        </div>
        {subMenuItems && (
          <ul
            className={`px-2 md:px-4 divide-y pb-2 ${
              !isSubMenuVisible && "hidden"
            }`}
          >
            {subMenuItems.map(({ id, URL, text, subMenu }) => (
              <MenuItem key={id} subMenu={subMenu} text={text} URL={URL} />
            ))}
          </ul>
        )}
      </li>
    </>
  );
};

export default MenuItem;
