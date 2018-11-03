import React from 'react';
import { Spin, Icon } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

import ChatInput from '../../../components/ChatInput';

class BidRoom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            messages: props.messages,
        };
    }

    componentWillMount() {
        this.props.getBidMessages(this.props.bidId)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.bidId !== nextProps.bidId) {
            this.props.getBidMessages(nextProps.bidId)
        }
        if (this.props.messages !== nextProps.messages) {
            this.setState({ messages: nextProps.messages })
        }
    }

    render() {
        const { messages } = this.state;
        if (messages === null) {
            return (
                <div className="bids__messages bids__messages--loading">
                    <Spin size="large" />
                </div>
            );
        }
        return (
            <div className={`bids__messages ${this.props.isMobile ? 'mobile' : ''}`}>
                <div className="bids__messages--title">
                    {this.props.bidTitle}
                    {this.props.isMobile && <Icon type="info-circle" theme="outlined" />}
                </div>
                <div className="bids__messages--content">
                    {this.props.isMatch ?
                        messages.length === 0 ? (
                            <div className="messages__empty"><FormattedMessage id="search.bids.noMessages" /></div>
                        ) : (
                                messages.map(message => {
                                    const className = this.props.bidId === message.from ? 'message__self' : '';
                                    return (
                                        <div className={`message ${className}`} key={message._id}>
                                            <div className="message__content">{message.body}</div>
                                            {/*<div className="message__createdAt">{message.createdAt}</div>*/}
                                        </div>
                                    );
                                })
                            )
                        : <div className="bids__messages--noMatch"><FormattedMessage id="search.bids.noMatch" /></div>}
                </div>
                {this.props.isMatch &&
                    <div className="bids__messages--input">
                        <ChatInput
                            disabled={!this.props.isMatch}
                            onSubmit={this.props.onSubmitMessage}
                            isMobile={this.props.isMobile}
                        />
                    </div>}
            </div>
        );
    }
}

export default injectIntl(BidRoom);