import React from 'react';
import { Card, Icon } from 'antd';
import { injectIntl } from 'react-intl';

import './contact.css';

class Contact extends React.Component {

    render() {
        const { messages } = this.props.intl;
        return (
            <div className="container contact">
                <Card title={messages["contactUs.title"]}>
                    <p dangerouslySetInnerHTML={{ __html: messages["contactUs.content"] }} />
                    <a href={`mailto:${messages["app.email.support"]}`}>{messages["app.email.support"]}</a>
                    <div className="social">
                        <a href="https://www.facebook.com/" rel="noopener noreferrer" target="_blank"><Icon type="facebook" /></a>
                        <a href="https://www.twitter.com/" rel="noopener noreferrer" target="_blank"><Icon type="twitter" /></a>
                        <a href="https://www.slack.com/" rel="noopener noreferrer" target="_blank"><Icon type="slack" /></a>
                    </div>
                </Card>
            </div>
        );
    }
}

export default injectIntl(Contact);