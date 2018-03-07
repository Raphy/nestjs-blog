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
	StaticRouter,
} from 'react-router';
import {
	syncHistoryWithStore,
} from 'react-router-redux';

const store = createStore(reducers, sagas);

syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
	<Provider store={store}>
		<StaticRouter>

		</StaticRouter>
	</Provider>, document.getElementById('root'));