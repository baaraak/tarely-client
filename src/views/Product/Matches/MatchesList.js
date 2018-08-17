import React from 'react';

import { BASE_URL } from '../../../services/constans';

const MatchesList = ({ matches, currentRoomID, onClick, productId }) => (
  <div className="matches__list">
    {matches.map(match => {
      const className = match.roomId === currentRoomID ? 'active' : '';
      const lastMessage = match.lastMessage ? match.lastMessage.body : 'No messages yet!';
      const id = match.matchId;
      const title = match.product ? match.product.title : match.bid.title;
      const image = match.product ? BASE_URL + match.product.images[0] : 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/64x64/currency_dollar.png';
      return (
        <div
          className={`list__match ${className}`}
          onClick={() => onClick(id)}
          key={id}
        >
          <div className="list__match--image">
            <img src={image} alt="" />
          </div>
          <div className="list__match--details">
            <div className="list__match--title">{title}</div>
            <div className="list__match--message">{lastMessage}</div>
          </div>
        </div>
      );
    })}
  </div>
);

export default MatchesList;
