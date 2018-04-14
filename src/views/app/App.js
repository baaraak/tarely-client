import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../components/header/Header';
// import Footer from '../../components/footer/Footer';
import Home from '../home/Home';
import NotFound from '../misc/NotFound';

import './app.css';

class App extends React.PureComponent {

  componentWillReceiveProps(newProps) {
  	if (newProps.globalError !== null) {

    }
  }

  componentDidMount() {
    document.querySelectorAll('body')[0].classList.add('loaded');
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Header likes={2} messages={0} />
          <div className="appContent">
            <Switch>
              <Route exact path="/" component={Home}/>
              {/*<Route path="/users" component={UsersPage}/>*/}
              <Route component={NotFound}/>
            </Switch>
          </div>
          {/*<Footer/>*/}
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
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
