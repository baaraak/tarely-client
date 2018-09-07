import { put, call, takeLatest } from 'redux-saga/effects';

import {
  LOGIN,
  loginFailed,
  SIGNUP,
  signupFailed,
  FORGOT_PASSWORD,
  forgotPasswordSuccess,
  forgotPasswordFailed,
} from '../actions/auth.actions';
import callApi from '../../services/api';

function* submitLogin(action) {
  let response;
  if (action.values.type === 'facebook') {
    response = yield call(callApi, '/auth/facebook', 'POST', {
      access_token: action.values.accessToken,
    });
  } else if (action.values.type === 'google') {
    response = yield call(callApi, '/auth/google', 'POST', {
      access_token: action.values.accessToken,
    });
  } else {
    response = yield call(callApi, '/auth/login', 'POST', {
      ...action.values,
    });
  }
  if (response.token) {
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

function* submitForgotPassword(action) {
  const response = yield call(callApi, '/users/reset_password_request', 'POST', { email: action.email });
  if (response.error) {
    yield put(forgotPasswordFailed(response.error));
  } else if (response.success) {
    yield put(forgotPasswordSuccess());
  }
}

function* authSaga() {
  yield takeLatest(LOGIN, submitLogin);
  yield takeLatest(SIGNUP, submitSignup);
  yield takeLatest(FORGOT_PASSWORD, submitForgotPassword);
}

export default authSaga;
