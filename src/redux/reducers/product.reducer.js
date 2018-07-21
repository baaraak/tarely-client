import {
  UPLOAD_PRODUCT_FAIL,
  UPLOAD_PRODUCT_SUCCESS,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_FAIL,
  UPDATE_PRODUCT,
  GET_PRODUCT_SWIPING_LIST_SUCCESS,
  GET_PRODUCT_MATCHES_SUCCCESS,
  GET_MATCH_MESSAGES,
  GET_PRODUCT_BROWSE_SUCCESS,
  GET_MATCH_MESSAGES_SUCCESS,
  GET_PRODUCT_BROWSE,
  SWIPE_RESPONSE_MATCH,
  CLOSE_MATCH_MODAL,
} from '../actions/product.actions';

const initialState = {
  errorMessage: null,
  productId: null,
  editProductSuccess: null,
  swipingList: null,
  matches: null,
  messages: null,
  browse: undefined,
  isMatch: false,
};

export default function product(state = initialState, action = {}) {
  switch (action.type) {
    case UPLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        productId: action.product._id,
      };
    case UPLOAD_PRODUCT_FAIL:
      return {
        errorMessage: action.message,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        editProductSuccess: true,
      };
    case EDIT_PRODUCT_FAIL:
      return {
        editProductSuccess: action.message,
      };
    case UPDATE_PRODUCT:
      return {
        editProductSuccess: null,
      };
    case GET_PRODUCT_SWIPING_LIST_SUCCESS:
      return {
        swipingList: action.products,
      };
    case GET_PRODUCT_MATCHES_SUCCCESS:
      return {
        matches: action.products,
      };
    case GET_MATCH_MESSAGES:
      return {
        messages: null,
      };
    case GET_MATCH_MESSAGES_SUCCESS:
      return {
        messages: action.messages,
      };
    case GET_PRODUCT_BROWSE:
      return {
        browse: undefined,
      };
    case GET_PRODUCT_BROWSE_SUCCESS:
      return {
        browse: action.products,
      };
    case SWIPE_RESPONSE_MATCH:
      return {
        isMatch: action.match,
      };
    case CLOSE_MATCH_MODAL:
      return {
        isMatch: false,
      };
    default:
      return state;
  }
}
