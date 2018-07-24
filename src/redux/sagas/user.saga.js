import { put, call, takeLatest } from 'redux-saga/effects';

import {
  UPDATE_USER_PROFILE,
  updateUserProfileSuccess,
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

function* userSaga() {
  yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}

export default userSaga;
