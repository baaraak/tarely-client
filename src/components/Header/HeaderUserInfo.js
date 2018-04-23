import React from 'react';
import {connect} from "react-redux";
import {Badge, Tooltip, Avatar, Popover} from 'antd';

import AvatarMenuComponent from './AvatarMenuComponent';

class HeaderUserInfo extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            avatarMenuVisible: false,
        };
        this.handleAvatarMenuClicked = this.handleAvatarMenuClicked.bind(this);
    }

    handleAvatarMenuClicked(e) {
        this.setState({avatarMenuVisible: !this.state.avatarMenuVisible});
    };

    render() {
        return (
            <div className="header__userInfo">
                <Badge count={4}>
                    <Tooltip title="Messages">
                        <span className="icon icon-message"/>
                    </Tooltip>
                </Badge>
                <Badge count={0}>
                    <Tooltip title="Matches">
                        <span className="icon icon-like"/>
                    </Tooltip>
                </Badge>
                <Popover
                    content={<AvatarMenuComponent userFullName={this.props.user.fullName || 'Barak Cohen'}
                                                  newMessages={this.props.user.newMessage}/>}
                    trigger="click"
                    placement='bottomRight'
                    visible={this.state.avatarMenuVisible}
                    onVisibleChange={this.handleAvatarMenuClicked}
                >
                    <Avatar icon='user' />
                </Popover>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.app.user,
    };
};

export default connect(mapStateToProps)(HeaderUserInfo);
