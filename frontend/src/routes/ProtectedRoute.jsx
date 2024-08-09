import { Navigate } from "react-router-dom";
import Loading from "../pages/Loading";
import { useAuth } from "../context/user";
import React from "react";
const ProtectedAdminRoute = ({ children }) => {
  const [state] = useAuth();
  console.log("here is the admin proteatacted route data:", state);
  if (state.loading == false) {
    if (!state.success) {
      return <Navigate to="/login" replace />;
    }
    return children;
  } else {
    <Loading />;
  }
};

export default ProtectedAdminRoute;
