import React from 'react';
import _ from "lodash";
import Fallback from './Fallback';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import routes from './routes';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
        {_.map(routes, (route) => {
          const Component = route.component;
          const allowedRoles = _.get(route, "roles", []);
          const RouteForPath =
            allowedRoles.length > 0 ? PrivateRoute : PublicRoute;
          return (
            <RouteForPath
              key={route.path}
              path={route.path}
              exact={route.exact}
            >
              <React.Suspense
                fallback={() => (
                  <Fallback />
                )}
              >
                <Component path={route.path} />
              </React.Suspense>
            </RouteForPath>
          );
        })}
        <PublicRoute path="/" exact>
          <Redirect path="/" to="/auth" />      
        </PublicRoute>
        </Switch>
      </div>
    </Router>
  )
}

export default App;