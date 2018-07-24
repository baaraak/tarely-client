import React from 'react';
import Textarea from 'react-textarea-autosize';
import { Picker } from 'emoji-mart';
import { Icon } from 'antd';

import 'emoji-mart/css/emoji-mart.css';
import './chatInput.css';

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isPickerVisible: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onSelectEmoji = this.onSelectEmoji.bind(this);
    this.togglePickerVisibility = this.togglePickerVisibility.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  onKeyDown(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      this.onSubmit();
    }
  }

  onSelectEmoji(code) {
    const test = code.native;
    this.setState({ value: this.state.value + test });
  }

  togglePickerVisibility() {
    this.setState({ isPickerVisible: !this.state.isPickerVisible });
  }

  onSubmit() {
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    const { isPickerVisible } = this.state;
    return (
      <div className="chatInput">
        <div className="chatInput__actions">
          <div className="icon icon-emoji">
            <Icon onClick={this.togglePickerVisibility} type="smile-o" />
            {isPickerVisible && (
              <Picker showPreview={false} onSelect={this.onSelectEmoji} />
            )}
          </div>
        </div>
        <Textarea
          onChange={this.onChange}
          value={this.state.value}
          onKeyDown={this.onKeyDown}
          placeholder="Type Message"
        />
        <div className="chatInput__send" onClick={this.onSubmit}>
          <span className="icon icon-send" />
        </div>
      </div>
    );
  }
}

export default ChatInput;
