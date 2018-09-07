import {
  LOGIN,
  LOGIN_FAILED,
  SIGNUP,
  SIGNUP_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD,
} from '../actions/auth.actions';

const initialState = {
  loginError: null,
  signupError: null,
  forgotPasswordError: null,
};

export default function app(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_FAILED:
      return {
        ...state,
        loginError: action.message,
      };
    case LOGIN:
      return {
        ...state,
        loginError: null,
      };
    case SIGNUP_FAILED:
      return {
        ...state,
        signupError: action.message,
      };
    case SIGNUP:
      return {
        ...state,
        signupError: null,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordError: null,
      };
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordError: false,
      };
    case FORGOT_PASSWORD_FAILED:
      return {
        ...state,
        forgotPasswordError: action.error,
      };
    default:
      return state;
  }
}
