import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import {
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    AUTH_ERROR,
    SET_LOADING
} from '../type';

const AuthState = (props) => {
    const initialState = {
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
    }

    const setEssentialCookie = (user) => {
        const data = {
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }

        }
        Cookies.set('userCookie', JSON.stringify(data), { expires: 2 / 24 });
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState);
    console.log('Initial State', state);

    useEffect(() => {
        try {
            const userCookie = Cookies.get('userCookie');
            console.log(userCookie);
            if (userCookie) {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: JSON.parse(userCookie),
                });
            }
        } catch (error) {
            console.log("eeeee", error);
        }
    }, []);

    // load
    const loadUser = async () => {
        dispatch({ type: SET_LOADING })
        try {
            const res = await axios.get('http://localhost:5000/api/v1/auth/profile', { withCredentials: true });
            console.log("after loading user", res.data.user);
            const cookieData = JSON.stringify(res.data.user);
            setEssentialCookie(res.data.user);

            dispatch({
                type: USER_LOADED,
                payload: res.data.user,
            })

        } catch (err) {
            console.log(err);
            dispatch({ type: AUTH_ERROR });
        }
    }

    // logout 
    const logout = async () => {
        dispatch({ type: SET_LOADING });

        try {
            const res = await axios.get('http://localhost:5000/api/v1/auth/logout');
            console.log('logout', res);

            dispatch({ type: LOGOUT })
        } catch (err) {
            console.log(err);
            dispatch({ type: LOGOUT });
        }
    }

    // login
    const loginUser = async ({ email, password }) => {
        dispatch({ type: SET_LOADING });
        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password }, { withCredentials: true });
            console.log('after login', res.data);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res,
            });
            loadUser();

        } catch (err) {
            console.log("error in loginUser", err);
            dispatch({
                type: LOGIN_FAIL,
                payload: err
            });
        }
    }

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                loginUser,
                loadUser,
                logout,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;