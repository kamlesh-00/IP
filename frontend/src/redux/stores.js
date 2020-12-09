import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';

// Reducers

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
    
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(...middleware)))

export default store;