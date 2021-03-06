import { put, call, takeLatest } from 'redux-saga/effects';

import {
  UPLOAD_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCT_SWIPING_LIST,
  HANDLE_SWIPE,
  GET_PRODUCT_MATCHES,
  GET_MATCH_MESSAGES,
  SEND_MESSAGE,
  GET_PRODUCT_BROWSE,
  getProductBrowseSucccess,
  editProductSuccess,
  uploadProductSuccess,
  uploadProductFail,
  editProductFail,
  getProductSwipingListSuccess,
  getProductMatchesListSuccess,
  handleSwipeResponseMatch,
  getMatchMessagesSuccess,
  sendMessageSuccess,
  GET_BID_MESSAGES,
  SUBMIT_BID,
  submitBidResult,
  getBidMessagesResponse,
  SEND_BID_MESSAGE,
  ON_UNMATCH,
  REJECT_BID,
  ACCEPT_BID,
  acceptBidSuccess,
  rejectBidSuccess,
  submitUnmatchSuccess
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
  const response = yield call(callApi, `/products/${action.id}/swipe`);
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
  if (response.isMatch) {
    yield put(handleSwipeResponseMatch(response.isMatch));
  }
  if (response.error) {
    // yield put(globalError(response.products));
  }
}

function* getProductMatches(action) {
  const response = yield call(callApi, `/products/${action.id}/matches`);
  if (response) {
    yield put(getProductMatchesListSuccess(response.matches));
  } else {
    yield put(editProductFail(response.message));
  }
}

function* getMatchMessages(action) {
  const response = yield call(
    callApi,
    `/products/${action.roomId}/messages`,
  );
  if (response.messages) {
    yield put(getMatchMessagesSuccess(response.messages));
  } else {
    yield put(editProductFail(response.message));
  }
}

function* sendMessage(action) {
  const response = yield call(
    callApi,
    '/products/messages',
    'POST',
    action.message
  );
  if (response.success) {
    yield put(sendMessageSuccess());
  } else {
    yield put(editProductFail(response.message));
  }
}

function* getProductBrowse(action) {
  const response = yield call(
    callApi,
    `/products/${action.productId}/browse?${action.query || ''}`,

  );
  if (response.products) {
    yield put(getProductBrowseSucccess(response.products));
  } else {
    // yield put(editProductFail(response.message));
  }
}

function* submitBid(action) {
  const response = yield call(
    callApi,
    `/products/bid`,
    'POST',
    action.bid,

  );
  yield put(submitBidResult(response.success));
}

function* submitUnmatch(action) {
  const response = yield call(
    callApi,
    `/products/unmatch/${action.matchId}`,

  );
  if (response.success) {
    yield put(submitUnmatchSuccess(action.matchId));
  }
}

function* getBidMessages(action) {
  const response = yield call(
    callApi,
    `/products/bid/${action.bidId}`,

  );
  if (response.messages) {
    yield put(getBidMessagesResponse(response.messages));
  }
}

function* sendBidMessage(action) {
  const response = yield call(
    callApi,
    '/products/bid/message',
    'POST',
    action.message
  );
  if (response.success) {
    yield put(sendMessageSuccess());
  } else {
    yield put(editProductFail(response.message));
  }
}

function* rejectBid(action) {
  try {
    yield call(callApi, `/products/bid/cancel/${action.bidId}`);
    yield put(rejectBidSuccess(action.bidId));
  } catch (e) {
    // yield put(globalError(response.message));
  }
}

function* acceptBid(action) {
  try {
    yield call(callApi, `/products/bid/accept/${action.bidId}`);
    yield put(acceptBidSuccess(action.bidId));
  } catch (e) {
    // yield put(globalError(response.message));
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
  yield takeLatest(GET_PRODUCT_BROWSE, getProductBrowse);
  yield takeLatest(SUBMIT_BID, submitBid);
  yield takeLatest(ON_UNMATCH, submitUnmatch);
  yield takeLatest(GET_BID_MESSAGES, getBidMessages);
  yield takeLatest(SEND_BID_MESSAGE, sendBidMessage);
  yield takeLatest(ACCEPT_BID, acceptBid);
  yield takeLatest(REJECT_BID, rejectBid);
}

export default productSaga;
