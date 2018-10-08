import React from 'react';
import { Tooltip, Card, Form, Icon, Select } from 'antd';
import { injectIntl } from 'react-intl';
import PlacesAutocomplete from 'react-places-autocomplete';

const FormItem = Form.Item;

const ProductPreferenceCard = ({
  getFieldDecorator,
  location,
  handleLocationChange,
  handleLocationSelect,
  errors,
  categories,
  intl,
}) => (
    <Card title={intl.messages["product.preferences"]}>
      <FormItem
        className={errors.location && 'has-error'}
        label={
          <span>
            {intl.messages["product.location"]}&nbsp;
          <Tooltip placement="right" title={intl.messages["product.location.info"]}>
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        required
      >
        <PlacesAutocomplete
          onChange={handleLocationChange}
          onSelect={handleLocationSelect}
          value={location}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div className="geo-autocomplete">
              <input
                {...getInputProps({
                  placeholder: intl.messages["product.location.placeholder"],
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
        {errors.location && (
          <div className="error">Please enter valid address</div>
        )}
      </FormItem>
      <FormItem
        label={
          <span>
            {intl.messages["product.wanted"]}&nbsp;
            <Tooltip
              placement="right"
              title={intl.messages["product.wanted.info"]}
            >
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
        required
      >
        {getFieldDecorator('wanted', {
          rules: [
            {
              required: true,
              message: 'Please select what you want in return',
            },
          ],
        })(
          <Select mode="tags" placeholder="Choose categories">
            {categories.map(category => (
              <Select.Option key={category.id}>
                {category.displayName}
              </Select.Option>
            ))}
          </Select>
        )}
      </FormItem>
    </Card>
  );

export default injectIntl(ProductPreferenceCard);
