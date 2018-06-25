import { put, call, takeLatest } from 'redux-saga/effects';

import {
  UPLOAD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_SWIPING_LIST,
  HANDLE_SWIPE,
  editProductSuccess,
  uploadProductSuccess,
  uploadProductFail,
  editProductFail,
  getProductSwipingListSuccess,
} from '../actions/product.actions';
import { editUserProduct, addUserProduct } from '../actions/app.actions';
import callApi from '../../services/api';

function* uploadProduct(action) {
  const response = yield call(callApi, '/products', 'POST', action.product);
  if (response.product) {
    yield put(uploadProductSuccess(response.product));
    yield put(addUserProduct(response.product));
  } else {
    yield put(uploadProductFail(response.message));
  }
}

function* updateProduct(action) {
  const response = yield call(callApi, '/products', 'PUT', action.product);
  if (response.product) {
    yield put(editProductSuccess(response.product));
    yield put(editUserProduct(response.product));
  } else {
    yield put(editProductFail(response.message));
  }
}

function* getUserSwipingList(action) {
  const response = yield call(callApi, `/products/${action.id}/swipe`, 'GET');
  if (response.products) {
    yield put(getProductSwipingListSuccess(response.products));
  } else {
    yield put(editProductFail(response.message));
  }
}

function* handleSwipeSubmit(action) {
  const { direction, from, to } = action.data;
  let response;
  if (direction === 'right') {
    response = yield call(callApi, '/products/like', 'POST', { from, to });
  } else if (direction === 'left') {
    response = yield call(callApi, '/products/dislike', 'POST', { from, to });
  }
  if (response.error) {
    // yield put(globalError(response.products));
  }
}


function* productSaga() {
  yield takeLatest(UPLOAD_PRODUCT, uploadProduct);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
  yield takeLatest(GET_PRODUCT_SWIPING_LIST, getUserSwipingList);
  yield takeLatest(HANDLE_SWIPE, handleSwipeSubmit);
}

export default productSaga;

