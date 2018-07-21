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
        profileUpdated: null,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        profileUpdated: true,
      };
    default:
      return state;
  }
}
