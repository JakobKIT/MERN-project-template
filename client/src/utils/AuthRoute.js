/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

class AuthRoute extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };


  render() {
    const { type, auth } = this.props;

    if (type === 'guest' && auth.isAuthenticated) return <Redirect to="/user" />;
    if (type === 'private' && !auth.isAuthenticated) return <Redirect to="/" />;

    return <Route {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(AuthRoute);
