import React from 'react';
import { Modal, Form, Input, InputNumber, Alert } from 'antd';
import { AwesomeButton } from 'react-awesome-button';

const Textarea = Input.TextArea;
const FormItem = Form.Item;

const SendBidModal = ({ getFieldDecorator, bidProductID, handleCancel, handleSubmit, isBidSuccess }) => {
    return (
        <Modal
            title="Send a bid"
            visible={!!bidProductID}
            maskClosable={false}
            footer={[
                <AwesomeButton size="small" className="btn-danger" action={handleCancel}>Cancel</AwesomeButton>,
                <AwesomeButton size="small" action={handleSubmit}>Send</AwesomeButton>,
            ]}
        >
            <Form onSubmit={handleSubmit} className="login-form">
                {isBidSuccess === false && <Alert message="Something went wrong, please try again later" type="error" showIcon />}
                <FormItem label="Title" >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: 'Please add title!' }],
                    })(
                        <Input placeholder="Title" />
                    )}
                </FormItem>
                <FormItem label="Description" >
                    {getFieldDecorator('description', {
                        rules: [{ required: true, message: 'Add some text to describe your request' }],
                    })(
                        <Textarea />
                    )}
                </FormItem>
                <FormItem label="Price" >
                    {getFieldDecorator('price', {
                        rules: [{ required: true, message: 'Add bid price' }],
                    })(
                        <InputNumber
                            max={100000}
                            formatter={value =>
                                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            }
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
}

export default SendBidModal;