import React from 'react';
import { Button } from 'antd';

import { BASE_URL } from '../../../services/constans';

const MatchSuccessModal = ({ match, onClose, redirectToMatchRoom, intl }) => (
  <div className="matchSuccess">
    <div className="matchSuccess__container">
      <div className="matchSuccess__title">It's a Match!</div>
      <div className="matchSuccess__products">
        <div className="matchSuccess__product">
          <div className="product__title">{match.from.title}</div>
          <div className="product__image">
            <img src={BASE_URL + match.from.images[0]} alt="" />
          </div>
        </div>
        <div className="matchSuccess__product">
          <div className="product__title">{match.to.title}</div>
          <div className="product__image">
            <img src={BASE_URL + match.to.images[0]} alt="" />
          </div>
        </div>
      </div>
      <div className="matchSuccess__actions">
        <Button ghost onClick={onClose}>
          {intl.messages["swipe.match.continueSwipe"]}
        </Button>
        <Button
          type="primary"
          onClick={() => redirectToMatchRoom(match.matchId)}
          ghost
        >
          {intl.messages["swipe.match.sendMessage"]}
        </Button>
      </div>
    </div>
  </div>
);

export default MatchSuccessModal;
