import React from 'react';
import { Menu, Icon } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';

import { BASE_URL } from '../../../services/constans';

const BidsList = ({ bids, currentBidID, onClick, onFilterTabClick, menuId }) => (
    <div className="list">
        <Menu onClick={onFilterTabClick} selectedKeys={[menuId]} mode="horizontal">
            <Menu.Item key="ALL">
                <FormattedMessage id="search.bids.all" />
            </Menu.Item>
            <Menu.Item key="APPROVED">
                <FormattedMessage id="search.bids.approved" />
            </Menu.Item>
        </Menu>
        <div className="list--wrapper">
            <Scrollbars>
                {bids.map(bid => {
                    const id = bid._id
                    const className = id === currentBidID ? 'active' : '';
                    const lastMessage = bid.isMatch ? bid.lastMessage ? bid.lastMessage.body : <FormattedMessage id="matches.match.noMessages" /> : <span>WAITING APPROVAL</span>;
                    const title = bid.to.title;
                    const image = BASE_URL + (bid.to && bid.to.images ? bid.to.images[0] : bid.to);
                    return (
                        <div
                            className={`list__bid ${className}`}
                            onClick={() => onClick(id)}
                            key={id}
                        >
                            <div className="list__bid--image">
                                <img src={image} alt="" />
                            </div>
                            <div className="list__bid--details">
                                <div className="list__bid--title">{title}</div>
                                <div className="list__bid--message">{lastMessage}</div>
                            </div>
                            {id === currentBidID ? <Icon type="up" theme="outlined" /> : null}
                        </div>
                    );
                })}
            </Scrollbars>
        </div>
    </div>
);

export default injectIntl(BidsList);
