import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunkMiddleware from 'redux-thunk'

import authReducer from './reducers/authReducer';
import tagReducer from "./reducers/tagReducer";
import documentReducer from "./reducers/documentReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const rootReducer = combineReducers({
    auth: authReducer,
    tag: tagReducer,
    document: documentReducer
});

const store = createStore(
    rootReducer,
    composedEnhancer,
);

export default store;
