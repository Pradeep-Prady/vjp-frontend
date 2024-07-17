import { TfiLocationPin, TfiEmail } from "react-icons/tfi";
import { SlPhone } from "react-icons/sl";

import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa6";

export const footerData = {
  getInTouch: [
    {
      id: "fdId_1",
      Icon: TfiLocationPin,
      cntnt:
        "693, PPS Complex, Edayar St, Sukrawarpet, Town Hall, Coimbatore, Tamil Nadu 641001",
    },
    {
      id: "fdId_2",
      Icon: TfiEmail,
      cntnt: "contact@vjp.com",
    },
    {
      id: "fdId_3",
      Icon: SlPhone,
      cntnt: "+91 90474 54644",
    },
  ],
  information: [
    {
      id: "fDiId_1",
      title: "About Us",
      path: "/",
    },
    {
      id: "fDiId_2",
      title: "Our Mission",
      path: "/",
    },
    {
      id: "fDiId_3",
      title: "Blog",
      path: "/",
    },
    {
      id: "fDiId_4",
      title: "Contact Us",
      path: "/",
    },
  ],
  policies: [
    {
      id: "fPId_1",
      title: "Privacy Policy",
      path: "/",
    },
    {
      id: "fPId_2",
      title: "Terms & Conditions",
      path: "/",
    },
    {
      id: "fPId_3",
      title: "Return & Refund",
      path: "/",
    },
    {
      id: "fPId_4",
      title: "Shipping Policy",
      path: "/",
    },
  ],
  socials: [
    {
      id: "fCId_1",
      Icon: FaFacebookF,
      URL: "/",
    },
    {
      id: "fCId_2",
      Icon: FaXTwitter,
      URL: "/",
    },
    {
      id: "fCId_3",
      Icon: FaInstagram,
      URL: "/",
    },
    {
      id: "fCId_4",
      Icon: FaPinterest,
      URL: "/",
    },
    {
      id: "fCId_5",
      Icon: FaLinkedin,
      URL: "/",
    },
  ],
};

export const links = [
  {
    id: "lId_1",
    title: "Shop",
    path: "/",
  },
  {
    id: "lId_2",
    title: "About",
    path: "/",
  },
  {
    id: "lId_3",
    title: "Contact",
    path: "/",
  },
  {
    id: "lId_4",
    title: "Blog",
    path: "/",
  },
];
