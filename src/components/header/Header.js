import React from "react";
import PropTypes from "prop-types";
import {Logo} from 'tarely-components';
import "./header.css";

class Header extends React.PureComponent {

  render() {
    const {likes, messages} = this.props;
    return (
      <div className="header">
        <Logo size='sm' />
        <div className="likeWrapper">
          <span className='icon icon-like' />
          {likes !== 0 && <span className='icon-like--new'>{likes}</span>}
        </div>
        <div className="messagesWrapper">
          <span className='icon icon-message' />
          {messages !== 0 && <span className='icon-message--new'>{messages}</span>}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  likes: PropTypes.number,
  messages: PropTypes.number
};

export default Header;
