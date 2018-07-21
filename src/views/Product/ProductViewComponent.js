import React from 'react';
import { Carousel } from 'antd';
import { IMAGE_SRC } from '../../services/constans';

const ProductViewComponent = ({ product, onClose }) => (
  <div className="productView">
    {onClose && <div className="product__close" onClick={onClose}>x</div>}
    <div className="product__images">
      <Carousel>
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

export default ProductViewComponent;
