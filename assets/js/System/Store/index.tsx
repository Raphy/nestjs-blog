import {
	createStore,
	compose as reduxCompose,
	applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const reduxSagaMiddleware = createSagaMiddleware();

export default (reducers: object, initialState: object = {}, sagas: Array = []) => {

	const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;

	const store = createStore(reducers, initialState, compose(applyMiddleware(
		reduxSagaMiddleware,
		thunk,
	)));

	sagas.forEach((saga) => {
		reduxSagaMiddleware.run(saga);
	});

	return store;
}