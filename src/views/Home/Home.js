import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { AwesomeButton } from 'react-awesome-button';

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
      isModalOpen: false,
    };
    this.onChange = this.onChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  onChange(searchText) {
    this.setState({ searchText });
  }

  toggleModal(productId) {
    this.setState({ isModalOpen: this.state.isModalOpen ? false : productId });
  }

  handleDelete() {
    this.props.deleteProduct(this.state.isModalOpen);
    this.toggleModal();
  }

  render() {
    const { products } = this.props.user;
    const { messages } = this.props.intl;
    return (
      <div className="home">
        <PageTitle label={<FormattedMessage id="home.title" />} icon="home" />
        <ProductsListComponent
          products={products}
          onDeleteProduct={this.toggleModal}
        />
        <Modal
          visible={!!this.state.isModalOpen}
          onCancel={this.toggleModal}
          footer={[<AwesomeButton size="small" key={1} type="secondary" action={this.toggleModal} >Cancel</AwesomeButton>,
          <AwesomeButton key={2} size="small" className="btn-danger" action={this.handleDelete} >Delete</AwesomeButton>]}
        >
          <h2>{messages["home.deleteProduct.modal.confirm"]}</h2>
          <p dangerouslySetInnerHTML={{ __html: messages["home.deleteProduct.modal.message"] }} ></p>
        </Modal>
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
