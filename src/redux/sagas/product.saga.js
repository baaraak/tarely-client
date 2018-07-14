import { put, call, takeLatest } from 'redux-saga/effects';

import {
  UPLOAD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_SWIPING_LIST,
  HANDLE_SWIPE,
  GET_PRODUCT_MATCHES,
  GET_MATCH_MESSAGES,
  SEND_MESSAGE,
  editProductSuccess,
  uploadProductSuccess,
  uploadProductFail,
  editProductFail,
  getProductSwipingListSuccess,
  getProductMatchesListSuccess,
  getMatchMessagesSuccess,
  sendMessageSuccess,
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

function* getProductMatches(action) {
  const response = yield call(callApi, `/products/${action.id}/matches`, 'GET');
  if (response) {
    yield put(getProductMatchesListSuccess(response));
  } else {
    yield put(editProductFail(response.message));
  }
}

function* getMatchMessages(action) {
  const response = yield call(callApi, `/products/${action.roomId}/messages`, 'GET');
  if (response.messages) {
    yield put(getMatchMessagesSuccess(response.messages));
  } else {
    yield put(editProductFail(response.message));
  }
}

function* sendMessage(action) {
  const response = yield call(callApi, '/products/messages', 'POST', action.message);
  if (response.success) {
    yield put(sendMessageSuccess());
  } else {
    yield put(editProductFail(response.message));
  }
}


function* productSaga() {
  yield takeLatest(UPLOAD_PRODUCT, uploadProduct);
  yield takeLatest(UPDATE_PRODUCT, updateProduct);
  yield takeLatest(GET_PRODUCT_SWIPING_LIST, getUserSwipingList);
  yield takeLatest(HANDLE_SWIPE, handleSwipeSubmit);
  yield takeLatest(GET_PRODUCT_MATCHES, getProductMatches);
  yield takeLatest(GET_MATCH_MESSAGES, getMatchMessages);
  yield takeLatest(SEND_MESSAGE, sendMessage);
}

export default productSaga;

