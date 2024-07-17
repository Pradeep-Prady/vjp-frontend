import {
  FaHome,
  FaShoppingBag,
  FaCartPlus,
  FaList,
  FaUser,
} from "react-icons/fa";
import { BiSolidShoppingBags } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";

export const asideBarData = [
  {
    id: "abd_1",
    Icon: FaHome,
    text: "Dashboard",
    path: "/admin",
  },
  {
    id: "abd_2",
    Icon: FaShoppingBag,
    text: "Product",
    path: "/admin/products",
  },
  {
    id: "abd_3",
    Icon: FaCartPlus,
    text: "Add Product",
    path: "/admin/addproduct",
  },
  {
    id: "abd_4",
    Icon: FaList,
    text: "Categories",
    path: "/admin/category",
  },
  {
    id: "abd_5",
    Icon: TbCategoryPlus,
    text: "Sub Categories",
    path: "/admin/sub-category",
  },
  {
    id: "abd_6",
    Icon: BiSolidShoppingBags,
    text: "Orders",
    path: "/admin/orders",
  },
  {
    id: "abd_7",
    Icon: FaUser,
    text: "Users",
    path: "/admin/users",
  },
];
