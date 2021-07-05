import React from "react";

const DriveView = React.lazy(() => import("../../views/Drive/index"));
const AuthenticationView = React.lazy(() => import("../../views/Authentication/index"));

const routes = {
  auth: {
    path: "/auth",
    component: AuthenticationView,
    roles: [],
    exact: false,
  },
  drive: {
    path: "/drive",
    component: DriveView,
    roles: ['user'],
    exact: false,
  },
};

export default routes;
