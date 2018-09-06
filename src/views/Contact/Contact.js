import React from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Alert, Card } from 'antd';

const FormItem = Form.Item;

class Contact extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="container contact">
                <Card title="Contact us">
                    <p>f you need further information or if you want to tell us your opinion, please do not hesitate to get in touch with us! <br />We will be happy to help you!</p>
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

                    </Form>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.app.user
})

const WrappedContact = Form.create()(Contact);

export default connect(mapStateToProps)(WrappedContact);