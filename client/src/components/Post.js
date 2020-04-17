import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import PostNavigationContainer from '../containers/post/PostNavigation';
import PostListContainer from '../containers/post/PostList';

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: null,
    };
  }

  static propTypes = {
    error: PropTypes.object.isRequired
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
      <>
        <PostNavigationContainer />
        <div className="container-fluid">
          <PostListContainer />
        </div>
      </>
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
