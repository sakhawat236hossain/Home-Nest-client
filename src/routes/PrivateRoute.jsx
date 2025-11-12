import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

import LoadingData from "../Components/LoadingData";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location =useLocation()
;
  if(loading){
    return <LoadingData></LoadingData>
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;
