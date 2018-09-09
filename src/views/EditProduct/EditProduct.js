import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { message } from 'antd';
import { injectIntl } from 'react-intl';

import PageTitle from '../../components/PageTitle';
import EditProductForm from './EditProductForm';

import { updateProduct } from '../../redux/actions/product.actions';

class EditProduct extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.editProductSuccess === null &&
      this.props.editProductSuccess !== nextProps.editProductSuccess
    ) {
      if (typeof nextProps.editProductSuccess === 'string') {
        message.error(nextProps.editProductSuccess);
      } else {
        message.success('Product updated successfully');
      }
    }
  }

  getProduct() {
    return (
      this.props.products.filter(
        p => p._id === this.props.match.params.id
      )[0] || null
    );
  }
  render() {
    const product = this.getProduct();
    if (!product) return <Redirect to="/" />;
    const token = localStorage.getItem('tarelyJWTToken');
    return (
      <div className="editProduct page">
        <PageTitle label={this.props.intl.messages[""]} icon="edit" />
        <EditProductForm
          onSubmit={this.props.updateProduct}
          categories={this.props.categories}
          token={token}
          product={product}
          intl={this.props.intl}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.app.user.products,
  categories: state.app.categories,
  editProductSuccess: state.product.editProductSuccess,
});

export default connect(
  mapStateToProps,
  { updateProduct }
)(injectIntl(EditProduct));
