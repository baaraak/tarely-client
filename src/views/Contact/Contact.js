import React from 'react';
import { Card, Icon } from 'antd';

import './contact.css';

class Contact extends React.Component {

    render() {
        return (
            <div className="container contact">
                <Card title="Contact us">
                    If you need further information or if you want to tell us your opinion,
                    please do not hesitate to get in touch with us! <br />We will be happy to help you!< br />
                    <a href="mailto:support@tarely.com">support@tarely.com</a>
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

export default Contact;