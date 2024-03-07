import Cookies from 'js-cookie';
import { savedState } from '../store';

const checkTokenExpirationMiddleware = store => next => action => {
    console.log(Cookies.get('token'));
    if (action.type === 'CHECK_TOKEN_EXPIRATION') {
        if (savedState?.isAuthenticated) {
            const tokenExpiration = Cookies.get('token');
            const currentTime = new Date().getTime();
            if (currentTime > tokenExpiration) {
                console.log('Logout');
                localStorage.removeItem('authState');
                Cookies.remove('token');
                action.type = 'LOGOUT';
            }
        }
    }
    return next(action);
}

export default checkTokenExpirationMiddleware;