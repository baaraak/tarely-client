import React from 'react';
import { Form, Icon, Input, Button, Alert } from 'antd';

const FormItem = Form.Item;

class ForgotPassword extends React.PureComponent {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.submit(values.email);
            }
        });
    };

    renderMessage = () => {
        if (this.props.error === null) return null;
        if (typeof this.props.error === 'string') return <Alert message={this.props.error} type="error" />
        if (this.props.error === false) return <Alert message="An email has been sent to you with password reset instructions" type="success" />
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                {this.renderMessage()}
                <FormItem label="Email">
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email!' }],
                    })(
                        <Input
                            id="emai"
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="email"
                            placeholder="Enter your email address"
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Submit
          </Button>
                </FormItem>

            </Form>
        );
    }
}

const WrappedForgotPassword = Form.create()(ForgotPassword);

export default WrappedForgotPassword;
