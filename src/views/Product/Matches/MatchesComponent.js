import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import io from 'socket.io-client';

import MatchesList from './MatchesList';
import MatchRoom from './MatchRoom';
import ProductView from '../../../components/ProductView';

import {
  getProductMatches,
  handleSwipe,
  getMatchMessages,
  sendMessage,
} from '../../../redux/actions/product.actions';

const socketUrl = 'http://localhost:9000';

class MatchesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: props.matches,
      currentRoomID: null,
      socket: null,
    };
    this.changeCurrentMatch = this.changeCurrentMatch.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.setContentRef = this.setContentRef.bind(this);
  }

  componentWillMount() {
    this.props.getProductMatches(this.props.productId);
    this.initSocket();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading &&
      this.props.matches !== nextProps.matches &&
      Array.isArray(nextProps.matches)
    ) {
      const currentRoomID = this.props.match.params.roomId
        ? this.props.match.params.roomId
        : nextProps.matches.length
          ? nextProps.matches[0].roomId
          : null;
      this.setState({
        matches: nextProps.matches,
        currentRoomID,
        isLoading: false,
      });
      this.redirectToRoom(currentRoomID);
      if (currentRoomID) this.props.getMatchMessages(currentRoomID);
    }
  }

  redirectToRoom(roomID) {
    this.props.history.push({
      pathname: `/product/${this.props.productId}/matches/${roomID}`,
    });
  }

  initSocket() {
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.log('Socket Connected');
    });

    this.setState({ socket });
  }

  changeCurrentMatch(currentRoomID) {
    if (this.state.currentRoomID === currentRoomID) return;
    this.redirectToRoom(currentRoomID);
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
    return this.state.matches.filter(
      m => m.roomId === this.state.currentRoomID
    )[0].product;
  }

  setContentRef(ref) {
    if (ref) ref.scrollTop = ref.scrollHeight;
  }

  onSubmitMessage(body) {
    const message = {
      body,
      from: this.props.productId,
      to: this.getCurrentProduct()._id,
      roomId: this.state.currentRoomID,
    };
    // this.state.socket.emit('CHAT MESSAGE', message);
    this.props.sendMessage(message);
  }

  render() {
    const { matches, currentRoomID, isLoading } = this.state;
    if (isLoading)
      return (
        <div className="productPage__matches">
          <Spin size="large" />
        </div>
      );
    if (matches.length === 0) return this.renderNoMatches();
    const product = this.getCurrentProduct();
    return (
      <div className="productPage__matches">
        <MatchesList
          productId={this.props.productId}
          matches={matches}
          currentRoomID={currentRoomID}
          onClick={this.changeCurrentMatch}
        />
        <MatchRoom
          productId={this.props.productId}
          onSubmit={this.onSubmitMessage}
          messages={this.props.messages}
          title={product.title}
          setContentRef={this.setContentRef}
        />
        <ProductView categories={this.props.categories} product={product} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.product.matches,
  categories: state.app.categories,
  messages: state.product.messages,
});

export default connect(
  mapStateToProps,
  {
    getProductMatches,
    handleSwipe,
    getMatchMessages,
    sendMessage,
  }
)(MatchesComponent);
