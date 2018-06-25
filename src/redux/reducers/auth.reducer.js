import { LOGIN, LOGIN_FAILED, SIGNUP, SIGNUP_FAILED } from '../actions/auth.actions';

const initialState = {
  loginError: null,
  signupError: null,
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
    default:
      return state;
  }
}
