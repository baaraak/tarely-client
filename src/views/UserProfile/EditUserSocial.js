import React from 'react';
import { Card, Form, Icon, Button } from 'antd';

const FormItem = Form.Item;

const EditUserSocial = ({ user, intl }) => (
    <Card title={intl.messages["profile.apps"]} extra={intl.messages["profile.apps.info"]} className="userProfile__social" >
        <FormItem label="Facebook">
            <Icon type="facebook" />
            {user.facebookID ? <Button>Disconnect</Button> : <Button>{intl.messages["profile.apps.button"]}</Button>}
        </FormItem>
        <FormItem label="Instagram">
            <Icon type="instagram" />
            {user.instagramID ? <Button>Disconnect</Button> : <Button>{intl.messages["profile.apps.button"]}</Button>}
        </FormItem>
        <FormItem label="Twitter">
            <Icon type="twitter" />
            {user.twitterID ? <Button>Disconnect</Button> : <Button>{intl.messages["profile.apps.button"]}</Button>}
        </FormItem>
    </Card>
)

export default EditUserSocial;