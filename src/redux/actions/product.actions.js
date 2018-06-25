// Actions Types
export const UPLOAD_PRODUCT = 'UPLOAD_PRODUCT';
export const UPLOAD_PRODUCT_FAIL = 'UPLOAD_PRODUCT_FAIL';
export const UPLOAD_PRODUCT_SUCCESS = 'UPLOAD_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_FAIL = 'EDIT_PRODUCT_FAIL';
export const GET_PRODUCT_SWIPING_LIST = 'GET_PRODUCT_SWIPING_LIST';
export const GET_PRODUCT_SWIPING_LIST_SUCCESS = 'GET_PRODUCT_SWIPING_LIST_SUCCESS';
export const HANDLE_SWIPE = 'HANDLE_SWIPE';

export function uploadProduct(product) {
  return {
    type: UPLOAD_PRODUCT,
    product,
  };
}

export function uploadProductSuccess(product) {
  return {
    type: UPLOAD_PRODUCT_SUCCESS,
    product,
  };
}

export function uploadProductFail(message) {
  return {
    type: UPLOAD_PRODUCT_FAIL,
    message,
  };
}

export function updateProduct(product) {
  return {
    type: UPDATE_PRODUCT,
    product,
  };
}

export function editProductSuccess() {
  return {
    type: EDIT_PRODUCT_SUCCESS,
  };
}

export function editProductFail(message) {
  return {
    type: EDIT_PRODUCT_FAIL,
    message,
  };
}

export function getProductSwipingList(id) {
  return {
    type: GET_PRODUCT_SWIPING_LIST,
    id,
  };
}

export function getProductSwipingListSuccess(products) {
  return {
    type: GET_PRODUCT_SWIPING_LIST_SUCCESS,
    products,
  };
}

export function handleSwipe(data) {
  return {
    type: HANDLE_SWIPE,
    data,
  };
}

