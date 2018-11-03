import React from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';
import io from 'socket.io-client';
import { injectIntl, FormattedMessage } from 'react-intl';
import { AwesomeButton } from 'react-awesome-button';

import MatchesList from './MatchesList';
import MatchRoom from './MatchRoom';
import ProductView from '../../../components/ProductView';

import {
  getProductMatches,
  handleSwipe,
  getMatchMessages,
  sendMessage,
  getBidMessages,
  onUnmatch,
} from '../../../redux/actions/product.actions';
import { Modal } from "antd/lib/index";

const socketUrl = 'http://localhost:9000';

class MatchesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      matches: props.matches,
      currentMatchID: null,
      socket: null,
      messages: null,
      isModalOpen: false,
      isProductViewOpen: !props.isMobile,
    };
    this.changeCurrentMatch = this.changeCurrentMatch.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
    this.setContentRefAndScroll = this.setContentRefAndScroll.bind(this);
    this.addChat = this.addChat.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentWillMount() {
    this.props.getProductMatches(this.props.productId);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.state.isLoading &&
      this.props.matches !== nextProps.matches &&
      Array.isArray(nextProps.matches)
    ) {
      const currentMatchID = nextProps.matches.length ? nextProps.matches[0].matchId : null;
      this.setState({
        matches: nextProps.matches,
        currentMatchID,
        isLoading: false,
      });
      this.initSocket();
      if (currentMatchID) this.props.getMatchMessages(currentMatchID);
    }

    if (this.props.matches !== nextProps.matches) {
      const currentMatchID = nextProps.matches[0] ? nextProps.matches[0].matchId : null;
      this.setState({ matches: nextProps.matches, isLoading: false, currentMatchID, messages: null });
      if (currentMatchID) this.props.getMatchMessages(currentMatchID);
    }
    if (this.props.messages !== nextProps.messages) {
      this.setState({ messages: nextProps.messages });
    }
  }

  initSocket() {
    const socket = io(socketUrl);

    socket.on('connect', () => {
      console.log('Socket Connected');
    });

    this.setState({ socket }, () => {
      socket.emit('COMMUNITY_CHAT', this.addChat)
    });
  }

  addChat() {
    const { socket, matches } = this.state;

    matches.forEach(match => {
      const messageEvent = `MESSAGE_RECIEVED-${match.matchId}`
      const typingEvent = `TYPING-${match.matchId}`

      socket.on(typingEvent, this.updateTypingInChat(match.matchId))
      socket.on(messageEvent, this.addMessageToChat(match.matchId))
    });
    socket.emit('USER_CONNECTED', this.props.productId);
  }

  addMessageToChat = (chatId) => {
    return (data) => {
      this.setState({
        messages: [...this.state.messages, {
          _id: data.id,
          body: data.message,
          createdAt: new Date(),
          from: data.sender,
        }]
      }, () => this.setContentRefAndScroll())
    }
  }

  updateTypingInChat = (chatId) => {
    return ({ isTyping, user }) => {
      if (user !== this.props.user.name) {

        const { chats } = this.state

        let newChats = chats.map((chat) => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user)
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user)
            }
          }
          return chat
        })
        this.setState({ chats: newChats })
      }
    }
  }

  changeCurrentMatch(currentMatchID, type) {
    if (this.state.currentMatchID === currentMatchID) return;
    this.setState({ currentMatchID });
    if (type === 'MATCHES') {
      this.props.getMatchMessages(currentMatchID);
    } else {
      this.props.getBidMessages(currentMatchID);
    }
  }

  renderNoMatches() {
    return (
      <div className="productPage__matches--noMessage">
        {this.props.intl.messages["matches.noMatches"]}
      </div>
    );
  }

  getCurrentProduct() {
    return this.state.matches.filter(m =>
      (m.matchId === this.state.currentMatchID) ||
      (m.bidId === this.state.currentMatchID)
    )[0];
  }

  setContentRefAndScroll(ref = this.messagesContainer) {
    if (ref) {
      this.messagesContainer = ref;
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight + 40;
    }
  }

  onSubmitMessage(body) {
    const message = {
      body,
      from: this.props.productId,
      to: this.getCurrentProduct()._id,
      match: this.state.currentMatchID,
    };
    this.state.socket.emit('MESSAGE_SENT', message);
    this.setState({
      messages: [...this.state.messages, {
        _id: new Date(),
        body,
        createdAt: new Date(),
        from: this.props.productId,
      }]
    }, this.setContentRefAndScroll)
    this.props.sendMessage(message);
  }


  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  }

  onClickInfo = () => {
    this.setState({ isProductViewOpen: !this.state.isProductViewOpen });
  }

  handleDelete() {
    if (this.Modal) this.Modal.destroy();
    this.props.onUnmatch(this.state.currentMatchID);
  }


  render() {
    const { matches, currentMatchID, isLoading, messages, isProductViewOpen } = this.state;
    const { isMobile } = this.props;
    if (isLoading)
      return (
        <div className="productPage__matches">
          <Spin size="large" />
        </div>
      );
    if (matches.length === 0) return this.renderNoMatches();
    const currentMatch = this.getCurrentProduct();
    return (
      <div className="productPage__matches">
        <MatchesList
          productId={this.props.productId}
          matches={matches}
          currentMatchID={currentMatchID}
          onClick={this.changeCurrentMatch}
          intl={this.props.intl}
          isMobile={isMobile}
        />
        {cu}
        {isProductViewOpen && currentMatch.product && <ProductView
          buttonLabel={<FormattedMessage id="matches.unMatch.button" />}
          categories={this.props.categories}
          product={currentMatch.product}
          onActionClick={this.toggleModal}
          isMobile={isMobile}
          onClose={isMobile && this.onClickInfo}
        />}
        <Modal
          visible={!!this.state.isModalOpen}
          onCancel={this.toggleModal}
          className="productPage__matches--modal"
          footer={[<AwesomeButton size="small" key={1} type="secondary" action={this.toggleModal} >{this.props.intl.messages["matches.unMatch.modal.cancel"]}</AwesomeButton>,
          <AwesomeButton key={2} size="small" className="btn-danger" action={this.handleDelete} >{this.props.intl.messages["matches.unMatch.modal.ok"]}</AwesomeButton>]}
        >
          <h2>{this.props.intl.messages["matches.noMatches"]}</h2>
          <p dangerouslySetInnerHTML={{ __html: this.props.intl.messages["matches.unMatch.modal.message"] }} ></p>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  matches: state.product.matches,
  categories: state.app.categories,
  isMobile: state.app.isMobile,
  messages: state.product.messages,
});

export default connect(
  mapStateToProps,
  {
    getProductMatches,
    handleSwipe,
    getMatchMessages,
    onUnmatch,
    sendMessage,
    getBidMessages,
  }
)(injectIntl(MatchesComponent));
