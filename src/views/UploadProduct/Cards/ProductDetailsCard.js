import React from 'react';
import {
  Button,
  Select,
  Input,
  InputNumber,
  Tooltip,
  Card,
  Upload,
  Form,
  Icon,
} from 'antd';
import { API_URI } from '../../../services/constans';

const FormItem = Form.Item;

const ProductDetailsCard = ({
  categories,
  getFieldDecorator,
  fileListError,
  fileList,
  onUploadImage,
  token,
}) => (
  <Card title="Product Details">
    <FormItem
      label={
        <span>
          Title&nbsp;
          <Tooltip
            placement="right"
            title="Describe your product in a few words"
          >
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      }
      required
    >
      {getFieldDecorator('title', {
        rules: [
          {
            min: 5,
            message: 'Must be at least 5 characters',
          },
          {
            required: true,
            message: 'Please enter title',
          },
        ],
      })(<Input maxLength={20} placeholder="Type title" />)}
    </FormItem>
    <FormItem
      label={
        <span>
          Category&nbsp;
          <Tooltip
            placement="right"
            title="Choose the category of the product you have"
          >
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      }
      required
    >
      {getFieldDecorator('category', {
        rules: [
          {
            required: true,
            message: 'Please select the product category',
          },
        ],
      })(
        <Select placeholder="Choose category">
          {categories.map(
            category =>
              category.id !== 0 ? (
                <Select.Option key={category.id}>
                  {category.displayName}
                </Select.Option>
              ) : null
          )}
        </Select>
      )}
    </FormItem>
    <FormItem
      label={
        <span>
          Description&nbsp;
          <Tooltip
            placement="right"
            title="Add some information about the product. his condition, warranty and specs"
          >
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      }
      required
    >
      {getFieldDecorator('description', {
        rules: [
          { min: 10, message: 'Must be at least 10 characters' },
          {
            required: true,
            message: 'Please enter description',
          },
        ],
      })(<Input.TextArea maxLength={255} placeholder="Add description" />)}
    </FormItem>
    <FormItem
      label={
        <span>
          Price&nbsp;
          <Tooltip placement="right" title="Your product price estimation">
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      }
      required
    >
      {getFieldDecorator('price.min', { initialValue: 150 })(
        <InputNumber
          min={1}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      )}{' '}
      <div className="priceSeparate">~</div>
      {getFieldDecorator('price.max', { initialValue: 300 })(
        <InputNumber
          max={100000}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          }
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      )}
    </FormItem>
    <FormItem
      label={
        <span>
          Images&nbsp;
          <Tooltip placement="right" title="Allow PNG, JPG, JPEG, ">
            <Icon type="question-circle-o" />
          </Tooltip>
        </span>
      }
      extra="PNG, JPG, JPEG. Max file size 10mb"
      required
    >
      {getFieldDecorator('images', {})(
        <Upload
          listType="picture"
          accept="image/png,image/jpeg,image/jpg"
          action={`${API_URI}/products/image`}
          headers={{ authorization: token }}
          fileList={fileList}
          mutiple
          onChange={onUploadImage}
        >
          <Button>
            <Icon type="upload" /> upload
          </Button>
          {fileListError && (
            <div className="error">Please upload at least one image</div>
          )}
        </Upload>
      )}
    </FormItem>
  </Card>
);

export default ProductDetailsCard;
