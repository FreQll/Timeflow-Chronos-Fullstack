import Cookies from 'js-cookie';
import { savedState } from '../store';

const checkTokenExpirationMiddleware = store => next => action => {
    console.log('CheckToken');
    if (action.type === 'CHECK_TOKEN_EXPIRATION') {
        if (savedState?.isAuthenticated) {
            const tokenExpiration = Cookies.get('token');
            const currentTime = new Date().getTime();
            console.log(tokenExpiration);
            if (currentTime > tokenExpiration || !tokenExpiration) {
                console.log('Logout');
                localStorage.removeItem('authState');
                action.type = 'LOGOUT';
            }
        }
    }
    return next(action);
}

export default checkTokenExpirationMiddleware;