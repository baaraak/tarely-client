import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";
import getAppData from './services/getAppData';
import {setUserProfile} from './redux/actions/app.actions'
import rootSaga from './redux/sagas';

import App from "./views/app/App";

import 'antd/dist/antd.css';
import './icons/style.css';
import "./styles/index.css";


getAppData().then((data) => {
    store.runSaga(rootSaga);
    store.dispatch(setUserProfile(data.user));
    ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});

registerServiceWorker();
