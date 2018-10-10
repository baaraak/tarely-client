import React from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Avatar, Popover } from 'antd';
import { AwesomeButton } from 'react-awesome-button';

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
    const avatarUrl = this.props.user.avatar.indexOf('https') !== -1 ? this.props.user.avatar : BASE_URL + this.props.user.avatar;
    return (
      <div className="header__userInfo">
        <Link to="/upload" state={{ modal: true }}>
          <AwesomeButton type="secondary"><FormattedMessage id="product.add" /></AwesomeButton>
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
          <Avatar src={avatarUrl} />
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.app.user,
});

export default connect(mapStateToProps)(injectIntl(HeaderUserInfo));
