import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Input, Checkbox, InputNumber, Button, Select } from 'antd';

const { Option } = Select;

const BrowseFilters = ({
  categories,
  onChange,
  values,
  updateSearch,
  resetSearch,
}) => (
    <div className="browse__filters">
      <div className="filters__cell">
        <div className="filter__label">Search:</div>
        <div className="filter__content filter__content--search">
          <Input
            onChange={e => onChange('text', e.target.value)}
            value={values.text || ''}
            placeholder="I'm looking for..."
            onPressEnter={updateSearch}
          />
        </div>
      </div>

      <div className="filters__cell">
        <div className="filter__label">Sort:</div>
        <div className="filter__content filter__content--sort">
          <Select
            defaultValue="lucy"
            onChange={v => onChange('sort', v)}
          >
            <Option value="jack">Best Match</Option>
            <Option value="lucy">Price - lowest first</Option>
            <Option value="Yiminghe">Price - highest first</Option>
          </Select>
        </div>
      </div>

      <div className="filters__cell">
        <div className="filter__label">Categories:</div>
        <div className="filter__content filter__content--categories">
          {categories.map(category => (
            <div className="filter__category" key={category.id}>
              <Checkbox
                id={category.id.toString()}
                checked={
                  values.category
                    ? values.category
                      .split(',')
                      .indexOf(category.id.toString()) !== -1
                    : false
                }
                onChange={v => onChange('category', v.target.id)}
              >
                {category.displayName}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>

      <div className="filters__cell">
        <div className="filter__label">Price:</div>
        <div className="filter__content filter__content--price">
          <InputNumber
            max={100000}
            value={values.minPrice}
            onChange={v => onChange('minPrice', v)}
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
          <div className="filter__price--separator">-</div>
          <InputNumber
            max={100000}
            onChange={v => onChange('maxPrice', v)}
            value={values.maxPrice}
            formatter={value =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
          />
        </div>
      </div>

      <div className="filters__cell">
        <div className="filter__label">Location:</div>
        <div className="filter__content filter__content--location">
          <PlacesAutocomplete
            value={values.location || ''}
            onChange={v => onChange('location', v)}
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
        </div>
      </div>
      <div className="filters__cell--actions">
        <Button size="small" type="primary" onClick={updateSearch}>
          Search
      </Button>
        <Button size="small" onClick={resetSearch}>
          Reset
      </Button>
      </div>
    </div>
  );

export default BrowseFilters;
