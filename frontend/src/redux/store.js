import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';
import checkTokenExpirationMiddleware from './middleware/checkTokenExpirationMiddleware';

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(checkTokenExpirationMiddleware)
);


export default store
export const savedState = JSON.parse(localStorage.getItem('authState'));