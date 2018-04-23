import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Menu} from 'antd';

import Logo from '../Logo';

const MENU_KEYS = {
    HOME: '1',
    ALL: '2',
    SWIPE: '3',
};

const getCurrentKey = (path) => {
    if (path === '/') return MENU_KEYS.HOME;
    if (path === '/all') return MENU_KEYS.ALL;
    if (path === '/swipe') return MENU_KEYS.SWIPE;
};

const HeaderNavigation = (props) => {
    return (
        <Menu
            selectedKeys={[getCurrentKey(props.location.pathname)]}
            mode="horizontal"
            className='header__nav'
        >
            <Menu.Item key={MENU_KEYS.HOME}>
                <Logo/>
            </Menu.Item>
            <Menu.Item key={MENU_KEYS.ALL}>
                <Link to="/all" className="nav__btn">Browse all</Link>
            </Menu.Item>
            <Menu.Item key={MENU_KEYS.SWIPE}>
                <Link to="/swipe" className="nav__btn">Start swiping</Link>
            </Menu.Item>
        </Menu>
    );
}

export default withRouter(HeaderNavigation);
