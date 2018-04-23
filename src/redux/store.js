import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga'

// Reducers
import app from './reducers/app.reducer';
import home from './reducers/home.reducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    app,
    home,
});

const initialState = {};

const configureStore = () => {
    let store;

    if (module.hot) {
        store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(sagaMiddleware),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        );
    } else {
        store = createStore(
            rootReducer,
            initialState,
            compose(applyMiddleware(sagaMiddleware), f => f)
        );
    }

    store.runSaga = sagaMiddleware.run
    store.close = () => store.dispatch(END)
    return store;
};

const store = configureStore();

export default store;
