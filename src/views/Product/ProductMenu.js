import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
const ProductMenu = ({ handleClick, currentView, id, intl, isMobile }) => (
  <Menu onClick={handleClick} selectedKeys={[currentView]} mode="horizontal" className={isMobile ? 'productMenu--mobile' : ''} >
    <Menu.Item key="swipe">
      <Link to={`/product/${id}/swipe`}>{intl.messages["swipe.title"]}</Link>
    </Menu.Item>
    {/* <Menu.Item key="browse">
      <Link to={`/product/${id}/browse`}>Browse</Link>
    </Menu.Item> */}
    <Menu.Item key="matches">
      <Link to={`/product/${id}/matches`}>{intl.messages["matches.title"]}</Link>
    </Menu.Item>
  </Menu>
);

export default injectIntl(ProductMenu);
