import React from 'react';
import { Switch } from 'react-router-dom';
import routes from './constants/routes.json';
import AuthRoute from './utils/AuthRoute';
import App from './containers/App';
import HomePage from './components/Home';

const Routes = () => (
  <App>
    <Switch>
      <AuthRoute path={routes.HOME} type="guest" component={HomePage} />
    </Switch>
  </App>
);

export default Routes;
