export const login = ( email, login, full_name, id ) => ({
    type: 'LOGIN',
    payload: { email, login, full_name, id },
})

export const logout = () => ({
    type: 'LOGOUT',
})