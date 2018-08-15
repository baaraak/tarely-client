import React from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input, InputNumber, Alert, message } from 'antd';

import SearchMenu from '../Search/SearchMenu';

import './bids.css';

class Bids extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bidProductID: null,
        };
    }

    render() {
        return (
            <div className="page bids">
                <SearchMenu
                    id={this.props.history.location.pathname.substring(1)}
                />
            </div>
        )
    }
}

export default Bids;
