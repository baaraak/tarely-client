import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import { BASE_URL } from '../../services/constans';

const ProductsListComponent = ({ products, onDeleteProduct }) => (
  <div className="productsList">
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
            <Link to={`/product/edit/${product._id}`}>
              <Icon type="edit" />
            </Link>
          </div>
          <div className="product__icon">
            <Link to={`/product/${product._id}/swipe`}>
              <Icon type="eye-o" />
            </Link>
          </div>
          <div
            className="product__icon"
            onClick={() => onDeleteProduct(product._id)}
          >
            <Icon type="delete" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default ProductsListComponent;
