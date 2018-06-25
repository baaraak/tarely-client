import React from 'react';
import {
  Form,
  Button,
  Icon,
  Select,
  Input,
  Card,
} from 'antd';

const FormItem = Form.Item;

class EditUserProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage && this.props.errorMessage !== nextProps.errorMessage) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="upload__form">
        <Card title="Product Details">
          <FormItem
            label="Email"
          >
            {getFieldDecorator('email', {
              initialValue: user.email,
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="First Name"
          >
            {getFieldDecorator('firstName', {
              initialValue: user.firstName,
              rules: [{
                required: true, message: 'Please input your first name!',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Last Name"
          >
            {getFieldDecorator('lastName', {
              initialValue: user.lastName,
              rules: [{
                required: true, message: 'Please input your last name',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Country"
          >
            {getFieldDecorator('counter', {
              initialValue: user.counter,
              rules: [{
                required: true, message: 'Please input your country',
              }],
            })(<Select />)}
          </FormItem>
        </Card>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="upload__form--button"
        >
          Next<Icon type="right" />
        </Button>
      </Form>
    );
  }
}


const WrappedEditUserProfileForm = Form.create()(EditUserProfileForm);

export default WrappedEditUserProfileForm;
