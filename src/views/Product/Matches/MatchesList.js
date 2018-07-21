import React from 'react';

import { IMAGE_SRC } from '../../../services/constans';

const MatchesList = ({ matches, currentRoomID, onClick, productId }) => (
  <div className="matches__list">
    {matches.map((match) => {
      const { product } = match;
      const lastMessage = match.lastMessage ? match.lastMessage.body : 'No messages yet!';
      const className = match.roomId === currentRoomID ? 'active' : '';
      return (
        <div className={`list__match ${className}`} onClick={() => onClick(match.roomId)} key={product._id}>
          <div className="list__match--image">
            <img src={IMAGE_SRC + product.images[0]} alt="" />
          </div>
          <div className="list__match--details">
            <div className="list__match--title">
              {product.title}
            </div>
            <div className="list__match--message">
              {lastMessage}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default MatchesList;
