import React from 'react';
import { Icon } from 'antd'
import { Link } from 'react-router-dom';

import { IMAGE_SRC } from '../../../services/constans';

const BrowseProductsList = ({ products, onClick, product }) => (
  <div className="browse__products">
    {products.length === 0 ? <div className="browse__products--noMessage">No products found</div> :
      products.map(p => {
        let className = ['productsList__product'];
        if (product.likes.indexOf(p._id) !== -1) className.push('productsList__product--liked');
        if (product.dislikes.indexOf(p._id) !== -1) className.push('productsList__product--disliked');
        return (
          <div
            key={p._id}
            className={className.join(' ')}
            onClick={() => onClick(p._id)}
          >
            <div className="product__image" style={{ backgroundImage: `url(${IMAGE_SRC + p.images[0]})` }} />
            <div className="product__title">{p.title}</div>
            <div className="product__description">{p.description}</div>
            <div className="product__price">{p.price.min} - {p.price.max}</div>
          </div>
        )
      })}
  </div>
);

export default BrowseProductsList;
