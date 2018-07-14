import React from 'react';
import {
  Form,
  Button,
  Upload,
  Icon,
  Select,
  Input,
  Card,
} from 'antd';

import countries from '../../services/countries.json';
import { API_URI, IMAGE_SRC } from '../../services/constans';

const FormItem = Form.Item;
const { Option } = Select;

class EditUserProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
    this.onUploadImage = this.onUploadImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.prepareFileList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage && this.props.errorMessage !== nextProps.errorMessage) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values)
        if (this.state.fileList[0].status !== 'done') {
          delete values.avatar;
        }
        this.props.onSubmit(values);
      }
    });
  }

  prepareFileList() {
    const avatar = this.props.user.avatar || 'uploads/avatar.png';
    this.setState({
      fileList: [{
        uid: 0,
        name: avatar.replace('uploads/', ''),
        status: 'done',
        url: IMAGE_SRC + avatar,
        thumbUrl: IMAGE_SRC + avatar,
      }],
    });
  }

  onUploadImage({ file }) {
    this.setState({ fileList: [file] });
  }

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;
    const token = localStorage.getItem('tarelyJWTToken');
    return (
      <Form className="upload__form" onSubmit={this.handleSubmit}>
        <Card title="Product Details">
          <FormItem
            label="Avatar"
          >
            {getFieldDecorator('avatar', {})(<Upload
              listType="picture"
              accept="image/png,image/jpeg,image/jpg"
              action={`${API_URI}/products/image`}
              headers={{ authorization: token }}
              fileList={this.state.fileList}
              multiple={false}
              onChange={this.onUploadImage}
            >
              <Button>
                <Icon type="upload" />Upload
              </Button>
            </Upload>)}
          </FormItem>
          <FormItem
            label="Email"
          >
            {getFieldDecorator('email', {
              initialValue: user.email,
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="First Name"
          >
            {getFieldDecorator('firstName', {
              initialValue: user.firstName,
              rules: [{
                required: true, message: 'Please input your first name!',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Last Name"
          >
            {getFieldDecorator('lastName', {
              initialValue: user.lastName,
              rules: [{
                required: true, message: 'Please input your last name',
              }],
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Country"
          >
            {getFieldDecorator('country', {
              initialValue: user.country,
              rules: [{
                required: true, message: 'Please input your country',
              }],
            })(<Select
              showSearch
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              placeholder="Choose country"
            >
              {countries.map(c => (
                <Option key={c.value} value={c.value}>{c.label}</Option>
                ))}
               </Select>)}
          </FormItem>
        </Card>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="upload__form--button"
        >
          Next<Icon type="right" />
        </Button>
      </Form>
    );
  }
}


const WrappedEditUserProfileForm = Form.create()(EditUserProfileForm);

export default WrappedEditUserProfileForm;
