import React from 'react';
import { Spin } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import { BASE_URL } from '../../services/constans';

const BrowseProductsList = ({ products, onClick, isLoading }) => {
  if (isLoading || !Array.isArray(products))
    return (
      <div className="browse__products browse__products--loading">
        <Spin size="large" />
      </div>
    );
  return (
    <Scrollbars>
      <div className="browse__products">
        {products.length === 0 ? (
          <div className="browse__products--noMessage">No products found</div>
        ) : (
            products.map(p => {
              return (
                <div
                  key={p._id}
                  className="productsList__product"
                  onClick={() => onClick(p._id)}
                >
                  <div
                    className="product__image"
                    style={{ backgroundImage: `url(${BASE_URL + p.images[0]})` }}
                  />
                  <div className="product__title">{p.title}</div>
                  <div className="product__description">{p.description.substring(0, 60)}...</div>
                  <div className="product__price">
                    Price: ${p.price.min} - ${p.price.max}
                  </div>
                </div>
              );
            })
          )}
      </div>
    </Scrollbars>
  );
};

export default BrowseProductsList;
