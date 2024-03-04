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
            console.log(action.payload);
            const newState = {
              isAuthenticated: true,
              user: {
                id: action.payload.id,
                email: action.payload.email,
                fullName: action.payload.full_name,
                login: action.payload.login
              }
            };
            console.log(newState);
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