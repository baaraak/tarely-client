import React from 'react';
import { connect } from 'react-redux';
import SearchMenu from './SearchMenu';
import { injectIntl, FormattedMessage } from 'react-intl';

import BidsTabs from './component/BidsTabs';
import BidsList from './component/BidsList';
import { getBids } from '../../redux/actions/user.actions';
import './search.css';

class SearchBidsComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuFilters: 'ALL',
            currentBidID: null,
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

    menuFilterHandler = (e) => {

        this.setState({ menuFilters: e.key })
    }

    getCurrentBids = () => {
        return this.state.menuFilters === 'ALL' ? this.state.bids : this.state.bids.filter(b => b.isMatch);
    }

    onBidClick = (id) => {
        this.setState({ currentBidID: id });
    }

    renderBids() {
        const { bids } = this.state;
        if (bids.length > 0) {
            return (
                <React.Fragment>
                    <div className="bids__list">
                        <BidsTabs handleClick={this.menuFilterHandler} id={this.state.menuFilters} />
                        <BidsList onClick={this.onBidClick} currentBidID={this.state.currentBidID} bids={this.getCurrentBids()} />
                    </div>
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
            <div className="page search bids">
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