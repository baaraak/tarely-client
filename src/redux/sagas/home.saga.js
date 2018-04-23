import {put, call, takeLatest} from 'redux-saga/effects'

import callApi from '../../services/api';
import {showGlobalMessageError} from '../actions/app.actions';
import {GET_USER_PRODUCTS, productsLoaded} from '../actions/home.actions';


function* fetchUserProducts() {
    try {
        const data = yield call(callApi, '/user/products');
        yield put(productsLoaded(data.products));
    } catch (err) {
        yield put(showGlobalMessageError('cant fetch user products'));
    }

}

function* homeSaga() {
    yield takeLatest(GET_USER_PRODUCTS, fetchUserProducts);
}

export default homeSaga;

