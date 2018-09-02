import React from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';

import PageTitle from '../../components/PageTitle';
import EditUserProfileDetails from './EditUserProfileDetails';
import EditUserSocial from './EditUserSocial';

import { updateUserProfile } from '../../redux/actions/user.actions';

import './userProfile.css';

class UserProfile extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (
      this.props.profileUpdated !== nextProps.profileUpdated &&
      nextProps.profileUpdated
    ) {
      message.success('Profile updated successfully');
    }
  }
  render() {
    return (
      <div className="userProfile page">
        <PageTitle label="User Profile" icon="user" />
        <div className="container">
          <EditUserProfileDetails
            user={this.props.user}
            onSubmit={this.props.updateUserProfile}
          />
          <EditUserSocial
            user={this.props.user}
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
  { updateUserProfile }
)(UserProfile);
