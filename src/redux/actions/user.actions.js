export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export function updateUserProfile(user) {
  return {
    type: UPDATE_USER_PROFILE,
    user,
  };
}
