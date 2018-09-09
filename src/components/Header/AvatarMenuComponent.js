import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const AvatarMenuComponent = ({ userFullName, newMessages }) => (
  <Menu selectable={false} style={{ width: '200px' }} className="avatarMenu">
    <Menu.Item key="2">
      <Link to="/user/profile">
        <Icon type="profile" />
        <FormattedMessage id="menu.profile" />
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/user/settings">
        <Icon type="setting" />
        <FormattedMessage id="menu.settings" />
      </Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Link to="/help">
        <Icon type="question-circle-o" />
        <FormattedMessage id="menu.help" />
      </Link>
    </Menu.Item>
    <Menu.Item key="5">
      <Link to="/contact">
        <Icon type="form" />
        <FormattedMessage id="menu.contact" />
      </Link>
    </Menu.Item>
    <Menu.Item key="6">
      <Link to="/logout">
        <Icon type="logout" />
        <FormattedMessage id="menu.logout" />
      </Link>
    </Menu.Item>
  </Menu>
);

export default injectIntl(AvatarMenuComponent);
