import "moment/locale/fr";
import React from "react";
import ReactDOM from "react-dom";
import "react-notifications/lib/notifications.css";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./app";
import logger from "./store/middlewares/logger";
import AuthReducer from "./store/reducers/authReducer";

const REACT_VERSION = React.version;
console.log("[React Version] ", REACT_VERSION);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: AuthReducer,
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
