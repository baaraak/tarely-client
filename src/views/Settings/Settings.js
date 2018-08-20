import React from 'react';
import { connect } from 'react-redux';
import { Card, message, Form, Switch } from 'antd';

import PageTitle from '../../components/PageTitle';
import ChangePasswordForm from '../../components/ChangePassword';

import { changePassword, toggleSubscribe } from '../../redux/actions/user.actions';

import './settings.css';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bidProductID: null,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.changePasswordResult !== nextProps.changePasswordResult && nextProps.changePasswordResult === true) {
            message.success('Password changed successfully!')
        }
    }

    onChange(type) {
        this.props.toggleSubscribe(type);
    }

    render() {
        const errorMessage = typeof this.props.changePasswordResult === 'string' ? this.props.changePasswordResult : null;
        const { subscription } = this.props;
        return (
            <div className="page settings">
                <PageTitle label="User Settings" icon="edit" />
                <Card title="Change Password">
                    <ChangePasswordForm
                        errorMessage={errorMessage}
                        onSubmit={this.props.changePassword}
                    />
                </Card>
                <Card title="Notifications" className="settings__notifications" >
                    <Form.Item label="New Matches">
                        <Switch defaultChecked={subscription.matches} onChange={() => this.onChange('matches')} />
                    </Form.Item>
                    <Form.Item label="New Messages">
                        <Switch defaultChecked={subscription.messages} onChange={() => this.onChange('messages')} />
                    </Form.Item>
                    <Form.Item label="Promotions">
                        <Switch defaultChecked={subscription.promotions} onChange={() => this.onChange('promotions')} />
                    </Form.Item>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    subscription: state.app.user.subscription,
});

export default connect(mapStateToProps, { changePassword, toggleSubscribe })(Settings);
