import React from 'react';
import { Spin, Icon } from 'antd';

import ChatInput from '../../../components/ChatInput';

const MatchRoom = ({ messages, title, onSubmit, productId, setContentRef, intl, isMobile, onClickInfo }) => {
  const renderMessages = () =>
    messages.map(message => {
      const className = productId === message.from ? 'message__self' : '';
      return (
        <div className={`message ${className}`} key={message._id}>
          <div className="message__content">{message.body}</div>
          {/*<div className="message__createdAt">{message.createdAt}</div>*/}
        </div>
      );
    });

  if (!messages)
    return (
      <div className="matches__messages">
        <Spin size="large" />
      </div>
    );
  return (
    <div className={`matches__messages ${isMobile ? 'mobile' : ''}`}>
      <div className="matches__messages--title">
        {title}
        {isMobile && <Icon onClick={onClickInfo} type="info-circle" theme="outlined" />}
      </div>
      <div className="matches__messages--content" ref={setContentRef}>
        {messages.length === 0 ? (
          <div className="messages__empty">{intl.messages["matches.match.noMessages"]}</div>
        ) : (
            renderMessages()
          )}
      </div>
      <div className="matches__messages--input">
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default MatchRoom;
