import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LoginContainer from '../containers/auth/Login';
import RegisterContainer from '../containers/auth/Register';
import { login, register } from '../actions/authActions';
import { validateEmail } from '../utils/Validations';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
    };
  }

  static propTypes = {
    error: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  render() {
    return (
      <div className="container">
        POSTS HERE
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    error: state.error,
});

/* const mapDispatchToProps = (dispatch) => ({
  onLogin(user) {
    dispatch(login(user));
  },
  onRegister(newUser) {
    dispatch(register(newUser));
  },
}); */

export default connect(mapStateToProps, null)(Post);
