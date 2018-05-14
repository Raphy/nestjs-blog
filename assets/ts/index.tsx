import React from 'react';
import ReactDOM from 'react-dom';
import {
	Store,
} from './System/index.tsx';
import {
	Provider,
} from 'react-redux';
import App from './App/index.tsx';

const store = Store(reducers, {}, sagas);

ReactDOM.render(<Provider store={store}>
	<App/>
</Provider>, document.getElementById('root'));