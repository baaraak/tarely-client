import React from 'react';
import { connect } from 'react-redux';
import { Carousel, Spin, Icon } from 'antd';

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
        <div className="card--container" ref={ref => this.card = ref}>
          <Carousel slidesToShow={product.images.length}>
            {product.images.map(image => (
              <img src={BASE_URL + image} key={image} alt="" />
            ))}
          </Carousel>
        </div>
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

    const moveOutWidth = document.body.clientWidth;

    if (side === 'right') {
      this.card.parentElement.style.transition = 'all 0.4s ease-in';
      this.card.parentElement.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-50deg)';
    } else {
      this.card.parentElement.style.transition = 'all 0.4s ease-in';
      this.card.parentElement.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(50deg)';
    }
    setTimeout(() => {
      this.child.removeCard(side, this.state.index)
    }, 350);
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
    this.props.closeMatchModal();
  }

  render() {
    const { categories } = this.props;
    if (this.state.isLoading)
      return (
        <div className="productPage__swiping productPage__swiping--loading">
          <Spin size="large" />
        </div>
      );
    if (!this.state.products.length) return this.renderNoProductsToSwipe();
    const product = this.state.products[this.state.index];
    const wantedCategories = categories.filter(c => product.wanted.some(pId => c.id === Number(pId))).map(cat => cat.displayName);
    return (
      <div className="productPage__swiping">
        <div className="swiping-cards-productTitle">{product.title}</div>
        <div className="swiping-cards-productDistance">{product.location.address}</div>
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
            onClick={() => this.onClick('left')}
          >
            <Icon type="dislike" theme="twoTone" />
          </div>
          <div
            className="buttonLike button"
            onClick={() => this.onClick('right')}
          >
            <Icon type="like" theme="twoTone" />
          </div>
        </div>
        <div className="swiping-cards-footer">
          <div className="field footer-description">
            <div className="footer-fieldLabel"><Icon type="info-circle" theme="outlined" />Description:</div>
            <div className="footer-fieldContent">{product.description}</div>
          </div>
          <div className="field footer-price">
            <div className="footer-fieldLabel"><Icon type="logout" theme="outlined" />Price:</div>
            <div className="footer-fieldContent">${product.price.min} - ${product.price.max}</div>
          </div>
          <div className="field footer-category">
            <div className="footer-fieldLabel"><Icon type="bars" theme="outlined" />Category:</div>
            <div className="footer-fieldContent">{categories.filter(c => c.id === Number(product.category))[0].displayName}</div>
          </div>
          <div className="field footer-category">
            <div className="footer-fieldLabel"><Icon type="bars" theme="check-circle" />Want in return:</div>
            <div className="footer-fieldContent">{wantedCategories.toString()}</div>
          </div>
          <div className="field footer-location">
            <div className="footer-fieldLabel"><Icon type="compass" theme="outlined" />Location:</div>
            <div className="footer-fieldContent">{product.location.address}</div>
          </div>
        </div>
        {
          this.props.isMatch && (
            <MatchSuccessModal
              redirectToMatchRoom={this.redirectToMatchRoom}
              onClose={this.closeMatchModal}
              match={this.props.isMatch}
            />
          )
        }
      </div >
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.swipingList,
  userLocation: state.app.user.location,
  categories: state.app.categories,
  isMatch: state.product.isMatch,
});

export default connect(
  mapStateToProps,
  { getProductSwipingList, closeMatchModal, handleSwipe }
)(SwipingComponent);
