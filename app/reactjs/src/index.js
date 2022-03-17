import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import "react-notifications/lib/notifications.css";
import logger from "./store/middlewares/logger";
import App from "./app";
import AuthReducer from "./store/reducers/authReducer";
import "moment/locale/fr";

const REACT_VERSION = React.version;
console.log("[React Version] ", REACT_VERSION);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: AuthReducer
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
