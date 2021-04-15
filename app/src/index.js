import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// Component
import Register from "./containers/Register/Register";
// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./configureStore";

const initialState = {};
/** Redux store */
const store = configureStore(initialState)[0];
/** Redux Persistor store */
const persistor = configureStore(initialState)[1];

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <Register />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

window.React = React;
window.ReactDOM = ReactDOM;
