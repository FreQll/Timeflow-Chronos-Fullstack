import { savedState } from "../store"

const checkTokenExpirationMiddleware = store => next => action => {
    console.log('CheckToken');
    if (action.type === 'CHECK_TOKEN_EXPIRATION') {
        if (savedState.isAuth) {
            const tokenExpiration = Cookies.get('token');
            const currentTime = new Date().getTime();
            if (currentTime > tokenExpiration) {
                localStorage.removeItem('authState');
                action.type = 'LOGOUT';
            }
        }
    }
    return next(action);
}

export default checkTokenExpirationMiddleware;