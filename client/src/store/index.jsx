import React from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSagas from "./saga";
import rootReducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, composeWithDevTools(middleware));

sagaMiddleware.run(rootSagas);

// eslint-disable-next-line react/prop-types
const ReduxWrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

export default ReduxWrapper;
