import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, InputNumber, Alert, message } from 'antd';

import SearchMenu from './SearchMenu';
import BrowseComponent from '../../components/Browse/BrowseComponent';
import { submitBid } from '../../redux/actions/product.actions';
import SendBidModal from './component/SendBidModal';
import './search.css';



class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bidProductID: null,
    };
    this.onBid = this.onBid.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isBidSuccess === null && nextProps.isBidSuccess !== this.props.isBidSuccess) {
      this.handleBidResponse(nextProps.isBidSuccess);
    }
  }

  handleBidResponse(isSuccess) {
    if (isSuccess) {
      message.success('Bid sent!');
      this.setState({ bidProductID: null })
      this.props.form.resetFields()
    }
  }

  onBid(productID) {
    this.setState({ bidProductID: productID });
  }

  handleSubmit(e, submit) {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submitBid({ ...values, productID: this.state.bidProductID })
      }
    });
  }

  handleCancel() {
    this.setState({ bidProductID: null })
    this.props.form.resetFields()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page search">
        <SearchMenu
          id={this.props.history.location.pathname.substring(1)}
        />
        <BrowseComponent
          asProduct={false}
          onBid={this.onBid}
          history={this.props.history}
        />
        <SendBidModal
          getFieldDecorator={getFieldDecorator}
          bidProductID={this.state.bidProductID}
          handleCancel={this.handleCancel}
          handleSubmit={this.handleSubmit}
          isBidSuccess={this.props.isBidSuccess}
        />
      </div>
    )
  }
}

const WrappedSearch = Form.create()(Search);

const mapStateToProps = (state) => ({
  isBidSuccess: state.product.isBidSuccess,
})

export default connect(mapStateToProps, { submitBid })(WrappedSearch);
