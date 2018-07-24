import React from 'react';
import { Tooltip, Card, Form, Icon, Select } from 'antd';
import PlacesAutocomplete from 'react-places-autocomplete';

const FormItem = Form.Item;

const ProductPreferenceCard = ({
  getFieldDecorator,
  location,
  handleLocationChange,
  handleLocationSelect,
  errors,
  categories,
}) => (
  <Card title="Product Preferences">
    <FormItem
      className={errors.location && 'has-error'}
      label={
        <span>
          Location&nbsp;
          <Tooltip placement="right" title="Choose the region of the exchange">
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
      {errors.location && (
        <div className="error">Please upload at least one image</div>
      )}
    </FormItem>
    <FormItem
      label={
        <span>
          Want in return&nbsp;
          <Tooltip
            placement="right"
            title="Choose the categories that you would like to trade in return"
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

export default ProductPreferenceCard;
