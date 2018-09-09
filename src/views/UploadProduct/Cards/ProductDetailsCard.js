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
    <Card title={intl.messages["uploadProduct.details"]}>
      <FormItem
        label={
          <span>
            {intl.messages["uploadProduct.details.title"]}&nbsp;
          <Tooltip
              placement="right"
              title={intl.messages["uploadProduct.details.title.info"]}
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
        })(<Input maxLength={20} placeholder={intl.messages["uploadProduct.details.title.placeholder"]} />)}
      </FormItem>
      <FormItem
        label={
          <span>
            {intl.messages["uploadProduct.details.category"]}&nbsp;
          <Tooltip
              placement="right"
              title={intl.messages["uploadProduct.details.category.info"]}
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
          <Select placeholder={intl.messages["uploadProduct.details.category.placeholder"]}>
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
            {intl.messages["uploadProduct.details.description"]}&nbsp;
          <Tooltip
              placement="right"
              title={intl.messages["uploadProduct.details.description.info"]}
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
        })(<Input.TextArea maxLength={255} placeholder={intl.messages["uploadProduct.details.description.placeholder"]} />)}
      </FormItem>
      <FormItem
        label={
          <span>
            {intl.messages["uploadProduct.details.price"]}&nbsp;
          <Tooltip placement="right" title={intl.messages["uploadProduct.details.price.info"]}>
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        required
      >
        {getFieldDecorator('price.min', { initialValue: 150 })(
          <InputNumber
            min={1}
            placeholder={intl.messages["uploadProduct.details.price.min.placeholder"]}
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
            placeholder={intl.messages["uploadProduct.details.price.max.placeholder"]}
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
            {intl.messages["uploadProduct.details.images"]}&nbsp;
          <Tooltip placement="right" title={intl.messages["uploadProduct.details.images.info"]}>
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        extra={intl.messages["uploadProduct.details.images.extra"]}
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
              <Icon type="upload" /> {intl.messages["uploadProduct.details.images.button"]}
            </Button>
            {fileListError && (
              <div className="error">Please upload at least one image</div>
            )}
          </Upload>
        )}
      </FormItem>
    </Card>
  );

export default injectIntl(ProductDetailsCard);
