import React from 'react';
import { Menu } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';

const BidsTabs = ({ handleClick, id }) => (
    <Menu onClick={handleClick} selectedKeys={[id]} mode="horizontal">
        <Menu.Item key="ALL">
            <FormattedMessage id="search.bids.all" />
        </Menu.Item>
        <Menu.Item key="APPROVED">
            <FormattedMessage id="search.bids.approved" />
        </Menu.Item>
    </Menu>
);

export default injectIntl(BidsTabs);
