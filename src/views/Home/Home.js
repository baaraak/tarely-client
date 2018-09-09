import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';

import PageTitle from '../../components/PageTitle';
import ProductsListComponent from '../../components/ProductsListComponent';
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
    const { messages } = this.props.intl;
    this.Modal = Modal.confirm({
      title: messages["home.deleteProduct.modal.confirm"],
      content: messages["home.deleteProduct.modal.message"],
      okText: messages["button.delete"],
      cancelText: messages["button.cancel"],
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
        <PageTitle label={<FormattedMessage id="home.title" />} icon="home" />
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
)(injectIntl(Home));
