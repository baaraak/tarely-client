import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const SearchMenu = ({ handleClick, id }) => (
    <Menu onClick={handleClick} selectedKeys={[id]} mode="horizontal">
        <Menu.Item key="search">
            <Link to="/search">Search</Link>
        </Menu.Item>
        <Menu.Item key="bids">
            <Link to="bids">Bids</Link>
        </Menu.Item>
    </Menu>
);

export default SearchMenu;
