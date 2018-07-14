import React from 'react';
import { connect } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import EditUserProfileForm from './EditUserProfileForm';

import { updateUserProfile } from '../../redux/actions/user.actions';

import './userProfile.css';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="userProfile page">
        <PageTitle label="User Profile" icon="user" />
        <EditUserProfileForm user={this.props.user} onSubmit={this.props.updateUserProfile} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(mapStateToProps, { updateUserProfile })(UserProfile);
