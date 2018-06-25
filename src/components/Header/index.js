import React from 'react';
import PropTypes from 'prop-types';

import HeaderNavigation from './HeaderNavigation';
import HeaderUserInfo from './HeaderUserInfo';

import './header.css';

class Header extends React.PureComponent {
  render() {
    return (
      <div className="header">
        <HeaderNavigation />
        <HeaderUserInfo />
      </div>
    );
  }
}

Header.propTypes = {
  likes: PropTypes.number,
  messages: PropTypes.number,
};

export default Header;
