import React from 'react';
import {
  Form,
  Button,
  Icon,
  Alert,
  Select,
  Input,
  InputNumber,
  Tooltip,
  Card,
  Upload,
} from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { API_URI, IMAGE_SRC } from '../../services/constans';

const FormItem = Form.Item;

class EditProductForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      images: [],
      location: null,
      errors: {},
      isLoading: true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUploadImage = this.onUploadImage.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
  }

  componentWillMount() {
    this.prepareFileList();
    this.handleLocationSelect(this.props.product.location.address);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.location === null && this.props.location !== null) {
      this.setState({ isLoading: false });
    }
  }

  onUploadImage({ file, fileList }) {
    const newState = {};
    if (file.status === 'done' && !file.error && file.response.path) {
      newState.images = [...this.state.images, file.response.path];
      newState.errors = { ...this.state.errors };
      delete newState.errors.fileList;
    } else if (file.status === 'removed') {
      newState.images = this.state.images.filter(i => i.indexOf(file.name) === -1);
    }
    this.setState({ ...newState, fileList });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const errors = this.validateFields();
      if (Object.keys(errors).length > 0) return this.setState({ errors });
      if (!err) {
        delete values.images;
        values.images = this.state.images;
        values.location = this.state.location;
        values._id = this.props.product._id;
        values.createdBy = this.props.product.user;
        this.props.onSubmit(values);
      }
    });
  }

  handleLocationChange(address) {
    const errors = { ...this.state.errors };
    if (address.length > 0) {
      delete errors.location;
    }
    this.setState({ location: { ...this.state.location, address }, errors });
  }

  handleLocationSelect(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ location: { ...latLng, address } }))
      .catch(() => this.setState({ location: '' }));
  }

  validateFields() {
    const errors = {};
    if (this.state.images.length === 0) errors.fileList = true;
    if (Object.keys(this.state.location).length === 0) errors.location = true;
    return errors;
  }

  prepareFileList() {
    const fileList = [];
    const images = [];
    this.props.product.images.map((image, i) => {
      fileList.push({
        uid: i,
        name: image.replace('uploads/', ''),
        status: 'done',
        url: IMAGE_SRC + image,
        thumbUrl: IMAGE_SRC + image,
      });
      images.push(image);
    });
    this.setState({
      fileList,
      images,
    });
  }

  render() {
    const { fileList, errors, location } = this.state;
    const { product } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (this.state.isLoading) return null;
    return (
      <Form className="upload__form" onSubmit={this.handleSubmit}>
        <Card title="Product Details">
          <FormItem
            label={(
              <span>
              Title&nbsp;
                <Tooltip placement="right" title="Describe your product in a few words">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            required
          >
            {getFieldDecorator('title', {
              initialValue: product.title,
              rules: [{
                min: 5,
                message: 'Must be at least 5 characters',
              }, {
                required: true, message: 'Please enter title',
              }],
            })(<Input
              maxLength={20}
              placeholder="Type title"
            />)}
          </FormItem>
          <FormItem
            label={(
              <span>
              Category&nbsp;
                <Tooltip placement="right" title="Choose the category of the product you have">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            required
          >
            {getFieldDecorator('category', {
              initialValue: product.category,
              rules: [{
                required: true, message: 'Please select the product category',
              }],
            })(<Select
              placeholder="Choose category"
            >
              {this.props.categories.map(category =>
                (category.id !== 0 ? <Select.Option key={category.id}>{category.displayName}</Select.Option> : null))}
            </Select>)}

          </FormItem>
          <FormItem
            label={(
              <span>
              Description&nbsp;
                <Tooltip placement="right" title="Add some information about the product. his condition, warranty and specs">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            required
          >
            {getFieldDecorator('description', {
              initialValue: product.description,
              rules: [{ min: 10, message: 'Must be at least 10 characters' }, {
                required: true, message: 'Please enter description',
              }],
            })(<Input.TextArea
              maxLength={255}
              placeholder="Add description"
            />)}

          </FormItem>
          <FormItem
            label={(
              <span>
              Price&nbsp;
                <Tooltip placement="right" title="Your product price estimation">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            required
          >
            {getFieldDecorator('price.min', { initialValue: Number(product.price.min) })(<InputNumber
              min={1}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />)} <div className="priceSeparate">~</div>
            {getFieldDecorator('price.max', { initialValue: Number(product.price.max) })(<InputNumber
              max={100000}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
            />)}
          </FormItem>
          <FormItem
            label={(
              <span>
              Images&nbsp;
                <Tooltip placement="right" title="Allow PNG, JPG, JPEG, ">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            extra="PNG, JPG, JPEG. Max file size 10mb"
            required
          >
            {getFieldDecorator('images', {})(<Upload
              listType="picture"
              accept="image/png,image/jpeg,image/jpg"
              action={`${API_URI}/products/image`}
              headers={{ authorization: this.props.token }}
              fileList={fileList}
              multiple
              onChange={this.onUploadImage}
            >
              <Button>
                <Icon type="upload" /> upload
              </Button>
              {errors.fileList && <div className="error">Please upload at least one image</div>}
            </Upload>)}
          </FormItem>
          <FormItem
            className={errors.location && 'has-error'}
            label={(
              <span>
              Location&nbsp;
                <Tooltip placement="right" title="Choose the region of the exchange">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            required
          >
            <PlacesAutocomplete
              onChange={this.handleLocationChange}
              onSelect={this.handleLocationSelect}
              value={location.address}
            >
              {({ getInputProps, suggestions, getSuggestionItemProps }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: 'Type location',
                      className: 'ant-input',
                    })}
                  />
                  <div className="certain-category-search-dropdown ant-select-dropdown-menu-item-group">
                    <ul className="ant-select-dropdown-menu-item-group-list">
                      {suggestions.map(suggestion => (
                        <li
                          className="ant-select-dropdown-menu-item"
                          key={suggestion.description}
                          {...getSuggestionItemProps(suggestion)}
                        >
                          {suggestion.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {errors.location && <div className="error">Please choose the product location</div>}
          </FormItem>
          <FormItem
            label={(
              <span>
              Want in return&nbsp;
                <Tooltip placement="right" title="Choose the categories that you would like to trade in return">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
            required
          >
            {getFieldDecorator('wanted', {
              initialValue: product.wanted,
              rules: [{
                required: true, message: 'Please select what you want in return',
              }],
            })(<Select
              mode="tags"
              placeholder="Choose categories"
            >
              {this.props.categories.map(category =>
                <Select.Option key={category.id}>{category.displayName}</Select.Option>)}
            </Select>)}
          </FormItem>
        </Card>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          className="upload__form--button"
        >
          Update<Icon type="right" />
        </Button>
      </Form>
    );
  }
}


const WrappedEditProductForm = Form.create()(EditProductForm);

export default WrappedEditProductForm;
