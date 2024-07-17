import productImg1 from "../assets/product1.jpg";


// AD TILE
import adTile7 from "../assets/adtiles/ad-tile7.png";
import adTile8 from "../assets/adtiles/ad-tile8.png";

export const productData = {
  discountPercentage: 32,
  itemId: "Q0LaWRmxoV",
  subCategory: "",
  highlights: {
    Material: "Stick",
    Shape: "Bamboo Toothpicks",
    "Packaging Type": "Boxed",
    "Packaging Size": "260 Pieces",
    Weight: "30 g",
  },
  actualPrice: 55,
  itemTitle: "Dustpan And Brush Set",
  discountPrice: 1987,
  isSale: true,
  itemDescription:
    "At first, you may find yourself feeling reluctant to actually chop, slice or dice anything on these carefully made black walnut boards. Perfect for pairing with denim and white kicks for a stylish sporty vibe. You would not be alone...",
  itemImage: [
    productImg1,
    "https://firebasestorage.googleapis.com/v0/b/vjp-enterprices.appspot.com/o/products%2FKitchen%20Accessories%2F1.Wooden%20Toothpicks%20Stick%2F01.jpg?alt=media&token=3c307f52-77e0-434f-98de-3949b4f019b5",
    "https://firebasestorage.googleapis.com/v0/b/vjp-enterprices.appspot.com/o/products%2FKitchen%20Accessories%2F1.Wooden%20Toothpicks%20Stick%2F02.jpg?alt=media&token=112e962c-d39d-41a8-8277-769409a3d6e3",
  ],
};

// PRODUCT LAYOUT DATA
export const categoryItems = [
  {
    id: "ctgyId_0",
    link_to: "/products/all-products",
    title: "All Products",
  },
  // {
  //   id: "ctgyId_1",
  //   link_to: "/products/air-conditioner",
  //   title: "Air conditioner",
  // },
  // {
  //   id: "ctgyId_2",
  //   link_to: "/products/audio-video",
  //   title: "Audio & video",
  // },
  // {
  //   id: "ctgyId_3",
  //   link_to: "/products/gadgets",
  //   title: "Gadgets",
  // },
  // {
  //   id: "ctgyId_4",
  //   link_to: "/products/home-appliances",
  //   title: "Home appliances",
  // },
  // {
  //   id: "ctgyId_5",
  //   link_to: "/products/kitchen-appliances",
  //   title: "kitchen appliances",
  // },
  // {
  //   id: "ctgyId_6",
  //   link_to: "/products/pc-laptop",
  //   title: "PCs & laptop",
  // },
  // {
  //   id: "ctgyId_7",
  //   link_to: "/products/refrigerator",
  //   title: "Refrigerator",
  // },
  // {
  //   id: "ctgyId_8",
  //   link_to: "/products/smart-home",
  //   title: "Smart home",
  // },
  {
    id: "ctgyId_9",
    link_to: "/products/kitchen",
    title: "Kitchen",
  },
  {
    id: "ctgyId_10",
    link_to: "/products/kitchen-accessories",
    title: "Kitchen Accessories",
  },
  {
    id: "ctgyId_11",
    link_to: "/products/flooring",
    title: "Flooring",
  },
  {
    id: "ctgyId_12",
    link_to: "/products/bathing",
    title: "Bathing",
  },
];

export const additionlInfoData = [
  {
    id: "aidId_1",
    text: "Details",
    action: "details",
  },
  {
    id: "aidId_2",
    text: "More Information",
    action: "moreInfo",
  },
  {
    id: "aidId_3",
    text: "Warrenty & Shipping",
    action: "warntyAndShipng",
  },
];


export const adTiles = [
  {
    id: "adId_1",
    adTileURL: adTile7,
    adURL: "/today-deals",
  },
  {
    id: "adId_2",
    adTileURL: adTile8,
    adURL: "/new-arrivals",
  },
];