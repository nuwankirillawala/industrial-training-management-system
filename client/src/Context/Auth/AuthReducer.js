import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SET_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    RETRIEVE_USER_FROM_COOKIE
} from '../type';

export default (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false,
            };

        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload,
            };

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
            };

        case SET_LOADING:
            return {
                ...state,
                loading: true,
            };

        case RETRIEVE_USER_FROM_COOKIE:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user,
            }

        default:
            return state;
    }
}