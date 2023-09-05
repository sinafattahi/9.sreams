const INITIAL_STATE = {
    isLoggedIn: null,
    userId: null
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {...state, isLoggedIn: true, userId: action.payload}
        case 'LOG_OUT':
            return {...state, isLoggedIn: false, userId: action.payload}
        default:
            return state;
    }
};

export default authReducer;