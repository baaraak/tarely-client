import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
} from '../actions/user.actions';

const initialState = {
  profileUpdated: null,
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
    default:
      return state;
  }
}
