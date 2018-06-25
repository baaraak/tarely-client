import React from 'react';
import { withRouter } from 'react-router-dom';

import Logo from '../Logo';

const HeaderNavigation = () => (
  <div className="header__navigation">
    <Logo />
    <div className="navigation__menu">
      {/*<Link to="/browse" className="menu__item">Browse</Link>*/}
      {/*<Link to="/matches" className="menu__item">Matches</Link>*/}
      {/*<Link to="/products" className="menu__item">Products</Link>*/}
    </div>
  </div>
);

export default withRouter(HeaderNavigation);
