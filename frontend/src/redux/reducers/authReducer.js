const initialState = {
    isAuth: false,
    user: {
        id: 0,
        email: '',
        fullName: '',
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
                }
            }
            break;
        case 'LOGOUT':
            return initialState;
            break;
        default:
            return state;
            break;
    }
}

export default authReducer;