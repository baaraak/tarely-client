import React from 'react';
import { Form, Input, Icon, Button, Alert } from 'antd';

const FormItem = Form.Item;

class ChangePasswordForm extends React.PureComponent {

    state = {
        confirmDirty: false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.onSubmit(values);
            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    renderResponseMessage() {
        if (this.props.changePasswordResult === null) return null;
        if (typeof this.props.changePasswordResult === 'string') return <Alert message={this.props.changePasswordResult} type="error" />
        if (this.props.changePasswordResult === true) return <Alert
            message="Password changed succeffuly!" type="success" closable
        />
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form className="change_password" onSubmit={this.handleSubmit}>
                {this.renderResponseMessage()}
                <FormItem label="Old Password">
                    {getFieldDecorator('oldPassword', {
                        rules: [
                            { required: true, message: 'Please input your old password!' },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Old Password"
                        />
                    )}
                </FormItem>

                <FormItem
                    label="New Password"
                >
                    {getFieldDecorator('newPassword', {
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
                        }, { validator: this.compareToFirstPassword }],
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
        );
    }
}

const WrappedChangePasswordForm = Form.create()(ChangePasswordForm);

export default WrappedChangePasswordForm;
