import React from 'react';
import { Spin } from 'antd';

import ChatInput from '../../../components/ChatInput';

const MatchRoom = ({
  messages, title, onSubmit, productId,
}) => {
  const renderMessages = () => messages.map((message) => {
    const className = productId === message.from ? 'message__self' : '';
    return (
      <div className={`message ${className}`} key={message._id}>
        <div className="message__content">{message.body}</div>
      </div>
    );
  });

  if (!messages) return <Spin size="large" />;
  return (
    <div className="matches__messages">
      <div className="matches__messages--title">{title}</div>
      <div className="matches__messages--content">
        {messages.length === 0 ?
          <div className="messages__empty">no messages yet</div> :
         renderMessages()
        }
      </div>
      <div className="matches__messages--input">
        <ChatInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default MatchRoom;