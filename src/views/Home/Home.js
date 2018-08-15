import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Collapse } from 'antd';

import PageTitle from '../../components/PageTitle';
import ProductsListComponent from '../../components/ProductsListComponent';
import BidsListComponent from '../../components/BidsListComponent';
import { deleteProduct } from '../../redux/actions/home.actions';

import './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      searchText: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onDeleteProduct = this.onDeleteProduct.bind(this);
  }

  onChange(searchText) {
    this.setState({ searchText });
  }

  onDeleteProduct(productId) {
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
    this.props.deleteProduct(productId);
    if (this.Modal) this.Modal.destroy();
  }

  render() {
    const { products } = this.props.user;
    return (
      <div className="home">
        <PageTitle label="Home" icon="home" />
        <ProductsListComponent
          products={products}
          onDeleteProduct={this.onDeleteProduct}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(
  mapStateToProps,
  { deleteProduct }
)(Home);
