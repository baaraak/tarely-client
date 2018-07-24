import React from 'react';
import { Icon } from 'antd';

import './pageTitle.css';

const PageTitle = ({ icon, label }) => (
  <div className="pageTitle">
    {icon && <Icon className="pageTitle__icon" type={icon} />}
    {label && <div className="pageTitle__label">{label}</div>}
  </div>
);

export default PageTitle;
