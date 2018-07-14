import { put, call, takeLatest } from 'redux-saga/effects';

import { UPDATE_USER_PROFILE, updateUserProfileSuccess } from '../actions/user.actions';
import callApi from '../../services/api';


function* updateUserProfile(action) {
  const response = yield call(callApi, '/products', 'PUT', action.product);
  if (response.product) {
    yield put(updateUserProfileSuccess(response.product));
    // yield put(editUserProduct(response.product));
  } else {
    // yield put(editProductFail(response.message));
  }
}


function* userSaga() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}

export default userSaga;

