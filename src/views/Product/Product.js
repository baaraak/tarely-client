import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import ProductMenu from './ProductMenu';
import SwipingComponent from './Swipe/SwipingComponent';
import BrowseComponent from '../../components/Browse/BrowseComponent';
import MatchesComponent from './Matches/MatchesComponent';

import './productPage.css';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: this.props.match.params.view,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  componentWillMount() {
    if (!this.props.products.some(p => p._id === this.props.match.params.id)) {
      this.props.history.push('/');
    }
  }

  handleMenuClick({ key }) {
    if (key === this.state.currentView || !key) return;
    this.setState({ currentView: key });
  }

  render() {
    const { id } = this.props.match.params;
    const product = this.props.products.filter(p => p._id === id)[0];
    return (
      <div className="page productPage">
        <ProductMenu
          handleClick={this.handleMenuClick}
          currentView={this.state.currentView}
          id={id}
        />
        <Route
          path="/product/:id/swipe"
          exact
          render={() => (
            <SwipingComponent history={this.props.history} productId={id} />
          )}
        />
        <Route
          path="/product/:id/matches/:roomId?"
          exact
          render={() => (
            <MatchesComponent
              match={this.props.match}
              history={this.props.history}
              productId={id}
            />
          )}
        />
        <Route
          path="/product/:id/browse"
          exact
          render={() => (
            <BrowseComponent asProduct product={product} history={this.props.history} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.app.user.products,
  categories: state.app.categories,
});

export default connect(mapStateToProps)(Product);
