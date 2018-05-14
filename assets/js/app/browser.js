import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux';
import {
	createStore,
} from './../Components';
import reducers from './../reducers';
import sagas from './../sagas';
import {
	browserHistory,
	Router,
} from 'react-router';
import {
	syncHistoryWithStore,
} from 'react-router-redux';

const data = window.__PRELOADED_DATA__;

delete window.__PRELOADED_DATA__;

const store = createStore(reducers, sagas, data);

syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<Router>

		</Router>
	</Provider>, document.getElementById('root'));