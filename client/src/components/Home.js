import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

/*   static propTypes = {
    onLogin: PropTypes.func.isRequired,
  }; */

  render() {
    return (
      <div>
        Login
      </div>
    )
  };
}

const mapStateToProps = (state) => ({
    state
});

/* const mapDispatchToProps = (dispatch) => ({
  onLogin(user) {
    dispatch(login(user));
  },
}); */

export default connect(mapStateToProps, null)(Home);
