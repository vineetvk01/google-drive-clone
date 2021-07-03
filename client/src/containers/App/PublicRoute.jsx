import React from "react";
import { Route } from "react-router-dom";

const PublicRoute = ({ children, ...props }) => {
  return <Route {...props}>{children}</Route>;
};

export default PublicRoute;
