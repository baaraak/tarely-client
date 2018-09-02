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
  SUBMIT_BID,
  SUBMIT_BID_RESULT,
  ON_UNMATCH_SUCCESS,
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
  isBidSuccess: null,
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
        ...state,
        errorMessage: action.message,
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        editProductSuccess: true,
      };
    case EDIT_PRODUCT_FAIL:
      return {
        ...state,
        editProductSuccess: action.message,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        editProductSuccess: null,
      };
    case GET_PRODUCT_SWIPING_LIST_SUCCESS:
      return {
        ...state,
        swipingList: action.products,
      };
    case GET_PRODUCT_MATCHES_SUCCCESS:
      return {
        ...state,
        matches: action.products,
      };
    case GET_MATCH_MESSAGES:
      return {
        ...state,
        messages: null,
      };
    case GET_MATCH_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      };
    case GET_PRODUCT_BROWSE:
      return {
        ...state,
        browse: undefined,
      };
    case GET_PRODUCT_BROWSE_SUCCESS:
      return {
        ...state,
        browse: action.products,
      };
    case SWIPE_RESPONSE_MATCH:
      return {
        ...state,
        isMatch: action.match,
      };
    case CLOSE_MATCH_MODAL:
      return {
        ...state,
        isMatch: false,
      };
    case SUBMIT_BID:
      return {
        ...state,
        isBidSuccess: null,
      };
    case SUBMIT_BID_RESULT:
      return {
        ...state,
        isBidSuccess: action.result,
      };
    case ON_UNMATCH_SUCCESS:
      return {
        ...state,
        matches: state.matches.filter(m => m.matchId !== action.matchId),
      };
    default:
      return state;
  }
}
