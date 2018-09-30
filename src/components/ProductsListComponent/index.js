import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Tooltip } from 'antd';
import { injectIntl, FormattedMessage } from 'react-intl';

import { BASE_URL } from '../../services/constans';

const ProductsListComponent = ({ products, onDeleteProduct }) => {
  return (
    <div className="productsList container">
      <div className="productsList__product">
        <div className="product__image">
          <Icon type="search" />
        </div>
        <div className="product__title">Search</div>
        <div className="product__description">
          Browse between products and bid on them
        </div>
        <div className="product__footer">
          <div className="product__icon">
            <Link to="/search">
              <Icon type="global" />
            </Link>
          </div>
        </div>
      </div>
      {products.map(product => (
        <div key={product._id} className="productsList__product">
          <div
            className="product__image"
            style={{ backgroundImage: `url(${BASE_URL + product.images[0]})` }}
          />
          <div className="product__title">{product.title}</div>
          <div className="product__description">{product.description}</div>
          <div className="product__footer">
            <div className="product__icon">
              <Tooltip placement="bottom" destroyTooltipOnHide={true} title="Edit" >
                <Link to={`/product/edit/${product._id}`}>
                  <Icon type="edit" />
                </Link>
              </Tooltip>
            </div>
            <Tooltip placement="bottom" destroyTooltipOnHide={true} title="View">
              <div className="product__icon">
                <Link to={`/product/${product._id}/swipe`}>
                  <Icon type="eye-o" />
                </Link>
              </div>
            </Tooltip>
            <Tooltip placement="bottom" destroyTooltipOnHide={true} title="Delete">
              <div
                className="product__icon"
                onClick={() => onDeleteProduct(product._id)}
              >
                <Icon type="delete" />
              </div>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  )
}

export default injectIntl(ProductsListComponent);
