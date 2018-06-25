import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const menuTitle = (userFullName, newMessages) => (
  <div className="avatarMenu__item--profile">
    <span>{userFullName}</span>
    <span>{newMessages || 0} new messages</span>
  </div>
);

const AvatarMenuComponent = ({ userFullName, newMessages }) => (
  <Menu selectable={false} style={{ width: '200px' }} className="avatarMenu" >
    <Menu.Item key="1" className="avatarMenu__item">
      {menuTitle(userFullName, newMessages)}
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2">
      <Link to="/user/profile">
        <Icon type="profile" />
            Profile
      </Link>
    </Menu.Item>
    <Menu.Item key="3">
      <Link to="/user/settings">
        <Icon type="setting" />
            Settings
      </Link>
    </Menu.Item>
    <Menu.Item key="4">
      <Link to="/help">
        <Icon type="question-circle-o" />
            Help
      </Link>
    </Menu.Item>
    <Menu.Item key="5">
      <Link to="/logout">
        <Icon type="logout" />
            Log out
      </Link>
    </Menu.Item>
  </Menu>

);

export default AvatarMenuComponent;
