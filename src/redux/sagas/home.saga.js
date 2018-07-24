import { put, call, takeLatest } from 'redux-saga/effects';

import { DELETE_PRODUCT } from '../actions/home.actions';
import { deleteUserProduct } from '../actions/app.actions';
import callApi from '../../services/api';

function* deleteProduct(action) {
  try {
    yield call(callApi, `/products/${action.productId}`, 'DELETE');
    yield put(deleteUserProduct(action.productId));
  } catch (e) {
    // yield put(globalError(response.message));
  }
}

function* homeSaga() {
  yield takeLatest(DELETE_PRODUCT, deleteProduct);
}

export default homeSaga;
