import { put, call, takeLatest } from 'redux-saga/effects';

import {
  LOGIN,
  loginFailed,
  SIGNUP,
  signupFailed,
} from '../actions/auth.actions';
import callApi from '../../services/api';

function* submitLogin(action) {
  const response = yield call(callApi, '/auth/login', 'POST', {
    ...action.values,
  });
  if (response.token) {
    console.log(response.token);
    yield localStorage.setItem('tarelyJWTToken', response.token);
    yield window.location.reload();
  } else {
    yield put(loginFailed(response.message));
  }
}

function* submitSignup(action) {
  const response = yield call(callApi, '/users', 'POST', { ...action.values });
  if (response.token) {
    yield localStorage.setItem('tarelyJWTToken', response.token);
    yield window.location.reload();
  } else {
    yield put(signupFailed(response.message));
  }
}

function* authSaga() {
  yield takeLatest(LOGIN, submitLogin);
  yield takeLatest(SIGNUP, submitSignup);
}

export default authSaga;
