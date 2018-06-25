import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';
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

  handleMenuClick({ key }) {
    if (key === this.state.currentView || !key) return;
    this.setState({ currentView: key });
  }

  render() {
    return (
      <div className="page productPage">
        <ProductMenu
          handleClick={this.handleMenuClick}
          currentView={this.state.currentView}
          id={this.props.match.params.id}
        />

        <Route
          path="/product/:id/swipe"
          exact
          render={() =>
            <SwipingComponent productId={this.props.match.params.id} />
        }
        />
        <Route path="/product/:id/browse" exact component={BrowseComponent} />
        <Route path="/product/:id/matches" exact component={MatchesComponent} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.app.user.products,
  categories: state.app.categories,
});

export default connect(mapStateToProps)(Product);
