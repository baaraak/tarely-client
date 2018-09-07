import React from 'react';
import { Form, Icon, Input, Button, Select, Alert } from 'antd';

import countries from '../../../../services/countries.json';

const FormItem = Form.Item;
const Option = Select.Option;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.submit(values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.props.error && <Alert message={this.props.error} type="error" />}
        <FormItem label="Email">
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem label="First name">
          {getFieldDecorator('firstName', {
            rules: [
              { required: true, message: 'Please input your first name!' },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="First name"
            />
          )}
        </FormItem>
        <FormItem label="Last name">
          {getFieldDecorator('lastName', {
            rules: [
              { required: true, message: 'Please input your last name!' },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="text"
              placeholder="Last name"
            />
          )}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { min: 6 },
              { max: 20 },
            ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem label="Country">
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'Please input your country!' }],
          })(
            <Select
              showSearch
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              placeholder="Choose country"
            >
              {countries.map(c => (
                <Option key={c.value} value={c.value}>
                  {c.label}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Signup
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedSignup = Form.create()(Signup);

export default WrappedSignup;
