import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Carousel, Spin, Icon } from 'antd';
import Lightbox from 'react-images';

import MatchSuccessModal from './MatchSuccessModal';
import { BASE_URL } from '../../../services/constans';
import Cards from '../../../components/SwipeableView/Cards';
import Card from '../../../components/SwipeableView/CardSwitcher';

import {
  getProductSwipingList,
  handleSwipe,
  closeMatchModal,
} from '../../../redux/actions/product.actions';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon type="right" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon type="left" />
    </div>
  );
}

const carouselSettings = {
  dots: true,
  slidesToShow: 4,
  arrows: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
}

class SwipingComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      index: 0,
      lightboxView: null,
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
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isLoading && this.props.products !== nextProps.products) {
      this.setState({
        products: Array.isArray(nextProps.products) ? nextProps.products : [],
        isLoading: false,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = (e) => {
    if (e.keyCode === 37) {
      this.onClick('left');
    } else if (e.keyCode === 39) {
      this.onClick('right');
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

  handleClickImage = (e, i) => {
    this.setState({
      lightboxView: i
    });
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  renderCards() {
    return this.state.products.map(product => (
      <Card
        key={product._id}
        isMobile={this.props.isMobile}
        onSwipeLeft={() => this.handleSwiping('left', product._id)}
        onSwipeRight={() => this.handleSwiping('right', product._id)}
      >
        <div className="card--container" ref={ref => this.card = ref}>
          <Carousel {...carouselSettings}>
            {product.images.map((image, i) => (
              <img src={BASE_URL + image} key={image} alt="" onClick={e => this.handleClickImage(e, i)} />
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

  closeLightbox = (e) => {
    this.setState({
      lightboxView: null
    });
    document.addEventListener('keydown', this.handleKeyPress);
  }

  renderNoProductsToSwipe() {
    return (
      <div className="productPage__swiping productPage__swiping--noMessage" dangerouslySetInnerHTML={{ __html: this.props.intl.messages["swipe.noSwiping"] }} />
    );
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
    const { categories, intl } = this.props;
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
          alertRight={<Icon type="like" />}
          alertLeft={<Icon type="dislike" />}
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
            <div className="footer-fieldLabel"><Icon type="info-circle" theme="outlined" />{intl.messages["swipe.description"]}</div>
            <div className="footer-fieldContent">{product.description}</div>
          </div>
          <div className="field footer-price">
            <div className="footer-fieldLabel"><Icon type="logout" theme="outlined" />{intl.messages["swipe.price"]}</div>
            <div className="footer-fieldContent">${product.price.min} - ${product.price.max}</div>
          </div>
          <div className="field footer-category">
            <div className="footer-fieldLabel"><Icon type="bars" theme="outlined" />{intl.messages["swipe.category"]}</div>
            <div className="footer-fieldContent">{categories.filter(c => c.id === Number(product.category))[0].displayName}</div>
          </div>
          <div className="field footer-category">
            <div className="footer-fieldLabel"><Icon type="bars" theme="outlined" />{intl.messages["swipe.wanted"]}</div>
            <div className="footer-fieldContent">{wantedCategories.toString()}</div>
          </div>
          <div className="field footer-location">
            <div className="footer-fieldLabel"><Icon type="compass" theme="outlined" />{intl.messages["swipe.location"]}</div>
            <div className="footer-fieldContent">{product.location.address}</div>
          </div>
        </div>
        {
          this.props.isMatch && (
            <MatchSuccessModal
              redirectToMatchRoom={this.redirectToMatchRoom}
              onClose={this.closeMatchModal}
              intl={this.props.intl}
              match={this.props.isMatch}
            />
          )
        }
        <Lightbox
          images={product.images.map(i => Object.assign({}, { src: BASE_URL + i }))}
          currentImage={this.state.lightboxView}
          isOpen={!!this.state.lightboxView || this.state.lightboxView === 0}
          onClickPrev={() =>
            this.setState({
              lightboxView: (this.state.lightboxView + product.images.length - 1) % product.images.length,
            })
          }
          onClickNext={() =>
            this.setState({
              lightboxView: (this.state.lightboxView + 1) % product.images.length,
            })
          }
          onClose={this.closeLightbox}
        />
      </div >
    );
  }
}

const mapStateToProps = state => ({
  products: state.product.swipingList,
  userLocation: state.app.user.location,
  categories: state.app.categories,
  isMatch: state.product.isMatch,
  isMobile: state.app.isMobile,
});

export default connect(
  mapStateToProps,
  { getProductSwipingList, closeMatchModal, handleSwipe }
)(injectIntl(SwipingComponent));
