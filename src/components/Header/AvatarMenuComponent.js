import React from 'react';
import {Menu, Icon} from 'antd';

const menuTitle = (userFullName, newMessages) => (
    <div className='avatarMenu__item--profile'>
        <span>{userFullName}</span>
        <span>{newMessages || 0} new messages</span>
    </div>
);

const AvatarMenuComponent = ({userFullName, newMessages}) => (
    <Menu selectable={false} style={{width: '200px'}} className='avatarMenu' >
        <Menu.Item key="1" className='avatarMenu__item'>
            {menuTitle(userFullName, newMessages)}
        </Menu.Item>
        <Menu.Divider/>
        <Menu.Item key="2">
            <Icon type="profile"/>
            Profile
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="setting"/>
            Settings
        </Menu.Item>
        <Menu.Item key="4">
            <Icon type="question-circle-o"/>
            Help
        </Menu.Item>
        <Menu.Item key="5">
            <Icon type="logout"/>
            Log out
        </Menu.Item>
    </Menu>

);

export default AvatarMenuComponent;
