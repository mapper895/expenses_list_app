import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...properties }) => {
  const { user } = useAuth();

  if (user) {
    return <Route {...properties}>{children}</Route>;
  } else {
    return <Redirect to="iniciar-sesion" />;
  }
};

export default PrivateRoute;
