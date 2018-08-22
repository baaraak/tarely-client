import React from 'react';
import { Card, Form, Icon, Button } from 'antd';

const FormItem = Form.Item;

const EditUserSocial = ({ user }) => (
    <Card title="Apps" extra="To sign in and upload photos, connect to your account." className="userProfile__social" >
        <FormItem label="Facebook">
            <Icon type="facebook" />
            {user.facebookID ? <Button>Disconnect</Button> : <Button>Connect</Button>}
        </FormItem>
        <FormItem label="Instagram">
            <Icon type="instagram" />
            {user.instagramID ? <Button>Disconnect</Button> : <Button>Connect</Button>}
        </FormItem>
        <FormItem label="Twitter">
            <Icon type="twitter" />
            {user.twitterID ? <Button>Disconnect</Button> : <Button>Connect</Button>}
        </FormItem>
    </Card>
)

export default EditUserSocial;