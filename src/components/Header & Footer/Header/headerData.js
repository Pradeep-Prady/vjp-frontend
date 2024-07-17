export const navBarData = [
  {
    id: "nbId_1",
    title: "Home",
    path: "/",
  },
  {
    id: "nbId_2",
    title: "Products",
    path: "/products/all-products",
  },
  {
    id: "nbId_4",
    title: "New Arrivals",
    path: "/new-arrivals",
  },
  {
    id: "nbId_5",
    title: "Today Deals",
    path: "/today-deals",
  },
  // {
  //   id: "nbId_3",
  //   title: "Blog",
  //   path: "/blog",
  // },
  // {
  //   id: "nbId_6",
  //   title: "Contact US",
  //   path: "/contact-us",
  // },
];

export const menuBarData = [
  {
    id: "mbd_1",
    URL: "/",
    text: "Home",
    subMenu: null,
  },
  {
    id: "mbd_2",
    URL: "/products/all-products",
    text: "Products",
    subMenu: null,
  },
  // {
  //   id: "mbd_3",
  //   URL: null,
  //   text: "Services",
  //   subMenu: [
  //     {
  //       id: "ssbm_1",
  //       URL: "/services",
  //       text: "Our Services",
  //       subMenu: null,
  //     },
  //     {
  //       id: "ssbm_2",
  //       URL: null,
  //       text: "Service List",
  //       subMenu: [
  //         {
  //           id: "ssbmsbm_1",
  //           URL: "/web-design-and-development",
  //           text: "Web Design",
  //           subMenu: null,
  //         },
  //         {
  //           id: "ssbmsbm_2",
  //           URL: "/services/ui-ux",
  //           text: "UI / UX",
  //           subMenu: null,
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    id: "mbd_5",
    URL: "/new-arrivals",
    text: "New Arrivals",
    subMenu: null,
  },
  {
    id: "mbd_6",
    URL: "/today-deals",
    text: "Today Deals",
    subMenu: null,
  },
  {
    id: "mbd_4",
    // "/pages"
    URL: null,
    text: "User",
    subMenu: [
      // Team, Portfolio, FAQ
      {
        id: "sm_1",
        URL: "/customer/account",
        text: "Account",
        subMenu: null,
      },
      {
        id: "sm_2",
        URL: "/customer/wish-list",
        text: "Wishlist",
        subMenu: null,
      },
      {
        id: "sm_3",
        URL: "/cart",
        text: "Cart",
        subMenu: null,
      },
    ],
  },
];
