import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'

// Reducers
import app from './reducers/app.reducer';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  app,
});

const initialState = {};

const configureStore = () => {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(sagaMiddleware, logger),
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

  return store;
};

const store = configureStore();

export default store;
