import React from 'react';
import { Icon, Menu } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Scrollbars } from 'react-custom-scrollbars';

import { BASE_URL } from '../../../services/constans';

class MatchesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: !props.isMobile,
      menuId: 'MATCHES',
    }
  }

  onClick = (id) => {
    if (this.props.isMobile) {
      this.setState({ isOpen: !this.state.isOpen })
    }
    this.props.onClick(id, this.state.menuId);
  }

  onFilterTabClick = ({ key }) => {
    this.setState({ menuId: key });
  }

  renderMatches = () => {
    const matches = this.props.matches.filter(d => !!d.product);
    if (matches.length === 0) return <div className="matches__list--noData"><FormattedMessage id="matches.menu.matches.noData" /></div>;
    return (
      matches.map(match => {
        const id = match.matchId;
        const className = id === this.props.currentMatchID ? 'active' : '';
        const lastMessage = match.lastMessage ? match.lastMessage.body : <FormattedMessage id="matches.match.noMessages" />;
        const title = match.product.title;
        const image = BASE_URL + match.product.images[0];
        return (
          <div
            className={`list__match ${className}`}
            onClick={() => this.onClick(id)}
            key={id}
          >
            <div className="list__match--image">
              <img src={image} alt="" />
            </div>
            <div className="list__match--details">
              <div className="list__match--title">{title}</div>
              <div className="list__match--message">{lastMessage}</div>
            </div>
            {id === this.props.currentMatchID ? <Icon type="up" theme="outlined" /> : null}
          </div>
        );
      })
    );
  }

  renderBids = () => {
    const bids = this.props.matches.filter(d => !!d.bid);
    if (bids.length === 0) return <div className="matches__list--noData"><FormattedMessage id="matches.menu.bids.noData" /></div>;
    return (
      bids.map(b => {
        const id = b.bidId;
        const className = id === this.props.currentMatchID ? 'active' : '';
        const lastMessage = b.lastMessage ? b.lastMessage.body : <FormattedMessage id="matches.match.noMessages" />;
        const title = b.bid.title;
        const image = 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/64x64/currency_dollar.png';
        return (
          <div
            className={`list__match ${className}`}
            onClick={() => this.onClick(id)}
            key={id}
          >
            <div className="list__match--image">
              <img src={image} alt="" />
            </div>
            <div className="list__match--details">
              <div className="list__match--title">{title}</div>
              {b.bid.isMatch ? <div className="list__match--message">{lastMessage}</div> : null}
            </div>
            {id === this.props.currentMatchID ? <Icon type="up" theme="outlined" /> : null}
          </div>
        );
      })
    );
  }

  render() {
    const { matches, isMobile } = this.props;
    return (
      <div className={`matches__list ${isMobile ? 'mobile' : ''} ${this.state.isOpen ? 'open' : ''}`}>
        <Menu onClick={this.onFilterTabClick} selectedKeys={[this.state.menuId]} mode="horizontal">
          <Menu.Item key="MATCHES">
            <FormattedMessage id="matches.menu.matches" />
          </Menu.Item>
          <Menu.Item key="BIDS">
            <FormattedMessage id="matches.menu.bids" />
          </Menu.Item>
        </Menu>
        <div className="matches__list--wrapper">
          <Scrollbars>
            {this.state.menuId === 'MATCHES' ? this.renderMatches() : this.renderBids()}
          </Scrollbars>
        </div>
      </div>
    )
  }
}

export default MatchesList;
