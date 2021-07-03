import _ from 'lodash';
import React, { useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import { fetchSession } from '../../store/session/actions';
import { Switch, Route, Redirect } from 'react-router-dom';
import styles from './auth.module.less';
import { useDispatch, useSelector } from 'react-redux';
import Fallback from '../../containers/App/Fallback';

const Authentication = () => {

  const dispatch = useDispatch();
  const session = useSelector((globalState) => globalState.session);

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  if (session.loading) {
    return <Fallback active />;
  }

  if (!_.isEmpty(session.user)) {
    return <Redirect to="/drive" />;
  }

  return (
    <div className={styles.authContainer}>
      <Switch>
        <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/signUp" component={Register} />
        <Redirect path="/auth" to="/auth/login" />
      </Switch>
    </div>
  )
};

export default React.memo(Authentication);