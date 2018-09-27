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
import { AwesomeButton } from 'react-awesome-button';

import { injectIntl } from 'react-intl';
import { API_URI } from '../../../services/constans';

const FormItem = Form.Item;

const ProductDetailsCard = ({
  categories,
  getFieldDecorator,
  fileListError,
  fileList,
  onUploadImage,
  token,
  intl,
}) => (
    <Card title={intl.messages["product.description"]}>
      <FormItem
        label={
          <span>
            {intl.messages["product.title"]}&nbsp;
          <Tooltip
              placement="right"
              title={intl.messages["product.title.info"]}
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
        })(<Input maxLength={20} placeholder={intl.messages["product.title.placeholder"]} />)}
      </FormItem>
      <FormItem
        label={
          <span>
            {intl.messages["product.category"]}&nbsp;
          <Tooltip
              placement="right"
              title={intl.messages["product.category.info"]}
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
          <Select placeholder={intl.messages["product.category.placeholder"]}>
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
            {intl.messages["product.description"]}&nbsp;
          <Tooltip
              placement="right"
              title={intl.messages["product.description.info"]}
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
        })(<Input.TextArea maxLength={255} placeholder={intl.messages["product.description.placeholder"]} />)}
      </FormItem>
      <FormItem
        label={
          <span>
            {intl.messages["product.price"]}&nbsp;
          <Tooltip placement="right" title={intl.messages["product.price.info"]}>
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        required
      >
        {getFieldDecorator('price.min', { initialValue: 150 })(
          <InputNumber
            min={1}
            placeholder={intl.messages["product.price.min.placeholder"]}
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
            placeholder={intl.messages["product.price.max.placeholder"]}
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
            {intl.messages["product.images"]}&nbsp;
          <Tooltip placement="right" title={intl.messages["product.images.info"]}>
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        extra={intl.messages["product.images.extra"]}
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
            <AwesomeButton size="small">
              <Icon type="upload" /> {intl.messages["product.images.button"]}
            </AwesomeButton>
            {fileListError && (
              <div className="error">Please upload at least one image</div>
            )}
          </Upload>
        )}
      </FormItem>
    </Card>
  );

export default injectIntl(ProductDetailsCard);
