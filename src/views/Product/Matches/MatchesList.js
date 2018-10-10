import React from 'react';
import { Icon } from 'antd';
import { BASE_URL } from '../../../services/constans';

class MatchesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: !props.isMobile
    }
  }

  onClick = (id) => {
    if (this.props.isMobile) {

      this.setState({ isOpen: !this.state.isOpen })
    }
    this.props.onClick(id);
  }

  render() {
    const { matches, currentMatchID, intl, isMobile } = this.props;
    return (
      <div className={`matches__list ${isMobile ? 'mobile' : ''} ${this.state.isOpen ? 'open' : ''}`}>
        {matches.map(match => {
          const id = match.matchId
          const className = id === currentMatchID ? 'active' : '';
          const lastMessage = match.lastMessage ? match.lastMessage.body : intl.messages["matches.match.noMessages"];
          const title = match.product ? match.product.title : match.bid.title;
          const image = match.product ? BASE_URL + match.product.images[0] : 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/64x64/currency_dollar.png';
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
              {id === currentMatchID ? <Icon type="up" theme="outlined" /> : null}
            </div>
          );
        })}
      </div>
    )
  }
}

export default MatchesList;
