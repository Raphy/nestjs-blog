import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux';
import {
	createStore,
} from './../Components';
import reducers from './../reducers';
import sagas from './../sagas';

const data = window.__PRELOADED_DATA__;

delete window.__PRELOADED_DATA__;

const store = createStore(reducers, sagas, data);

ReactDOM.render(
	<Provider store={}>

</Provider>, document.getElementById('root'));