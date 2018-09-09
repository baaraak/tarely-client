import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import { injectIntl } from 'react-intl';

import PageTitle from '../../components/PageTitle';
import EditUserProfileDetails from './EditUserProfileDetails';
import EditUserSocial from './EditUserSocial';

import { updateUserProfile } from '../../redux/actions/user.actions';
import { changeUserAvatar } from '../../redux/actions/app.actions';

import './userProfile.css';

class UserProfile extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.profileUpdated !== nextProps.profileUpdated &&
      nextProps.profileUpdated
    ) {
      message.success(this.props.intl.messages["profile.update.success"]);
    }
  }
  render() {
    return (
      <div className="userProfile page">
        <PageTitle label={this.props.intl.messages["profile.title"]} icon="user" />
        <div className="container">
          <EditUserProfileDetails
            user={this.props.user}
            changeUserAvatar={this.props.changeUserAvatar}
            onSubmit={this.props.updateUserProfile}
            intl={this.props.intl}
          />
          <EditUserSocial
            user={this.props.user}
            intl={this.props.intl}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
  profileUpdated: state.user.profileUpdated,
});

export default connect(
  mapStateToProps,
  { updateUserProfile, changeUserAvatar }
)(injectIntl(UserProfile));
