import {
  SHOW_GLOBAL_MESSAGE_ERROR,
  SET_USER_PROFILE,
  HIDE_GLOBAL_MESSAGE_ERROR,
  SET_CATEGORIES,
  DELETE_USER_PRODUCT,
  ADD_USER_PRODUCT,
  CHANGE_USER_AVATAR,
  EDIT_USER_PRODUCT,
  CHANGE_USER_LANGUAGE,
} from '../actions/app.actions';

const initialState = {
  globalError: null,
  user: null,
  categories: null,
  isMobile: /Mobi|Android/i.test(navigator.userAgent)
};

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_GLOBAL_MESSAGE_ERROR:
      return {
        ...state,
        globalError: action.message,
      };
    case HIDE_GLOBAL_MESSAGE_ERROR:
      return {
        ...state,
        globalError: null,
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case DELETE_USER_PRODUCT:
      return {
        ...state,
        user: {
          ...state.user,
          products: state.user.products.filter(p => p._id !== action.productId),
        },
      };
    case ADD_USER_PRODUCT:
      return {
        ...state,
        user: {
          ...state.user,
          products: state.user.products.concat(action.product),
        },
      };
    case EDIT_USER_PRODUCT:
      return {
        ...state,
        user: {
          ...state.user,
          products: state.user.products.map(
            p => (p._id === action.product._id ? action.product : p)
          ),
        },
      };
    case CHANGE_USER_AVATAR:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: action.avatar,
        },
      };
    case CHANGE_USER_LANGUAGE:
      return {
        ...state,
        user: {
          ...state.user,
          language: action.language,
        },
      };
    default:
      return state;
  }
}
