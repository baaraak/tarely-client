import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, InputNumber, Alert, message } from 'antd';
import { AwesomeButton } from 'react-awesome-button';

import SearchMenu from './SearchMenu';
import BrowseComponent from '../../components/Browse/BrowseComponent';
import { submitBid } from '../../redux/actions/product.actions';

import './search.css';

const Textarea = Input.TextArea;
const FormItem = Form.Item;

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

  handleSubmit(e) {
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
    const { id } = this.props.match.params;
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
        <Modal
          title="Send a bid"
          visible={!!this.state.bidProductID}
          maskClosable={false}
          footer={[
            <AwesomeButton size="small" className="btn-danger" action={this.handleCancel}>Cancel</AwesomeButton>,
            <AwesomeButton size="small" action={this.handleSubmit}>Send</AwesomeButton>,
          ]}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            {this.props.isBidSuccess === false && <Alert message="Something went wrong, please try again later" type="error" showIcon />}
            <FormItem label="Title" >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please add title!' }],
              })(
                <Input placeholder="Title" />
              )}
            </FormItem>
            <FormItem label="Description" >
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Add some text to describe your request' }],
              })(
                <Textarea />
              )}
            </FormItem>
            <FormItem label="Price" >
              {getFieldDecorator('price', {
                rules: [{ required: true, message: 'Add bid price' }],
              })(
                <InputNumber
                  max={100000}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
  }
}

const WrappedSearch = Form.create()(Search);

const mapStateToProps = (state) => ({
  isBidSuccess: state.product.isBidSuccess,
})

export default connect(mapStateToProps, { submitBid })(WrappedSearch);
