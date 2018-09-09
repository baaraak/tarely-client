import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { I18nLoader } from './components/I18nLoader';
import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import getAppData from './services/getAppData';
import { setUserProfile, setCategories } from './redux/actions/app.actions';
import rootSaga from './redux/sagas';

import App from './views/App/App';
import HomePage from './views/HomePage/HomePage';

import './icons/style.css';
import './styles/index.css';

function renderApp(data) {
  store.dispatch(setUserProfile(data.user));
  store.dispatch(setCategories(data.categories));
  ReactDOM.render(
    <Provider store={store}>
      <I18nLoader locale="en">
        <App />
      </I18nLoader>
    </Provider>,
    document.getElementById('root')
  );
}

function renderHomePage() {
  ReactDOM.render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
    document.getElementById('root')
  );
}

function initApp() {
  getAppData().then(data => {
    store.runSaga(rootSaga);
    if (data.user) {
      renderApp(data);
    } else {
      renderHomePage();
    }
  });
}

initApp();

registerServiceWorker();
