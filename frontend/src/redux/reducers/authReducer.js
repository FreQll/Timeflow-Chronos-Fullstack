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
            return {
                isAuth : true,
                user: {
                    id: action.payload.id,
                    email: action.payload.email,
                    fullName: action.payload.full_name,
                    login: action.payload.login
                }
            }
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}

export default authReducer;