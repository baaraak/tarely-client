import React from 'react';
import { Input } from 'antd';

const SidebarSearch = ({ onChange, value }) => (
  <div className="sidebar__search">
    <div className="search__title">Search:</div>
    <Input
      type="search"
      onChange={onChange}
      value={value}
      placeholder="Start typing..."
    />
  </div>
);

export default SidebarSearch;
