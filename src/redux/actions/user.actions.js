export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const CHANGE_PASSWORD_RESULT = 'CHANGE_PASSWORD_RESULT';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const TOGGLE_SUBSCRIBE = 'TOGGLE_SUBSCRIBE';

export function updateUserProfile(user) {
  return {
    type: UPDATE_USER_PROFILE,
    user,
  };
}

export function updateUserProfileSuccess(user) {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    user,
  };
}

export function changePassword(data) {
  return {
    type: CHANGE_PASSWORD,
    data,
  };
}


export function changePasswordResult(response) {
  return {
    type: CHANGE_PASSWORD_RESULT,
    response,
  }
}

export function toggleSubscribe(subscribeType) {
  return {
    type: TOGGLE_SUBSCRIBE,
    subscribeType,
  }
}

