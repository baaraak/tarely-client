export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';

export function login(values) {
  return {
    type: LOGIN,
    values,
  };
}

export function loginFailed(message) {
  return {
    type: LOGIN_FAILED,
    message,
  };
}
export const SIGNUP = 'SIGNUP';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export function signup(values) {
  return {
    type: SIGNUP,
    values,
  };
}

export function signupFailed(message) {
  return {
    type: SIGNUP_FAILED,
    message,
  };
}

export function forgotPassword(email) {
  return {
    type: FORGOT_PASSWORD,
    email,
  };
}

export function forgotPasswordFailed(error) {
  return {
    type: FORGOT_PASSWORD_FAILED,
    error,
  };
}

export function forgotPasswordSuccess() {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
}
