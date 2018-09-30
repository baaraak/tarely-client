import React from 'react';
import { Form, Input, Icon, Button, Alert } from 'antd';
import { AwesomeButton } from 'react-awesome-button';

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
        // const { getFieldDecorator } = this.props.form;
        const { form: { getFieldDecorator }, intl } = this.props;
        return (
            <Form className="change_password" onSubmit={this.handleSubmit}>
                {this.renderResponseMessage()}
                <FormItem label={intl.messages["settings.oldPassword"]}>
                    {getFieldDecorator('oldPassword', {
                        rules: [
                            { required: true, message: 'Please input your old password!' },
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder={intl.messages["settings.oldPassword.placeholder"]}
                        />
                    )}
                </FormItem>

                <FormItem
                    label={intl.messages["settings.newPassword"]}
                >
                    {getFieldDecorator('newPassword', {
                        rules: [{
                            required: true, message: 'Please input new password!',
                        }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder={intl.messages["settings.newPassword.placeholder"]}
                        />
                    )}
                </FormItem>
                <FormItem
                    label={intl.messages["settings.confirmPassword"]}
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, { validator: this.compareToFirstPassword }],
                    })(
                        <Input type="password" placeholder={intl.messages["settings.confirmPassword.placeholder"]} />
                    )}
                </FormItem>
                <AwesomeButton>
                    <Icon type="lock" />
                    {intl.messages["settings.changePassword.button"]}
                </AwesomeButton>
            </Form>
        );
    }
}

const WrappedChangePasswordForm = Form.create()(ChangePasswordForm);

export default WrappedChangePasswordForm;
