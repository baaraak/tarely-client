import { put, call, takeLatest } from 'redux-saga/effects';

import {
  UPDATE_USER_PROFILE,
  updateUserProfileSuccess,
  CHANGE_PASSWORD,
  changePasswordResult
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
  const response = yield call(callApi, '/users/changePassword', 'POST', action.data);
  console.log('***********************');
  console.log(response);
  console.log('***********************');
  yield put(changePasswordResult(response));
}

function* userSaga() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
  yield takeLatest(CHANGE_PASSWORD, changePassword);
}

export default userSaga;
