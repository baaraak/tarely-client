// Actions Types
export const SHOW_GLOBAL_MESSAGE_ERROR = "SHOW_GLOBAL_MESSAGE_ERROR";
export const HIDE_GLOBAL_MESSAGE_ERROR = "HIDE_GLOBAL_MESSAGE_ERROR";
export const SET_USER_PROFILE = "SET_USER_PROFILE";

export function showGlobalMessageError(message) {
  return {
    type: SHOW_GLOBAL_MESSAGE_ERROR,
    message
  };
}

export function hideGlobalMessageError() {
  return {
    type: HIDE_GLOBAL_MESSAGE_ERROR,
  };
}

export function setUserProfile(profile) {
  return {
    type: SET_USER_PROFILE,
    profile
  };
}

// export function fetchTopUsersIfNeeded(page) {
//   return (dispatch, getState) => {
//     if (shouldFetchUsers(getState(), page)) {
//       return dispatch(fetchTopUsers(page));
//     }
//   };
// }
