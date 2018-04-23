import {fork, all} from 'redux-saga/effects'
import homeSaga from './home.saga';

export default function* root() {
    yield all([
        fork(homeSaga),
    ])
}
