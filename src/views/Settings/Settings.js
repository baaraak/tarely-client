import React from 'react';
import { connect } from 'react-redux';
import { Card, Form, Switch, Select } from 'antd';
import { injectIntl } from 'react-intl';
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

    onChange(type) {
        this.props.toggleSubscribe(type);
    }

    render() {
        const { subscription, changePasswordResult, intl } = this.props;
        return (
            <div className="page settings">
                <PageTitle label={intl.messages["settings.title"]} icon="edit" />
                <div className="container">
                    <Card title={intl.messages["settings.general"]}>
                        <Form.Item label={intl.messages["settings.language"]} >
                            <Select
                                style={{ width: '100%' }}
                                placeholder={intl.messages["settings.language.placeholder"]}
                            >
                                <Select.Option value="en">{intl.messages["english"]}</Select.Option>
                                <Select.Option value="he">{intl.messages["hebrew"]}</Select.Option>
                            </Select>
                        </Form.Item>
                    </Card>
                    <Card title={intl.messages["settings.changePassword"]}>
                        <ChangePasswordForm
                            changePasswordResult={changePasswordResult}
                            onSubmit={this.props.changePassword}
                            intl={intl}
                        />
                    </Card>
                    <Card title={intl.messages["settings.notifications"]} className="settings__notifications" >
                        <Form.Item label={intl.messages["settings.notifications.newMatches"]}>
                            <Switch defaultChecked={subscription.matches} onChange={() => this.onChange('matches')} />
                        </Form.Item>
                        <Form.Item label={intl.messages["settings.notifications.newMessages"]}>
                            <Switch defaultChecked={subscription.messages} onChange={() => this.onChange('messages')} />
                        </Form.Item>
                        <Form.Item label={intl.messages["settings.notifications.promotions"]}>
                            <Switch defaultChecked={subscription.promotions} onChange={() => this.onChange('promotions')} />
                        </Form.Item>
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    subscription: state.app.user.subscription,
    changePasswordResult: state.user.changePasswordResult,
});

export default connect(mapStateToProps, { changePassword, toggleSubscribe })(injectIntl(Settings));
