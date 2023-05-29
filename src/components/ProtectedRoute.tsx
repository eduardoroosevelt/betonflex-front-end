import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // if (!isAuthenticated) {
  //   return <Navigate to="/" />;
  // }

  return <>{children}</>;
};
