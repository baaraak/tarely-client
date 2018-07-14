import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import ProductMenu from './ProductMenu';
import SwipingComponent from './Swipe/SwipingComponent';
import BrowseComponent from './Browse/BrowseComponent';
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
          render={() =>
            <SwipingComponent productId={id} />
        }
        />
        <Route
          path="/product/:id/matches"
          exact
          render={() =>
            <MatchesComponent productId={id} />
        }
        />
        <Route path="/product/:id/browse" exact component={BrowseComponent} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.app.user.products,
  categories: state.app.categories,
});

export default connect(mapStateToProps)(Product);
