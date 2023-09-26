import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import { composeWithDevTools } from '@redux-devtools/extension';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools()
);

export default store;
