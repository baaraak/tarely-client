import React from 'react';
import { Form, Icon, Alert } from 'antd';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { injectIntl } from 'react-intl';
import { AwesomeButton } from 'react-awesome-button';
import { arrayMove } from 'react-sortable-hoc';

import ProductDetailsCard from './Cards/ProductDetailsCard';
import ProductPreferenceCard from './Cards/ProductPreferenceCard';

class UploadProductForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      images: [],
      location: '',
      locationCords: {},
      errors: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUploadImage = this.onUploadImage.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.errorMessage &&
      this.props.errorMessage !== nextProps.errorMessage
    ) {
      window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  validateFields() {
    const errors = {};
    if (this.state.images.length === 0) errors.fileList = true;
    if (Object.keys(this.state.locationCords).length === 0)
      errors.location = true;
    return errors;
  }

  handleSubmit(e) {
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const errors = this.validateFields();
      if (Object.keys(errors).length > 0) return this.setState({ errors });
      if (!err) {
        delete values.images;
        values.images = this.state.images;
        values.location = this.state.locationCords;
        this.props.onSubmit(values);
      }
    });
  }

  handleLocationChange(location) {
    const errors = { ...this.state.errors };
    if (location.length > 0) {
      delete errors.location;
    }
    this.setState({ location, errors });
  }

  handleLocationSelect(address) {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({ locationCords: { ...latLng, address }, location: address }))
      .catch(() => this.setState({ location: '' }));
  }

  onUploadImage({ fileList, file }) {
    const newState = {};
    if (file.status === 'removed' && file.response.path) {
      newState.images = this.state.images.filter(img => img !== file.response.path);
      if (newState.images.length === 0) {
        newState.errors = { ...this.state.errors, fileList: true };
      }
    }
    if (file.status === 'done' && !file.error && file.response.path) {
      newState.images = [...this.state.images, file.response.path];
      newState.errors = { ...this.state.errors, fileList: false };
    }
    this.setState({ ...newState, fileList });

  }

  handleDeleteImage = (file) => {
    this.setState({ fileList: this.state.fileList.filter(f => f.uid !== file.uid), images: this.state.images.filter(i => i.indexOf(file.name) === -1) });
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      fileList: arrayMove(this.state.fileList, oldIndex, newIndex),
      images: arrayMove(this.state.images, oldIndex, newIndex),
    });
  };

  render() {
    const token = localStorage.getItem('tarelyJWTToken');
    const { errors, location } = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="upload__form container">
        {this.props.errorMessage && (
          <Alert message={this.props.errorMessage} type="error" />
        )}
        <ProductDetailsCard
          categories={this.props.categories}
          getFieldDecorator={getFieldDecorator}
          fileListError={errors.fileList}
          fileList={this.state.fileList}
          submitImage={this.submitImage}
          onUploadImage={this.onUploadImage}
          token={token}
          handleDeleteImage={this.handleDeleteImage}
          onSortEnd={this.onSortEnd}
        />
        <ProductPreferenceCard
          categories={this.props.categories}
          getFieldDecorator={getFieldDecorator}
          handleLocationChange={this.handleLocationChange}
          handleLocationSelect={this.handleLocationSelect}
          errors={errors}
          location={location}
        />
        <AwesomeButton action={this.handleSubmit} className="upload__form--button">
          {this.props.intl.messages["product.button.upload"]}<Icon type="right" />
        </AwesomeButton>

      </Form>
    );
  }
}

const WrappedUploadProductForm = Form.create()(UploadProductForm);

export default injectIntl(WrappedUploadProductForm);
