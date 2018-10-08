import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import navbarItems from './Navbar.items';
import './navbar.css';

class Navbar extends React.PureComponent {
    render() {
        return (
            <div className="navbar">
                {navbarItems.map(item => (
                    <div className={`navbar__item ${item.path === '/' ? this.props.history.location.pathname === '/' ? 'navbar__item--active' : ''
                        : this.props.history.location.pathname.indexOf(item.path) === -1 ? '' : 'navbar__item--active'}`} key={item.path}>
                        <Link to={item.path} className="navba__itemLink">
                            <span className={`icon ${item.icon}`} />
                        </Link>
                    </div>
                ))
                }
            </div>
        )
    }
}

export default withRouter(Navbar);