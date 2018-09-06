import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';

import Header from '../../components/Header';
import Home from '../Home/Home';
import Product from '../Product/Product';
import Settings from '../Settings/Settings';
import Contact from '../Contact/Contact';
import UploadProduct from '../UploadProduct/UploadProduct';
import EditProduct from '../EditProduct/EditProduct';
import UserProfile from '../UserProfile/UserProfile';
import NotFound from '../misc/NotFound';

class App extends React.PureComponent {
  componentDidMount() {
    document.querySelectorAll('body')[0].classList.add('loaded');
  }

  logOut() {
    localStorage.removeItem('tarelyJWTToken');
    window.location.href = '/';
  }

  render() {
    return (
      <Router>
        <div className="appContainer">
          <Header />
          <div className="appContent">
            <Switch>
              <AnimatedSwitch
                atEnter={{ opacity: 0 }}
                atLeave={{ opacity: 0 }}
                atActive={{ opacity: 1 }}
                className="switch-wrapper"
              >
                <Route exact path="/" component={Home} />
                <Route exact path="/upload" component={UploadProduct} />
                <Route exact path="/product/edit/:id" component={EditProduct} />
                <Route exact path="/product/:id" component={Product} />
                <Route exact path="/product/:id/:view" component={Product} />
                <Route
                  exact
                  path="/product/:id/:view/:roomId"
                  component={Product}
                />
                <Route path="/user/profile/" component={UserProfile} />
                <Route path="/user/settings/" component={Settings} />
                {/* <Route path="/search" component={Search} /> */}
                {/* <Route path="/bids" component={Bids} /> */}
                <Route path="/contact" component={Contact} />
                <Route path="/logout" render={this.logOut} />
                <Route component={NotFound} />
              </AnimatedSwitch>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {};

App.contextTypes = {
  store: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalError: state.app.globalError,
});

export default connect(mapStateToProps)(App);
