import React from "react";
import ReactDOM from "react-dom";
import { configureStore, history } from './store/configureStore';
import Root from './containers/Root';
import './index.scss';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Root store={store} history={history} />
  </React.StrictMode>,
  document.querySelector("#root")
);
