import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar, Popover, Button } from 'antd';

import AvatarMenuComponent from './AvatarMenuComponent';
import { BASE_URL } from '../../services/constans';

class HeaderUserInfo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatarMenuVisible: false,
    };
    this.handleAvatarMenuClicked = this.handleAvatarMenuClicked.bind(this);
  }

  handleAvatarMenuClicked(e) {
    this.setState({ avatarMenuVisible: !this.state.avatarMenuVisible });
  }

  render() {
    return (
      <div className="header__userInfo">
        <Link to="/upload" state={{ modal: true }}>
          <Button type="secondary">ADD PRODUCT</Button>
        </Link>
        <Popover
          content={
            <AvatarMenuComponent
              userFullName={this.props.user.fullName}
              newMessages={this.props.user.newMessage}
            />
          }
          trigger="click"
          placement="bottomRight"
          visible={this.state.avatarMenuVisible}
          onVisibleChange={this.handleAvatarMenuClicked}
        >
          <Avatar src={BASE_URL + this.props.user.avatar || 'avatar.png'} />
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(mapStateToProps)(HeaderUserInfo);
