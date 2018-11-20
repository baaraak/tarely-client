import React from 'react';
import { Carousel } from 'antd';
import { BASE_URL } from '../../services/constans';
import { AwesomeButton } from 'react-awesome-button';
import { Scrollbars } from 'react-custom-scrollbars';

import './bidView.css';

const BidViewComponent = ({ bid, onClose, isMobile, buttonLabel, onActionClick }) => {
  return (
    <div className={`bidView ${isMobile ? 'mobile' : ''}`}>
      <Scrollbars>
        {onClose && (
          <div className="bid__close" onClick={onClose}>
            x
        </div>
        )}
        <div className="bid__title">{bid.title}</div>
        <div className="bid__spec">
          <div className="bid__spec--label">Description:</div>
          <div className="bid__spec--content">{bid.description}</div>
        </div>
        {/* <div className="bid__spec">
        <div className="bid__spec--label">Location:</div>
        <div className="bid__spec--content">
          {bid.location.address}
        </div>
      </div> */}
        <div className="bid__spec">
          <div className="bid__spec--label">Price:</div>
          <div className="bid__spec--content">
            {`${`$${bid.price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        </div>
        <div className="bid__spec bid__spec--buttons">
          <AwesomeButton className="btn-danger" action={() => onActionClick(bid._id)}>{buttonLabel}</AwesomeButton>
        </div>
      </Scrollbars>
    </div>
  )
};

export default BidViewComponent;
