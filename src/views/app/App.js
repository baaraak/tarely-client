import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/Header';
import Home from '../home/Home';
import NotFound from '../misc/NotFound';

import GlobalErrorDialog from '../../components/GlobalErrorDialog';

import {UNAUTHORIZED_REDIRECT_URL} from '../../services/constans';

import './app.css';

class App extends React.PureComponent {

  componentDidMount() {
    document.querySelectorAll('body')[0].classList.add('loaded');
  }

  unAuthorizeRedirect() {
    window.location.href = UNAUTHORIZED_REDIRECT_URL;
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <div className="appContent">
            <Switch>
              <Route exact path="/" component={Home}/>
              {/*<Route path="/users" component={UsersPage}/>*/}
              <Route component={NotFound}/>
            </Switch>
          </div>
          <GlobalErrorDialog
              handleClose={this.unAuthorizeRedirect}
              globalError={this.props.globalError}
            />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
};

App.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.app.user,
    globalError: state.app.globalError,
  };
};

export default connect(mapStateToProps)(App);
