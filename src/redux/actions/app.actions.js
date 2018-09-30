// Actions Types
export const SHOW_GLOBAL_MESSAGE_ERROR = 'SHOW_GLOBAL_MESSAGE_ERROR';
export const HIDE_GLOBAL_MESSAGE_ERROR = 'HIDE_GLOBAL_MESSAGE_ERROR';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const DELETE_USER_PRODUCT = 'DELETE_USER_PRODUCT';
export const ADD_USER_PRODUCT = 'ADD_USER_PRODUCT';
export const EDIT_USER_PRODUCT = 'EDIT_USER_PRODUCT';
export const SEND_CONTACT = 'SEND_CONTACT';
export const CHANGE_USER_AVATAR = 'CHANGE_USER_AVATAR';
export const CHANGE_USER_LANGUAGE = 'CHANGE_USER_LANGUAGE';

export function showGlobalMessageError(message) {
  return {
    type: SHOW_GLOBAL_MESSAGE_ERROR,
    message,
  };
}

export function hideGlobalMessageError() {
  return {
    type: HIDE_GLOBAL_MESSAGE_ERROR,
  };
}

export function setUserProfile(user) {
  return {
    type: SET_USER_PROFILE,
    user,
  };
}

export function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories,
  };
}

export function deleteUserProduct(productId) {
  return {
    type: DELETE_USER_PRODUCT,
    productId,
  };
}

export function addUserProduct(product) {
  return {
    type: ADD_USER_PRODUCT,
    product,
  };
}

export function editUserProduct(product) {
  return {
    type: EDIT_USER_PRODUCT,
    product,
  };
}

export function changeUserAvatar(avatar) {
  return {
    type: CHANGE_USER_AVATAR,
    avatar,
  };
}

export function changeUserLanguage(language) {
  return {
    type: CHANGE_USER_LANGUAGE,
    language,
  };
}

