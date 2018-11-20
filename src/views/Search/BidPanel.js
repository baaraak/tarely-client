import React from 'react';
import { Modal, Icon } from 'antd';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import isEqual from 'lodash/isEqual';
import { AwesomeButton } from 'react-awesome-button';

import ProductView from '../../components/ProductView';
import BidRoom from './component/BidRoom';
import { getBidMessages, sendBidMessage } from '../../redux/actions/product.actions';

class BidPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bid: props.bid,
            isModalOpen: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.bid, nextProps.bid)) {
            this.setState({ bid: nextProps.bid })
        }
    }

    onSubmitMessage(body) {
        const message = {
            body,
            from: {
                type: 'USER',
                id: this.props.userId,
            },
            to: {
                type: 'PRODUCT',
                id: this.state.currentBidID
            },
            bid: this.props.currentBidID,
        };
        this.setState({
            messages: [...this.state.messages, {
                _id: new Date(),
                body,
                createdAt: new Date(),
                from: this.props.productId,
            }]
        }, this.setContentRefAndScroll)
        this.props.sendBidMessage(message);
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    render() {
        if (!this.state.bid) {
            return (
                <div className="bidPanel__noSelect">
                    <FormattedMessage id="search.bids.noSelect" />
                    <Icon type="message" theme="outlined" />
                </div>
            )
        }
        return (
            <div className="bidPanel">
                <BidRoom
                    getBidMessages={this.props.getBidMessages}
                    bidId={this.props.currentBidID}
                    bidTitle={this.state.bid.to.title}
                    messages={this.props.bidMessages}
                    onSubmitMessage={this.onSubmitMessage}
                    isMatch={this.state.bid.isMatch}
                />
                <ProductView
                    buttonLabel={<FormattedMessage id="search.bids.cancel" />}
                    categories={this.props.categories}
                    product={this.props.bid.to}
                    onActionClick={this.toggleModal}
                    isMobile={this.props.isMobile}
                    onClose={this.props.isMobile && this.onClickInfo}
                />
                <Modal
                    visible={!!this.state.isModalOpen}
                    onCancel={this.toggleModal}
                    className="productPage__matches--modal"
                    footer={[<AwesomeButton size="small" action={this.toggleModal} key={1} type="secondary" ><FormattedMessage id="button.cancel" /></AwesomeButton>,
                    <AwesomeButton key={2} size="small" className="btn-danger" ><FormattedMessage id="button.confirm" /></AwesomeButton>]}
                >
                    <h2><FormattedMessage id="search.bids.cancel.modal.title" /></h2>
                    <p dangerouslySetInnerHTML={{ __html: this.props.intl.messages["search.bids.cancel.modal.content"] }} />
                </Modal>
            </div>
        );
    }
}

export default connect((state) => ({
    userId: state.app.user._id,
    isMobile: state.app.isMobile,
    categories: state.app.categories,
    bidMessages: state.product.bidMessages,
}), { getBidMessages, sendBidMessage })(injectIntl(BidPanel));
