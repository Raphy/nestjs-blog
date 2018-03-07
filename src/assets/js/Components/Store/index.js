import {
	createStore as _createStore,
	applyMiddleware,
	compose,
	combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

export default (reducers = {}, sagas = {}, data = {}) => {

	const reduxSagaMiddleware = createSagaMiddleware();

	const middlewares = [
		reduxSagaMiddleware,
		thunk,
	];

	const composeEnhancers =
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
			window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
			}) : compose;

	const store = _createStore(combineReducers(reducers), composeEnhancers(
		applyMiddleware(...middlewares),
	));

	sagas.forEach((saga) => {
		reduxSagaMiddleware.run(saga);
	});

	return store;

};