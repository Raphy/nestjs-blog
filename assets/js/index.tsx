import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider,
} from 'react-redux';
import {
	Store,
} from './System';
import reducers from './reducers';
import sagas from './sagas';

const store = Store(reducers, {}, sagas);

ReactDOM.render(<Provider store={store}>
	<h1>Hello!</h1>
</Provider>, document.getElementById('root'));