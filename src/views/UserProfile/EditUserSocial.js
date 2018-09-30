import React from 'react';
import { Card, Form, Icon, Button } from 'antd';
import { AwesomeButton } from 'react-awesome-button';

const FormItem = Form.Item;

const EditUserSocial = ({ user, intl }) => (
    <Card title={intl.messages["profile.apps"]} extra={intl.messages["profile.apps.info"]} className="userProfile__social" >
        <FormItem label="Facebook">
            <AwesomeButton size="small" type="facebook" >
                <Icon type="facebook" />
                {user.facebookID ? "Disconnect" : intl.messages["profile.apps.button"]}
            </AwesomeButton>
        </FormItem>
        <FormItem label="Google">
            <AwesomeButton size="small" className="btn-google">
                <Icon type="google" />
                {user.googleID ? "Disconnect" : intl.messages["profile.apps.button"]}
            </AwesomeButton>
        </FormItem>
    </Card>
)

export default EditUserSocial;