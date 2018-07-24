import React from 'react';
import { connect } from 'react-redux';
// import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import isEqual from 'lodash/isEqual';

import BrowseFilters from './BrowseFilters';
import BrowseProductsList from './BrowseProductsList';
import { getProductBrowse } from '../../redux/actions/product.actions';
import ProductView from '../ProductView';

function getParamValueByName(name, query) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(query);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const FILTERS = ['category', 'minPrice', 'maxPrice', 'text', 'location'];

class BrowseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      values: {},
    };
    this.onChange = this.onChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.onClickProduct = this.onClickProduct.bind(this);
    this.onCloseProductView = this.onCloseProductView.bind(this);
  }

  componentWillMount() {
    const { search } = this.props.history.location;
    this.props.getProductBrowse(this.props.product._id, search.slice(1));
    if (search) this.parseQueryFilters(search);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading &&
      !isEqual(this.props.products, nextProps.products)
    ) {
      this.setState({ isLoading: false });
    }
  }

  parseQueryFilters(query) {
    const values = {};
    FILTERS.forEach(filterName => {
      const value = getParamValueByName(filterName, query);
      if (value) {
        values[filterName] = value;
      }
    });
    this.setState({ values });
  }

  onChange(fieldName, value) {
    const { values } = this.state;
    let newValue = {};
    switch (fieldName) {
      case 'text':
        newValue.text = value;
        break;
      case 'location':
        newValue.location = value;
        break;
      case 'minPrice':
        if (value !== undefined) newValue.minPrice = value;
        break;
      case 'maxPrice':
        newValue.maxPrice = value;
        break;
      case 'category':
        newValue.category =
          values.category && values.category.length
            ? values.category.split(',').indexOf(value.toString()) === -1
              ? `${values.category},${value}`
              : values.category
                .split(',')
                .filter(c => c !== value.toString())
                .toString()
            : value;
        break;
      default:
        return;
    }
    this.setState({ values: { ...this.state.values, ...newValue } });
  }

  createQuery(values = this.state.values) {
    const query = Object.keys(values).reduce((q, v) => {
      if (!q) {
        return `?${v}=${values[v]}`;
      }
      return q + `&${v}=${values[v]}`;
    }, '');

    if (query === decodeURIComponent(this.props.history.location.search))
      return;

    this.setState({ isLoading: true });
    this.props.history.push({ search: query });
    this.props.getProductBrowse(this.props.product._id, query.slice(1));
  }

  updateSearch() {
    this.createQuery();
  }

  resetSearch() {
    this.setState({ values: {} });
  }

  onClickProduct(productId) {
    const currentProduct = this.props.products.filter(
      p => p._id === productId
    )[0];
    this.setState({ currentProduct });
  }

  onCloseProductView() {
    this.setState({ currentProduct: null });
  }

  render() {
    const { isLoading, values, currentProduct } = this.state;
    return (
      <div className="productPage__browse">
        <BrowseFilters
          categories={this.props.categories}
          onChange={this.onChange}
          values={values}
          updateSearch={this.updateSearch}
          resetSearch={this.resetSearch}
          handleKeyPress={this.handleKeyPress}
        />
        <BrowseProductsList
          isLoading={isLoading}
          product={this.props.product}
          onClick={this.onClickProduct}
          products={this.props.products}
        />
        {currentProduct && (
          <ProductView
            product={currentProduct}
            categories={this.props.categories}
            onClose={this.onCloseProductView}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  products: state.product.browse,
  categories: state.app.categories,
});

export default connect(
  mapStateToProps,
  {
    getProductBrowse,
  }
)(BrowseComponent);
