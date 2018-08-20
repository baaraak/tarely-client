import React from 'react';
import { connect } from 'react-redux';
import { Card, message } from 'antd';

import PageTitle from '../../components/PageTitle';
import ChangePasswordForm from '../../components/ChangePassword';

import { changePassword } from '../../redux/actions/user.actions';

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

    render() {
        console.log('out', this.props.changePasswordResult);
        const errorMessage = typeof this.props.changePasswordResult === 'string' ? this.props.changePasswordResult : null;
        return (
            <div className="page settings">
                <PageTitle label="User Settings" icon="edit" />
                <Card title="Change Password">
                    <ChangePasswordForm
                        errorMessage={errorMessage}
                        onSubmit={this.props.changePassword}
                    />
                </Card>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    changePasswordResult: state.user.changePasswordResult,
});

export default connect(mapStateToProps, { changePassword })(Settings);
