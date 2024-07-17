import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseOutline, IoLogOutOutline } from "react-icons/io5";
import { uiActions } from "../../../store/uiSlice";
import { menuBarData } from "./headerData";
import MenuItem from "./MenuItem";
import { m } from "framer-motion";
import { userActions } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isOpen = useSelector((state) => state.ui.showMenuBar);

  const logoutHandler = () => {
    dispatch(userActions.logOutUser());
    dispatch(uiActions.menuBarHanlder());
    navigate("/");
  };
  return (
    <menu
      className={`fixed z-50 bg-black/50 w-full h-full overflow-y-hidden flex lg:hidden scrollbar-hide
      sml:text-xl text-ternary`}
    >
      {isOpen && (
        <m.div
          className="w-[70%] mxl:w-[60%] lgl:w-[46%] bg-white h-full space-y-0 sml:space-y-4
          overflow-y-scroll scrollbar-hide"
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", bounce: 0.3, damping: 14 }}
        >
          <div className="flex justify-between items-center bg-lblack text-white p-3 sml:p-5">
            <h1 className="">Menu</h1>
            <button
              className="flex justify-end w-fit"
              onClick={() => dispatch(uiActions.menuBarHanlder())}
            >
              <IoCloseOutline className="scale-[1.5] sml:scale-[2]" />
            </button>
          </div>
          {/* Close Button */}

          {/* Menu Items */}
          <ul className="font-medium divide- p-3 sml:p-5">
            {menuBarData.map(({ id, URL, text, subMenu }) => (
              <MenuItem key={id} subMenu={subMenu} text={text} URL={URL} />
            ))}
          </ul>

          <div className=" font-medium p-3 sml:p-5">
            <button
              className="flex justify-between items-center w-full
          hover:text-primary transition-all ease-linear"
              onClick={logoutHandler}
            >
              <span>Logout</span>
              <IoLogOutOutline className="scale-[1.3] sml:scale-[1.5]" />
            </button>
          </div>
        </m.div>
      )}
      <div
        className="w-[30%] mxl:w-[40%] lgl:w-[54%]"
        // onClick={() => dispatch(uiActions.menuBarHanlder())}
      />
    </menu>
  );
};

export default MenuBar;

{
  /* <menu */
}
