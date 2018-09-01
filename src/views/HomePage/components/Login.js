import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { Form, Icon, Input, Button, Alert } from 'antd';

const FormItem = Form.Item;

class Login extends React.PureComponent {
  responseFacebook = (response) => {
    if (response && response.accessToken) {
      this.props.submit(response);
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { loginEmail, loginPassword } = values;
        this.props.submit({ email: loginEmail, password: loginPassword });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        {this.props.error && <Alert message={this.props.error} type="error" />}
        <FormItem label="Email">
          {getFieldDecorator('loginEmail', {
            rules: [{ required: true, message: 'Please input your email!' }],
          })(
            <Input
              id="loginEmail"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="email"
              placeholder="Email"
            />
          )}
        </FormItem>
        <FormItem label="Password">
          {getFieldDecorator('loginPassword', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              id="loginPassword"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </FormItem>

        <FormItem>
          <FacebookLogin
            appId="2232059320356745"
            fields="name,email,picture"
            callback={this.responseFacebook} />
        </FormItem>

      </Form>
    );
  }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;
