import React from 'react';
import { connect } from 'react-redux';
import { Carousel, Icon, Spin } from 'antd';
import { getDistance } from 'geolib';

import MatchSuccessModal from './MatchSuccessModal';
import { BASE_URL } from '../../../services/constans';
import Cards from '../../../components/SwipeableView/Cards';
import Card from '../../../components/SwipeableView/CardSwitcher';

import {
  getProductSwipingList,
  handleSwipe,
  closeMatchModal,
} from '../../../redux/actions/product.actions';

class SwipingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      index: 0,
      products: props.products,
    };
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.closeMatchModal = this.closeMatchModal.bind(this);
    this.redirectToMatchRoom = this.redirectToMatchRoom.bind(this);
  }
  componentWillMount() {
    this.props.getProductSwipingList(this.props.productId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading && this.props.products !== nextProps.products) {
      this.setState({
        products: Array.isArray(nextProps.products) ? nextProps.products : [],
        isLoading: false,
      });
    }
    if (nextProps.isMatch && this.props.isMatch !== nextProps.isMatch) {
    }
  }

  handleChangeIndex(index) {
    this.setState({ index });
  }

  handleSwiping(direction, productId) {
    const data = {
      direction,
      from: this.props.productId,
      to: productId,
    };
    this.props.handleSwipe(data);
  }

  renderCards() {
    return this.state.products.map(product => (
      <Card
        key={product._id}
        onSwipeLeft={() => this.handleSwiping('left', product._id)}
        onSwipeRight={() => this.handleSwiping('right', product._id)}
      >
        <Carousel autoplay>
          {product.images.map(image => (
            <img src={BASE_URL + image} key={image} alt="" />
          ))}
        </Carousel>
        {product.title}
      </Card>
    ));
  }

  onEnd() {
    this.setState({ isLoading: true });
  }

  onClick(side) {
    this.handleSwiping(
      side.toLowerCase(),
      this.state.products[this.state.index]._id
    );
    this.child.removeCard(side, this.state.index);
  }

  renderNoProductsToSwipe() {
    return <div>Sorry, no products available to swipe</div>;
  }

  closeMatchModal() {
    this.props.closeMatchModal();
  }

  redirectToMatchRoom(roomID) {
    this.props.history.push({
      pathname: `/product/${this.props.productId}/matches/${roomID}`,
    });
  }

  render() {
    if (this.state.isLoading)
      return (
        <div className="productPage__swiping productPage__swiping--loading">
          <Spin size="large" />
        </div>
      );
    if (!this.state.products.length) return this.renderNoProductsToSwipe();
    const product = this.state.products[this.state.index];
    const locationDistance = getDistance(
      product.location,
      this.props.userLocation
    );
    return (
      <div className="productPage__swiping">
        <div className="swiping-cards-productTitle">{product.title}</div>
        <div className="swiping-cards-productDistance">{`${
          product.location.address
        }, ${locationDistance} meters`}</div>
        <Cards
          onRef={ref => (this.child = ref)}
          onEnd={this.onEnd}
          className="swiping-cards"
          onChangeIndex={this.handleChangeIndex}
        >
          {this.renderCards()}
        </Cards>
        <div className="swiping-cards-actionButtons">
          <div
            className="buttonDislike button"
            onClick={() => this.onClick('Left')}
          >
            <Icon type="dislike" />
          </div>
          <div
            className="buttonLike button"
            onClick={() => this.onClick('Right')}
          >
            <Icon type="like" />
          </div>
        </div>
        <div className="swiping-cards-footer">
          <div className="field footer-description">
            <div className="footer-fieldLabel">Description:</div>
            {product.description}
          </div>
          <div className="field footer-price">
            <div className="footer-fieldLabel">Price:</div>
            ${product.price.min} - ${product.price.max}
          </div>
          <div className="field footer-location">
            <div className="footer-fieldLabel">Location:</div>
            {product.location.address}
          </div>
        </div>
        {this.props.isMatch && (
          <MatchSuccessModal
            redirectToMatchRoom={this.redirectToMatchRoom}
            onClose={this.closeMatchModal}
            match={this.props.isMatch}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.swipingList,
  userLocation: state.app.user.location,
  isMatch: state.product.isMatch,
});

export default connect(
  mapStateToProps,
  { getProductSwipingList, closeMatchModal, handleSwipe }
)(SwipingComponent);
