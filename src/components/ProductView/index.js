import React from 'react';
import { Carousel } from 'antd';
import { BASE_URL } from '../../services/constans';

import './productView.css';

const ProductViewComponent = ({ product, onClose, categories }) => (
  <div className="productView">
    {onClose && (
      <div className="product__close" onClick={onClose}>
        x
      </div>
    )}
    <div className="product__images">
      <Carousel>
        {product.images.map(image => (
          <img src={BASE_URL + image} key={image} alt="" />
        ))}
      </Carousel>
    </div>
    <div className="product__title">{product.title}</div>
    <div className="product__spec">
      <div className="product__spec--label">Description:</div>
      <div className="product__sec--content">{product.description}</div>
    </div>
    <div className="product__spec">
      <div className="product__spec--label">Category:</div>
      <div className="product__spec--content">{categories.filter(c => c.id === Number(product.category))[0].displayName}</div>
    </div>
    <div className="product__spec">
      <div className="product__spec--label">Description:</div>
      <div className="product__spec--content">{product.description}</div>
    </div>
  </div>
);

export default ProductViewComponent;
