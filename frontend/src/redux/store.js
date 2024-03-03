import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    auth: authReducer
});

const store = createStore(rootReducer);

export default store
export const savedState = JSON.parse(localStorage.getItem('authState'));