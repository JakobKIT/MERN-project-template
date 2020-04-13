import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../actions/authActions';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  };

  login() {
    this.props.onLogin({
      email: 'test@example.com',
      password: 'Start123!'
    });
  }

  render() {
    return (
      <div>
        Login
        <button onClick={this.login.bind(this)}></button>
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
    state
});

const mapDispatchToProps = (dispatch) => ({
  onLogin(user) {
    dispatch(login(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
