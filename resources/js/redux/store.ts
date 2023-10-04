import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunkMiddleware from 'redux-thunk'
import tagReducer from "./reducers/tagReducer";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const rootReducer = combineReducers({
    auth: authReducer,
    tag: tagReducer
});

const store = createStore(
    rootReducer,
    composedEnhancer,
);

export default store;
