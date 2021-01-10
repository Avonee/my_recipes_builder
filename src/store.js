import reducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import createLogger from 'redux-logger';
// const logger = createLogger();

export default function configureStore() {
    let store = createStore(
        reducer,
        applyMiddleware(thunk)
    )

    return store
}