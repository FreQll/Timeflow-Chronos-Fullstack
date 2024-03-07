import { createStore, combineReducers, applyMiddleware } from 'redux';
import authReducer from './reducers/authReducer';
import checkTokenExpirationMiddleware from './middleware/checkTokenExpirationMiddleware';
import { reducer as toastrReducer } from 'react-redux-toastr'

const rootReducer = combineReducers({
    auth: authReducer,
    toastr: toastrReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(checkTokenExpirationMiddleware)
);

export const getSavedState = () => {
    return JSON.parse(localStorage.getItem('authState'));
}

export const savedState = getSavedState();
export default store