import { fork, all } from 'redux-saga/effects';
import homeSaga from './home.saga';
import productSaga from './product.saga';
import authSaga from './auth.saga';
import userSaga from './user.saga';
import appSaga from './app.saga';

export default function* root() {
  yield all([
    fork(appSaga),
    fork(homeSaga),
    fork(productSaga),
    fork(authSaga),
    fork(userSaga),
  ]);
}
