import React from "react";
import { LazyMotion, AnimatePresence } from "framer-motion";

const FramerMotion = ({ children }) => {
  const loadFeatures = () => import("./features.js").then((res) => res.default);
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
};

export default FramerMotion;
