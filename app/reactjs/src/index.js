import "moment/locale/fr";
import React from "react";
import ReactDOM from "react-dom";
import "react-notifications/lib/notifications.css";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./app";
import { DurationProvider } from "./context/DurationContext";
import logger from "./store/middlewares/logger";
import AuthReducer from "./store/reducers/authReducer";
import NotificationReducer from "./store/reducers/notificationReducer";
import PliReducer from "./store/reducers/pliReducer";
import ThreadReducer from "./store/reducers/threadReducer";

const REACT_VERSION = React.version;
console.log("[React Version] ", REACT_VERSION);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    auth: AuthReducer,
    notification: NotificationReducer,
    thread: ThreadReducer,
    pli: PliReducer,
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
    <Provider store={store}>
        <DurationProvider><App /></DurationProvider>
    </Provider>,
    document.getElementById("root")
);
