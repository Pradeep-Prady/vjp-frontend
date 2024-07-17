import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, className, URL = "/" }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return !isAuthenticated ? (
    <Navigate to={URL} />
  ) : (
    <div className={`${className} `}>{children}</div>
  );
};

export default ProtectedRoute;
