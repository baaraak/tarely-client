import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const ProductMenu = ({ handleClick, currentView, id }) => (
  <Menu onClick={handleClick} selectedKeys={[currentView]} mode="horizontal">
    <Menu.Item key="swipe">
      <Link to={`/product/${id}/swipe`}>Swipe</Link>
    </Menu.Item>
    {/* <Menu.Item key="browse">
      <Link to={`/product/${id}/browse`}>Browse</Link>
    </Menu.Item> */}
    <Menu.Item key="matches">
      <Link to={`/product/${id}/matches`}>Matches</Link>
    </Menu.Item>
  </Menu>
);

export default ProductMenu;
