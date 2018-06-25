import { fork, all } from 'redux-saga/effects';
import homeSaga from './home.saga';
import productSaga from './product.saga';
import authSaga from './auth.saga';

export default function* root() {
  yield all([
    fork(homeSaga),
    fork(productSaga),
    fork(authSaga),
  ]);
}
