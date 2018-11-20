import React from 'react';
import { Modal, Icon, Spin } from 'antd';
import { AwesomeButton } from 'react-awesome-button';
import isEqual from 'lodash/isEqual';

import ChatInput from '../../../components/ChatInput';
import BidViewComponent from '../../../components/BidView';

class BidRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isBidViewOpen: !props.isMobile,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.props.messages, nextProps.messages)) {
            this.setState({ isBidViewOpen: true })
        }
    }

    toggleModal = () => this.setState({ isModalOpen: !this.state.isModalOpen })

    handleReject = () => {
        this.toggleModal();
        this.props.handleReject(this.props.bid._id)
    };

    onClickInfo = () => {
        this.setState({ isBidViewOpen: !this.state.isBidViewOpen });
    }

    renderMessages = () => {
        return this.props.messages.map(message => {
            const className = this.props.productId === message.from.id ? 'message__self' : '';
            return (
                <div className={`message ${className}`} key={message._id}>
                    <div className="message__content">{message.body}</div>
                    {/*<div className="message__createdAt">{message.createdAt}</div>*/}
                </div>
            );
        })
    }
    render() {
        const { isMobile, messages, bid, intl, onSubmit, setContentRef, handleAccept, handleReject } = this.props;
        if (bid.isMatch) {
            return (
                <React.Fragment>
                    <div className={`matches__messages ${isMobile ? 'mobile' : ''}`}>
                        <div className="matches__messages--title">
                            {bid.title}
                            <Icon onClick={this.onClickInfo} type="info-circle" theme="outlined" />
                        </div>
                        <div className="matches__messages--content" ref={setContentRef}>
                            {!messages ? (
                                <div className="matches__messages">
                                    <Spin size="large" />
                                </div>
                            ) :
                                messages.length === 0 ? (
                                    <div className="messages__empty">{intl.messages["matches.match.noMessages"]}</div>
                                ) : (
                                        this.renderMessages()
                                    )}
                        </div>
                        <div className="matches__messages--input">
                            <ChatInput onSubmit={onSubmit} isMobile={isMobile} />
                        </div>
                    </div>
                    {this.state.isBidViewOpen && <BidViewComponent
                        onClose={this.onClickInfo}
                        bid={bid}
                        onActionClick={this.toggleModal}
                        buttonLabel={intl.messages["bids.match.cancel"]} />}
                    <Modal
                        visible={!!this.state.isModalOpen}
                        onCancel={this.toggleModal}
                        className="productPage__matches--modal"
                        footer={[<AwesomeButton size="small" key={1} type="secondary" action={this.toggleModal} >{intl.messages["bids.modal.back"]}</AwesomeButton>,
                        <AwesomeButton key={2} size="small" className="btn-danger" action={this.handleReject} >{intl.messages["bids.modal.ok"]}</AwesomeButton>]}
                    >
                        <h2>{intl.messages["bids.reject.title"]}</h2>
                        <p dangerouslySetInnerHTML={{ __html: intl.messages["bids.cancel.message"] }} ></p>
                    </Modal>
                </React.Fragment>
            );
        } else {
            return (
                <div className="matches__messages matches__messages--bid">
                    <div className="content">
                        <div className="bid__match--title"><div className="title">Title:</div> {bid.title}</div>
                        <div className="bid__match--description"><div className="title">Description:</div> {bid.description}</div>
                        <div className="bid__match--price"><div className="title">Price:</div> {bid.price}$</div>
                    </div>
                    <div className="buttons">
                        <AwesomeButton className="btn-danger" size="large" action={this.toggleModal} >Reject</AwesomeButton>
                        <AwesomeButton size="large" type="secondary" action={() => handleAccept(this.props.bid._id)} >Accept</AwesomeButton>
                    </div>
                    <Modal
                        visible={!!this.state.isModalOpen}
                        onCancel={this.toggleModal}
                        className="productPage__matches--modal"
                        footer={[<AwesomeButton size="small" key={1} type="secondary" action={this.toggleModal} >{intl.messages["bids.modal.cancel"]}</AwesomeButton>,
                        <AwesomeButton key={2} size="small" className="btn-danger" action={this.handleReject} >{intl.messages["bids.modal.reject"]}</AwesomeButton>]}
                    >
                        <h2>{intl.messages["bids.reject.title"]}</h2>
                        <p dangerouslySetInnerHTML={{ __html: intl.messages["bids.reject.message"] }} ></p>
                    </Modal>
                </div>
            )
        }
    }
}

export default BidRoom;
