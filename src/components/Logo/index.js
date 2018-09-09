import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import './logo.css';

const Logo = ({ intl }) => (
  <Link to="/" className="logo">
    <FormattedMessage id="app.name" />
  </Link>
);

export default injectIntl(Logo);
