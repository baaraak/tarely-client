import React from 'react';
import { connect } from 'react-redux';
import SearchMenu from './SearchMenu';

import './search.css';

class SearchBidsComponent extends React.Component {
    render() {
        return (
            <div className="page search">
                <SearchMenu
                    id={this.props.history.location.pathname.substring(1)}
                />
                hell0</div>
        )
    }
}

export default connect()(SearchBidsComponent);