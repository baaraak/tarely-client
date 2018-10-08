import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import SearchMenu from './SearchMenu';
import { injectIntl, FormattedMessage } from 'react-intl';

import { getBids } from '../../redux/actions/user.actions';
import './search.css';

class SearchBidsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bids: null,
        }
    }

    componentWillMount() {
        this.props.getBids()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.bids !== nextProps.bids) {
            this.setState({ bids: nextProps.bids });
        }
    }

    renderBids() {
        const { bids } = this.state;
        if (bids.length > 0) {
            return (
                <React.Fragment>
                </React.Fragment>
            )
        }
        return (
            <div className="search--noMessage">
                <FormattedMessage id="search.noBids" />
            </div>
        );
    }

    render() {
        return (
            <div className="page search">
                <SearchMenu
                    id={this.props.history.location.pathname.substring(1)}
                />
                {this.state.bids && this.renderBids()}
            </div>
        )
    }
}

export default connect((state) => ({
    bids: state.user.bids
}), { getBids })(injectIntl(SearchBidsComponent));