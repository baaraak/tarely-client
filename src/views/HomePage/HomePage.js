import React from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';

import Login from './components/Login';
import Signup from './components/Signup';

import { login, signup } from '../../redux/actions/auth.actions';

import './homePage.css';

class HomePage extends React.Component {
  componentDidMount() {
    document.querySelectorAll('body')[0].classList.add('loaded');
  }

  componentWillMount() {
    // clean url
    window.history.replaceState(
      {},
      document.title,
      `${window.location.protocol}//${window.location.host}`
    );
  }

  render() {
    return (
      <div className="homePage">
        <Card title="Login">
          <Login submit={this.props.login} error={this.props.loginError} />
        </Card>
        <Card title="Sign up">
          <Signup submit={this.props.signup} error={this.props.signupError} />
        </Card>
      </div>
    );
  }
}

export default connect(
  store => ({
    loginError: store.auth.loginError,
    signupError: store.auth.signupError,
  }),
  { login, signup }
)(HomePage);
