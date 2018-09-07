import { put, call, takeLatest } from 'redux-saga/effects';

import {
  UPDATE_USER_PROFILE,
  updateUserProfileSuccess,
  CHANGE_PASSWORD,
  changePasswordResult,
  TOGGLE_SUBSCRIBE,
  VALIDATE_TOKEN,
  validateTokenResult,
  RESET_PASSWORD,
  resetPasswordResult,
} from '../actions/user.actions';
import callApi from '../../services/api';

function* updateUserProfile(action) {
  const response = yield call(callApi, '/users', 'PUT', action.user);
  if (response.success) {
    yield put(updateUserProfileSuccess());
  } else {
    // yield put(editProductFail(response.message));
  }
}

function* changePassword(action) {
  const response = yield call(callApi, '/users/changePassword', 'PUT', action.data);
  yield put(changePasswordResult(response));
}

function* validateToken(action) {
  const response = yield call(callApi, '/users/validate_token', 'POST', { token: action.token });
  yield put(validateTokenResult(response.success));
}

function* toggleSubscribe(action) {
  yield call(callApi, '/users/subscribe', 'PUT', { type: action.subscribeType });
}

function* resetPassword(action) {
  const response = yield call(callApi, '/users/reset_password', 'POST', { ...action.data });
  yield put(resetPasswordResult(response));
}

function* userSaga() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
  yield takeLatest(CHANGE_PASSWORD, changePassword);
  yield takeLatest(TOGGLE_SUBSCRIBE, toggleSubscribe);
  yield takeLatest(VALIDATE_TOKEN, validateToken);
  yield takeLatest(RESET_PASSWORD, resetPassword);
}

export default userSaga;
