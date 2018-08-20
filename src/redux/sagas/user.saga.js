import { put, call, takeLatest } from 'redux-saga/effects';

import {
  UPDATE_USER_PROFILE,
  updateUserProfileSuccess,
  CHANGE_PASSWORD,
  changePasswordResult,
  TOGGLE_SUBSCRIBE,
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

function* toggleSubscribe(action) {
  const response = yield call(callApi, '/users/subscribe', 'PUT', { type: action.subscribeType });
  // yield put(changeUserSubscribeResult(response));
}

function* userSaga() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
  yield takeLatest(CHANGE_PASSWORD, changePassword);
  yield takeLatest(TOGGLE_SUBSCRIBE, toggleSubscribe);
}

export default userSaga;
