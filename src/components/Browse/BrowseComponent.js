import React from 'react';
import { connect } from 'react-redux';
// import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import isEqual from 'lodash/isEqual';
import { Modal } from 'antd';

import BrowseFilters from './BrowseFilters';
import BrowseList from './BrowseList';
import { getProductBrowse, handleSwipe } from '../../redux/actions/product.actions';
import ProductView from '../ProductView';

import './browse.css';

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
      currentProduct: null,
    };
    this.onChange = this.onChange.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.onClickProduct = this.onClickProduct.bind(this);
    this.onCloseProductView = this.onCloseProductView.bind(this);
    this.onLike = this.onLike.bind(this);
    this.onDislike = this.onDislike.bind(this);
  }

  componentWillMount() {
    const { search } = this.props.history.location;
    this.getProducts()
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

  getProducts() {
    const { search } = this.props.history.location;
    const path = !this.props.asProduct ? 'all' : this.props.product._id;
    let args = [path, search.slice(1)];
    this.props.getProductBrowse(...args);
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
    const { search } = this.props.history.location;
    const query = Object.keys(values).reduce((q, v) => {
      if (!q) {
        return `?${v}=${values[v]}`;
      }
      return q + `&${v}=${values[v]}`;
    }, '');

    if (query === decodeURIComponent(search))
      return;
    this.setState({ isLoading: true, currentProduct: null });
    this.props.history.push({ search: query });
    this.getProducts();
  }

  updateSearch() {
    this.createQuery();
  }

  resetSearch() {
    this.setState({ values: {} })
    this.createQuery({})
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

  onLike(productId) {
    const data = {
      direction: 'right',
      from: this.props.product._id,
      to: productId,
    };
    this.props.handleSwipe(data);
  }

  onDislike(productId) {
    const data = {
      direction: 'right',
      from: this.props.product._id,
      to: productId,
    };
    this.props.handleSwipe(data);
  }

  onDismatch() {
    console.log('on');
    this.Modal = Modal.confirm({
      title: 'Confirm',
      content:
        'Are u sure you want to delete this product?, this action is irreversible',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => this.handleDelete(productId),
    });
  }

  handleDelete(productId) {
    if (this.Modal) this.Modal.destroy();
  }


  render() {
    const { isLoading, values, currentProduct } = this.state;
    console.log('dakmd');
    return (
      <div className="browse">
        <BrowseFilters
          categories={this.props.categories}
          onChange={this.onChange}
          values={values}
          updateSearch={this.updateSearch}
          resetSearch={this.resetSearch}
          handleKeyPress={this.handleKeyPress}
        />
        <BrowseList
          isLoading={isLoading}
          onClick={this.onClickProduct}
          products={this.props.products}
          asProduct={this.props.product}
        />
        {currentProduct && (
          <ProductView
            product={currentProduct}
            onDismatch={this.onDismatch}
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
    handleSwipe,
  }
)(BrowseComponent);
