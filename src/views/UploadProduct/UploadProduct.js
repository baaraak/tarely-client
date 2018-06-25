import React from 'react';
import { connect } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import UploadProductForm from './UploadProductForm';

import { uploadProduct } from '../../redux/actions/product.actions';

import './uploadProduct.css';

class UploadProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.productId && this.props.productId === null) {
      this.props.history.push(`/product/${nextProps.productId}/swipe`);
    }
    if (nextProps.errorMessage) {
      this.setState({ errorMessage: nextProps.errorMessage });
    }
  }


  render() {
    return (
      <div className="upload page">
        <PageTitle label="Upload Product" icon="upload" />
        <UploadProductForm
          errorMessage={this.state.errorMessage}
          categories={this.props.categories}
          onSubmit={this.props.uploadProduct}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.app.categories,
  productId: state.product.productId,
  errorMessage: state.product.errorMessage,
});

export default connect(mapStateToProps, { uploadProduct })(UploadProduct);
