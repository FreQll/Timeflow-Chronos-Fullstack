import Cookies from 'js-cookie';

const initialState = {
    isAuth: false,
    user: {
        id: 0,
        email: '',
        fullName: '',
        login: ''
    }
};

const authReducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'LOGIN':
            const newState = {
              isAuthenticated: true,
              user: {
                id: action.payload.id,
                email: action.payload.email,
                fullName: action.payload.full_name,
                login: action.payload.login
              }
            };
            localStorage.setItem('authState', JSON.stringify(newState));
            return newState;
        case 'LOGOUT':
            localStorage.removeItem('authState');
            return initialState;
        case 'CHECK_TOKEN_EXPIRATION':
            if (hasTokenExpired()) {
                localStorage.removeItem('authState');
                return initialState;
            }
            return state;
        default:
            return state;
    }
}

const hasTokenExpired = () => {
    const expirationDate = new Date(Cookies.get('token'));
    return expirationDate < new Date();
  };

export default authReducer;