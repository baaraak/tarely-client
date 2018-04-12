import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./redux/store";
import registerServiceWorker from "./registerServiceWorker";
import getAppData from './services/getAppData';

import App from "./views/app/App";

import "./index.css";


getAppData().then((data) => {
  console.log('*******************************');
  console.log(data);
  console.log('*******************************');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
});

registerServiceWorker();
