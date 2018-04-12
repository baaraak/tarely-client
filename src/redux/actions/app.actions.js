// Actions Types
export const SHOW_GLOBAL_MESSAGE_ERROR = "SHOW_GLOBAL_MESSAGE_ERROR";

export function showGlobalMessageError(message) {
  return {
    type: SHOW_GLOBAL_MESSAGE_ERROR,
    message
  };
}

// export function fetchTopUsersIfNeeded(page) {
//   return (dispatch, getState) => {
//     if (shouldFetchUsers(getState(), page)) {
//       return dispatch(fetchTopUsers(page));
//     }
//   };
// }
