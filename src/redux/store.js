import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Reducers
import app from './reducers/app.reducer';
import { selectedUsersPage, usersByPage } from './reducers/users';

const logger = createLogger();
const rootReducer = combineReducers({
  app,
  selectedUsersPage,
  usersByPage,
});

const initialState = {};

const configureStore = () => {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunkMiddleware, logger),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    );
  }

  return store;
};

const store = configureStore();

export default store;
