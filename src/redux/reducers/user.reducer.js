import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_RESULT,
  VALIDATE_TOKEN_RESULT,
  RESET_PASSWORD_RESULT,
} from '../actions/user.actions';

const initialState = {
  profileUpdated: null,
  changePasswordResult: null,
  validateTokenResult: null,
  resetPasswordResult: null,
};

export default function product(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        profileUpdated: null,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profileUpdated: true,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordResult: null,
      };
    case CHANGE_PASSWORD_RESULT:
      return {
        ...state,
        changePasswordResult: action.response.success ? true : action.response.error,
      };
    case VALIDATE_TOKEN_RESULT:
      return {
        ...state,
        validateTokenResult: action.success,
      };
    case RESET_PASSWORD_RESULT:
      return {
        ...state,
        resetPasswordResult: action.result.success,
      };

    default:
      return state;
  }
}
