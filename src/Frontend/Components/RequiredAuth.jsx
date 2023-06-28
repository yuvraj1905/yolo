import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RequiredAuth = ({ children }) => {
  const {
    authState: { token },
  } = useAuthContext();
  const location = useLocation();
  return (
    <>
      {token ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location.pathname }} />
      )}
    </>
  );
};

export default RequiredAuth;
