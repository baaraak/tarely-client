import React from 'react';

import SidebarSearch from './SidebarSearch';
import SidebarFooter from './SidebarFooter';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ search: e.target.value });
    if (typeof this.props.onSearchChange === 'function')
      this.props.onSearchChange(e.target.value);
  }

  render() {
    return (
      <div className="sidebar">
        <SidebarSearch onChange={this.onChange} value={this.state.search} />
        {this.props.children}
        <SidebarFooter />
      </div>
    );
  }
}

export default Sidebar;
