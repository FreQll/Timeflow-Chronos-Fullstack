export const enumUsersRoles = {
    GUEST: {
        title: 'Guest',
    },
    MODERATOR: {
        title: 'Moderator',
    },
    ADMIN: {
        title: 'Admin',
    },
}

export const enumUsersRolesArray = Object.entries(enumUsersRoles).map(([key, value]) => ({
    key,
    ...value
}));