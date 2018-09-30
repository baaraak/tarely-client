export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';
export const CHANGE_PASSWORD_RESULT = 'CHANGE_PASSWORD_RESULT';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const TOGGLE_SUBSCRIBE = 'TOGGLE_SUBSCRIBE';
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN';
export const VALIDATE_TOKEN_RESULT = 'VALIDATE_TOKEN_RESULT';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_PASSWORD_RESULT = 'RESET_PASSWORD_RESULT';
export const UPDATE_USER_LANGUAGE = 'UPDATE_USER_LANGUAGE';

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


export function validateToken(token) {
  return {
    type: VALIDATE_TOKEN,
    token,
  }
}

export function validateTokenResult(success) {
  return {
    type: VALIDATE_TOKEN_RESULT,
    success,
  }
}


export function resetPassword(data) {
  return {
    type: RESET_PASSWORD,
    data,
  }
}


export function resetPasswordResult(result) {
  return {
    type: RESET_PASSWORD_RESULT,
    result,
  }
}

export function updateUserLanguage(language) {
  return {
    type: UPDATE_USER_LANGUAGE,
    language,
  }
}

