import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';

import store from './redux/store';
import registerServiceWorker from './registerServiceWorker';
import getAppData from './services/getAppData';
import { setUserProfile, setCategories } from './redux/actions/app.actions';
import rootSaga from './redux/sagas';

import App from './views/App/App';
import HomePage from './views/HomePage/HomePage';

import './icons/style.css';
import './styles/index.css';
import callApi from './services/api';

function renderApp(data) {
  store.dispatch(setUserProfile(data.user));
  store.dispatch(setCategories(data.categories));
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
}

function renderHomePage() {
  ReactDOM.render(
    <Provider store={store}>
      <HomePage />
    </Provider>,
    document.getElementById('root'),
  );
}

let location = '';

navigator.geolocation.getCurrentPosition(
  (position) => {
    location = position.coords;
    initApp(location);
  },
  null,
  {
    enableHighAccuracy: true,
  },
);

function initApp(location) {
  if (location) {
    getAppData(location).then((data) => {
      store.runSaga(rootSaga);
      if (data.user) {
        renderApp(data);
      } else {
        renderHomePage();
      }
    });
  } else {
    ReactDOM.render(
      <NoLocation />,
      document.getElementById('root'),
    );
  }
}

const NoLocation = () => (
  <div>
    please enable coords
  </div>
);


registerServiceWorker();
