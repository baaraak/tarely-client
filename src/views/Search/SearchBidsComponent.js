import React from 'react';
import { connect } from 'react-redux';
import SearchMenu from './SearchMenu';
import { injectIntl, FormattedMessage } from 'react-intl';

import BidsList from './component/BidsList';
import BidPanel from './BidPanel';
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
        const { bids, currentBidID } = this.state;
        if (bids.length > 0) {
            const currentBid = bids.filter(b => b._id === currentBidID)[0];
            return (
                <React.Fragment>
                    <div className="bids__matches">
                        <BidsList
                            onFilterTabClick={this.menuFilterHandler}
                            menuId={this.state.menuFilters}
                            onClick={this.onBidClick}
                            currentBidID={currentBidID}
                            bids={this.getCurrentBids()}
                        />
                        <BidPanel
                            bid={currentBid}
                            currentBidID={currentBidID}
                        />
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