import React from 'react';
import { Carousel, Button } from 'antd';
import { BASE_URL } from '../../services/constans';

import './productView.css';

const ProductViewComponent = ({ product, onClose, categories, onDismatch }) => {

  // const renderActions = () => {
  //   if (asProduct) {
  //     return <React.Fragment>
  //       <Button className="btn_like" onClick={() => onLike(product._id)} >Like</Button>
  //       <Button className="btn_dislike" onClick={() => onDislike(product._id)} >Dislike</Button>
  //     </React.Fragment>
  //   } else {
  //     return <Button ghost type="primary" onClick={() => onBid(product._id)}>Send bid</Button>
  //   }
  // }
  console.log('***********************');
  console.log(onDismatch);
  console.log('***********************');
  const wantedCategories = categories.filter(c => product.wanted.some(pId => c.id === Number(pId))).map(cat => cat.displayName);
  return (
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
        <div className="product__spec--content">{product.description}</div>
      </div>
      <div className="product__spec">
        <div className="product__spec--label">Category:</div>
        <div className="product__spec--content">{categories.filter(c => c.id === Number(product.category))[0].displayName}</div>
      </div>
      <div className="product__spec">
        <div className="product__spec--label">Location:</div>
        <div className="product__spec--content">
          {product.location.address}
        </div>
      </div>
      <div className="product__spec">
        <div className="product__spec--label">Wanted:</div>
        <div className="product__spec--content">
          {wantedCategories.toString()}.
        </div>
      </div>
      <div className="product__spec">
        <div className="product__spec--label">Price:</div>
        <div className="product__spec--content">
          {`${`$${product.price.min}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} - ${`$${product.price.max}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
        </div>
      </div>
      <div className="product__spec product__spec--buttons">
        {/* {withActions && renderActions()} */}
        <Button type="danger" onClick={onDismatch} >Disable Match</Button>
      </div>
    </div>
  )
};

export default ProductViewComponent;
