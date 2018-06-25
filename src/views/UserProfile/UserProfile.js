import React from 'react';
import { connect } from 'react-redux';

import PageTitle from '../../components/PageTitle';
import EditUserProfileForm from './EditUserProfileForm';

class UserProfile extends React.Component {
  render() {
    return (
      <div className="userProfile page">
        <PageTitle label="User Profile" icon="user" />
        <EditUserProfileForm user={this.props.user} />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(mapStateToProps)(UserProfile);
