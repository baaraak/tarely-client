import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './Home';
import ResetPassword from './ResetPassword';


import './homePage.css';


class HomePage extends React.Component {
  redirect = () => {
    window.location = '/'
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/reset_password/:token" exact component={ResetPassword} />
          <Route render={this.redirect} />
        </Switch>
      </Router>
    );
  }
}

export default HomePage;