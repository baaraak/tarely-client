import React from 'react';
import { Link } from 'react-router-dom';

import LogoPNG from './logo.png';

import './logo.css';

const Logo = () => <Link to="/" className="logo"><img src={LogoPNG} alt=""/></Link>;

export default Logo;
