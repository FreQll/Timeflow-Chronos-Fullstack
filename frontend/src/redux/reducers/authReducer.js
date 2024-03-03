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
    switch (action.type) {
        case 'LOGIN':
            const newState = {
              isAuthenticated: true,
              user: {
                id: action.payload.id,
                email: action.payload.email,
                fullName: action.payload.fullName,
              }
            };
            localStorage.setItem('authState', JSON.stringify(newState));
            return newState;
        case 'LOGOUT':
            localStorage.removeItem('authState');
            return initialState;
        default:
            return state;
    }
}

export default authReducer;