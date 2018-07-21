import React from 'react';
import { Button } from 'antd';

import { IMAGE_SRC } from '../../../services/constans';

const MatchSuccessModal = ({ match, onClose, redirectToMatchRoom }) => (
    <div className="matchSuccess">
        <div className="matchSuccess__container">
            <div className="matchSuccess__title">It's a Match!</div>
            <div className="matchSuccess__products">
                <div className="matchSuccess__product">
                    <div className="product__title">{match.fromProduct.title}</div>
                    <div className="product__image">
                        <img src={IMAGE_SRC + match.fromProduct.images[0]} alt="" />
                    </div>
                </div>
                <div className="matchSuccess__product">
                    <div className="product__title">{match.toProduct.title}</div>
                    <div className="product__image">
                        <img src={IMAGE_SRC + match.toProduct.images[0]} alt="" />
                    </div>
                </div>

            </div>
            <div className="matchSuccess__actions">
                <Button ghost onClick={onClose} >Continue swiping</Button>
                <Button type="primary" onClick={() => redirectToMatchRoom(match.roomID)} ghost>Send a message</Button>
            </div>
        </div>
    </div>
);

export default MatchSuccessModal;