import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';
import { injectIntl } from 'react-intl';

import Header from '../../components/Header';
import NotFound from '../misc/NotFound';
import routes from '../../routes';

class App extends React.PureComponent {
  componentDidMount() {
    document.querySelectorAll('body')[0].classList.add('loaded');
  }

  logOut() {
    localStorage.removeItem('tarelyJWTToken');
    window.location.href = '/';
  }

  renderRoutes() {
    return routes.map((route, i) => {
      return (
        <Route
          {...route}
          key={i}
        />
      )
    });
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
                {this.renderRoutes()}
                <Route
                  path="/logout"
                  render={this.logOut}
                />
                <Route
                  component={NotFound}
                />
              </AnimatedSwitch>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  globalError: state.app.globalError,
});

export default connect(mapStateToProps)(injectIntl(App));
