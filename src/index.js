import React from 'react';
import {render} from 'react-dom';

import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'

import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import App from './containers/App';
import Trends from './containers/Trends';
import Home from './containers/Home';
import * as reducers from './reducers';

const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});
const store = createStore(
    reducer,
    applyMiddleware(
        thunkMiddleware
    )
)

const history = syncHistoryWithStore(browserHistory, store);


render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={Home}/>
                <Route path="result" component={Trends}/>
                <Route path='*' component={Trends}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);