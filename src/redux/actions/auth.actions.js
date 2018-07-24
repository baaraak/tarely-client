export const LOGIN = 'LOGIN';
export const LOGIN_FAILED = 'LOGIN_FAILED';

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
