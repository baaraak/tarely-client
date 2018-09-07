import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Alert, Card } from 'antd';

import { validateToken, resetPassword } from '../../redux/actions/user.actions';

const FormItem = Form.Item;

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    componentWillMount() {
        this.props.validateToken(this.props.match.params.token)
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.validateTokenResult !== nextProps.validateTokenResult) {
            this.setState({ isLoading: false }, () => {
                document.querySelectorAll('body')[0].classList.add('loaded');
                if (this.props.validateTokenResult === false) {
                    setTimeout(() => this.props.history.replace('/'), 5000)
                }
            });
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.password !== values.confirm) return
                this.props.resetPassword({ password: values.password, token: this.props.match.params.token });
            }
        });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    renderChangePasswordMessageResult() {
        if (this.props.resetPasswordResult === null) return null;
        if (typeof this.props.resetPasswordResult === 'string') return <Alert message={this.props.resetPasswordResult} type="error" />
        if (this.props.resetPasswordResult === true) return <Alert
            message={<div>Password changed succeffuly! <Link to="/">Click here</Link> to login.</div>} type="success"
        />
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.state.isLoading) return null;
        return (
            <div className="container resetPassword">
                {this.props.validateTokenResult ?
                    <Card title="Reset Password">
                        <div className="explain">Enter new password</div>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            {this.renderChangePasswordMessageResult()}
                            <FormItem
                                label="New Password"
                            >
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: 'Please input new password!',
                                    }],
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="New Password"
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                label="Confirm Password"
                            >
                                {getFieldDecorator('confirm', {
                                    rules: [{
                                        required: true, message: 'Please confirm your password!',
                                    }, {
                                        validator: this.compareToFirstPassword,
                                    }],
                                })(
                                    <Input type="password" placeholder="Confirm Password" />
                                )}
                            </FormItem>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                Change Password
                    </Button>
                        </Form>
                    </Card>
                    :
                    <Card title="Invalid Token">
                        <div>You will be redirected in 5 seconds...</div>
                        <div>or <Link to="/">click here.</Link> to go back.</div>
                    </Card>}
            </div >
        );
    }
}

const mapStateToProps = state => ({
    validateTokenResult: state.user.validateTokenResult,
    resetPasswordResult: state.user.resetPasswordResult
})

const WrappedResetPassword = Form.create()(ResetPassword);

export default connect(mapStateToProps, { validateToken, resetPassword })(WrappedResetPassword);