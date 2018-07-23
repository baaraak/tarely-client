import React from 'react';
import { Spin } from 'antd';

import ChatInput from '../../../components/ChatInput';

const MatchRoom = ({
  messages, title, onSubmit, productId, setContentRef,
}) => {
  const renderMessages = () => messages.map((message) => {
    const className = productId === message.from ? 'message__self' : '';
    return (
      <div className={`message ${className}`} key={message._id}>
        <div className="message__content">{message.body}</div>
        {/*<div className="message__createdAt">{message.createdAt}</div>*/}
      </div>
    );
  });

  if (!messages) return <div className="matches__messages"><Spin size="large" /></div>;
  return (
    <div className="matches__messages">
      <div className="matches__messages--title">{title}</div>
      <div className="matches__messages--content" ref={setContentRef}>
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
