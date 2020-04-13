import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import LoginContainer from '../containers/auth/Login';
import RegisterContainer from '../containers/auth/Register';
import { login } from '../actions/authActions';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: true,
      userName: '',
      email: '',
      password: '',
      password2: '',
      msg: null,
    };
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    onLogin: PropTypes.func.isRequired,
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

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  switchForm(event) {
    this.setState({ isLogin: !this.state.isLogin });
  }

  login() {
    this.props.onLogin({
      email: 'test@example.com',
      password: 'Start123!'
    });
  }

  render() {
    const { isLogin } = this.state;
    return (
      <div className="container-fluid">
        { isLogin ? <LoginContainer 
          onChange={this.onChange.bind(this)}
          formSubmitted={this.login.bind(this)}
          /> 
          : <RegisterContainer
          onChange={this.onChange.bind(this)}
          formSubmitted={this.login.bind(this)}
          />
        }
        <div className="container">
          <a 
            className="p-2 badge badge-pill badge-primary text-light float-right mt-2 mr-2 pointer"
            onClick={this.switchForm.bind(this)}
          >
            { isLogin ? 'Need an account? Click here!' : 'Go to Login'}
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin(user) {
    dispatch(login(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
