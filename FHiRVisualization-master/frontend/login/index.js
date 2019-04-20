import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import { Router, Route, browserHistory  } from "react-router";
import { syncHistoryWithStore, syncHistory } from "react-router-redux";
import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import isNode from "detect-node";

import createRoutes from "./routes";
import rootReducer from "./reducers";

let middleware = [thunkMiddleware];

// Don't use Logger Server side
if(!isNode) {
    middleware.push(createLogger());
}

// the 2 functions loadState & saveState were used to fix the issue of redux ignoring persisted state
// such that before, when the user refreshes the page, he would get logged out because of redux state
function loadState() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(err){
        return undefined;
    }
};

function saveState(state){
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    }catch(err){

    }
}
const persistedState = loadState();

// enabled google chrome redux devtools extensions for debugging for future developers
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, persistedState, composeEnhancers(applyMiddleware(...middleware)));

const finalCreateStore = applyMiddleware(...middleware)(createStore);
const store = finalCreateStore(rootReducer, persistedState);


store.subscribe(() => {
    saveState(store.getState());
});

const history = syncHistoryWithStore(browserHistory, store);
const routes = createRoutes(store, history);

render(
    <Provider store={store}>
    <Router history={history}>
        {routes}
        </Router>
    </Provider>,
    document.getElementById("app")
);

