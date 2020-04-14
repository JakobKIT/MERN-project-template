import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadUser } from './actions/authActions';
import routes from './constants/routes.json';
import AuthRoute from './utils/AuthRoute';
import App from './containers/App';
import HomePage from './components/Home';

export function Routes(props) {
  useEffect(() => {
    props.onLoadUser();
  }, []);
  
  return (
    <App>
      <Switch>
        <AuthRoute path={routes.HOME} type="guest" component={HomePage} />
      </Switch>
    </App>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onLoadUser() {
    dispatch(loadUser());
  },
});

export default connect(null, mapDispatchToProps)(Routes);
