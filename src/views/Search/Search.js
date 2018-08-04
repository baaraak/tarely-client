import React from 'react';
import BrowseComponent from '../../components/Browse/BrowseComponent';

import './search.css';

class Search extends React.Component {
  render() {
    return <div className="search">
      <BrowseComponent asProduct history={this.props.history} />
    </div>;
  }
}

export default Search;
