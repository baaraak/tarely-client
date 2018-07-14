import React from 'react';
import { Carousel } from 'antd';
import { IMAGE_SRC } from '../../../services/constans';

const MatchProduct = ({ product }) => (
  <div className="match__product">
    <div className="product__images">
      <Carousel autoplay>
        {product.images.map(image => <img src={IMAGE_SRC + image} key={image} alt="" />)}
      </Carousel>
    </div>
    <div className="product__title">{product.title}</div>
    <div className="product__spec">
      <div className="product__spec--label">Description:</div>
      <div className="product__spec--content">{product.description}</div>
    </div>
    <div className="product__spec">
      <div className="product__spec--label">Description:</div>
      <div className="product__spec--content">{product.description}</div>
    </div>
    <div className="product__spec">
      <div className="product__spec--label">Description:</div>
      <div className="product__spec--content">{product.description}</div>
    </div>
  </div>
);

export default MatchProduct;
