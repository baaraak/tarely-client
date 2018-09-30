import React from 'react';
import { Form, Button, Upload, Icon, Select, Input, Card } from 'antd';
import { AwesomeButton } from 'react-awesome-button';

import countries from '../../services/countries.json';
import { API_URI, BASE_URL } from '../../services/constans';

const FormItem = Form.Item;
const { Option } = Select;

class EditUserProfileDetails extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      avatar: {},
    };
    this.onUploadImage = this.onUploadImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.prepareFileList();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.errorMessage &&
      this.props.errorMessage !== nextProps.errorMessage
    ) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  handleSubmit(e) {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const file = this.state.avatar;
        values.avatar = file.response ? file.response.path : null;
        if (values.avatar) this.props.changeUserAvatar(values.avatar)
        this.props.onSubmit(values);
      }
    });
  }

  prepareFileList() {
    const avatar = this.props.user.avatar || 'uploads/avatar.png';
    this.setState({
      avatar: {
        uid: 0,
        name: avatar.replace('uploads/', ''),
        status: 'done',
        url: BASE_URL + avatar,
        thumbUrl: BASE_URL + avatar,
      },
    });
  }

  onRemove = (file) => {
    const avatar = 'uploads/avatar.png';
    this.setState({
      avatar: {
        uid: 0,
        name: avatar.replace('uploads/', ''),
        status: 'done',
        url: BASE_URL + avatar,
        thumbUrl: BASE_URL + avatar,
        response: { path: avatar }
      }
    });
    return false;
  };

  onUploadImage({ file }) {
    this.setState({ avatar: file });
  }

  render() {
    const { user } = this.props;
    const { getFieldDecorator } = this.props.form;
    const token = localStorage.getItem('tarelyJWTToken');
    return (
      <Form className="upload__form">
        <Card title={this.props.intl.messages["profile.details"]}>
          <FormItem label={this.props.intl.messages["profile.details.avatar"]}>
            {getFieldDecorator('avatar', {})(
              <Upload
                listType="picture"
                accept="image/png,image/jpeg,image/jpg"
                action={`${API_URI}/products/image`}
                headers={{ authorization: token }}
                fileList={[this.state.avatar]}
                onRemove={this.onRemove}
                multiple={false}
                showUploadList={{ showRemoveIcon: this.state.avatar.name !== 'avatar.png' }}
                onChange={this.onUploadImage}
              >
                <AwesomeButton size="small" >
                  <Icon type="upload" />{this.props.intl.messages["profile.details.avatar.button"]}
                </AwesomeButton>
              </Upload>
            )}
          </FormItem>
          <FormItem label={this.props.intl.messages["profile.details.email"]}>
            {getFieldDecorator('email', {
              initialValue: user.email,
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input placeholder={this.props.intl.messages["profile.details.email.placeholder"]} />)}
          </FormItem>
          <FormItem label={this.props.intl.messages["profile.details.firstName"]}>
            {getFieldDecorator('firstName', {
              initialValue: user.firstName,
              rules: [
                {
                  required: true,
                  message: 'Please input your first name!',
                },
              ],
            })(<Input placeholder={this.props.intl.messages["profile.details.firstName.placeholder"]} />)}
          </FormItem>
          <FormItem label={this.props.intl.messages["profile.details.lastName"]}>
            {getFieldDecorator('lastName', {
              initialValue: user.lastName,
              rules: [
                {
                  required: true,
                  message: 'Please input your last name',
                },
              ],
            })(<Input placeholder={this.props.intl.messages["profile.details.lastName.placeholder"]} />)}
          </FormItem>
          <FormItem label={this.props.intl.messages["profile.details.country"]}>
            {getFieldDecorator('country', {
              initialValue: user.country,
              rules: [
                {
                  required: true,
                  message: 'Please input your country',
                },
              ],
            })(
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                placeholder="Choose country"
              >
                {countries.map(c => (
                  <Option key={c.value} value={c.value}>
                    {c.label}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <AwesomeButton
            size="large"
            className="floatR"
            action={this.handleSubmit}
          >
            {this.props.intl.messages["profile.details.button"]}
          </AwesomeButton>
        </Card>
      </Form>
    );
  }
}

const WrappedEditUserProfileDetails = Form.create()(EditUserProfileDetails);

export default WrappedEditUserProfileDetails;
