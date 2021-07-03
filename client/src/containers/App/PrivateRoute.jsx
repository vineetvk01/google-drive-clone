import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSession } from '../../store/session/actions';
import Fallback from "./Fallback";
// import Layout from "../layouts";

const PrivateRoute = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const session = useSelector((globalState) => globalState.session);

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  if (session.loading) {
    return <Fallback active />;
  }

  if (isEmpty(session.user)) {
    return <Redirect to="/auth/login" />;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div>
      <Route {...props}>{React.cloneElement(children, props)}</Route>
    </div>
  );
};

export default PrivateRoute;
