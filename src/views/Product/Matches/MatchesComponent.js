import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

import MatchesList from './MatchesList';
import MatchRoom from './MatchRoom';
import MatchProduct from './MatchProduct';

import { getProductMatches, handleSwipe, getMatchMessages, sendMessage } from '../../../redux/actions/product.actions';

class MatchesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: props.matches,
      currentRoomID: null,
    };
    this.changeCurrentMatch = this.changeCurrentMatch.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  componentWillMount() {
    this.props.getProductMatches(this.props.productId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading && this.props.matches !== nextProps.matches) {
      const currentRoomID = nextProps.matches.length ? nextProps.matches[0].roomId : null;
      this.setState({
        matches: nextProps.matches,
        currentRoomID,
        isLoading: false,
      });
      if (currentRoomID) this.props.getMatchMessages(currentRoomID);
    }
  }

  changeCurrentMatch(currentRoomID) {
    if (this.state.currentRoomID === currentRoomID) return;
    this.setState({ currentRoomID });
    this.props.getMatchMessages(currentRoomID);
  }

  renderNoMatches() {
    return (
      <div className="productPage__matches--noMessage">
        There is no matches yet, keep swiping.
      </div>
    );
  }

  getCurrentProduct() {
    return this.state.matches.filter(m => m.roomId === this.state.currentRoomID)[0].product;
  }

  onSubmitMessage(body) {
    const message = {
      body,
      from: this.props.productId,
      to: this.getCurrentProduct()._id,
      roomId: this.state.currentRoomID,
    };
    this.props.sendMessage(message);
  }

  render() {
    const { matches, currentRoomID, isLoading } = this.state;
    if (isLoading) return <div className="productPage__swiping--loading"><Spin size="large" /></div>;
    if (matches.length === 0) return this.renderNoMatches();
    const product = this.getCurrentProduct();
    return (
      <div className="productPage__matches">
        <MatchesList
          matches={matches}
          currentRoomID={currentRoomID}
          onClick={this.changeCurrentMatch}
        />
        <MatchRoom
          productId={this.props.productId}
          onSubmit={this.onSubmitMessage}
          messages={this.props.messages}
          title={product.title}
        />
        <MatchProduct product={product} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.product.matches,
  messages: state.product.messages,
});

export default connect(mapStateToProps, {
  getProductMatches, handleSwipe, getMatchMessages, sendMessage,
})(MatchesComponent);
