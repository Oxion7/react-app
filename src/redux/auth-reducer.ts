import {authAPI} from "../api/api";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";
import {Dispatch} from "react";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_AUTH_ERROR = 'samurai-network/auth/SET_AUTH_ERROR';
const CLEAR_AUTH_ERROR = 'samurai-network/auth/CLEAR_AUTH_ERROR';

type InitialStateType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    error: string | null;
}
type SetUserDataAction = {
    type: typeof SET_USER_DATA;
    payload: {
        userId: number | null, email: string | null, login: string | null, isAuth: boolean
    };
}

type SetAuthErrorAction = {
    type: typeof SET_AUTH_ERROR;
    payload: string;
}

type ClearAuthErrorAction = {
    type: typeof CLEAR_AUTH_ERROR;
}

type AuthActions = SetUserDataAction | SetAuthErrorAction | ClearAuthErrorAction;


const initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null
};

const authReducer = (state = initialState, action: AuthActions): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                error: null // Clear error on successful auth
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_AUTH_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserDataAction => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});

export const setAuthError = (error: string): SetAuthErrorAction => ({
    type: SET_AUTH_ERROR,
    payload: error
});

export const clearAuthError = (): ClearAuthErrorAction => ({
    type: CLEAR_AUTH_ERROR
});
type AuthThunk = ThunkAction<void, RootState, unknown, AuthActions>
export const getAuthUserData = (): AuthThunk => async (dispatch: Dispatch<any>) => {
    try {
        const response = await authAPI.me();
        if (response.data.resultCode === 0) {
            const {id, login, email} = response.data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    } catch (error) {
        console.error("Auth error:", error);
    }
}

export const login = (email: string, password: string, rememberMe: boolean): AuthThunk => async (dispatch: Dispatch<any>) => {
    try {
        // Clear any previous errors
        dispatch(clearAuthError());

        const response = await authAPI.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(getAuthUserData());
        } else {
            const message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
            dispatch(setAuthError(message));
        }
    } catch (error) {
        dispatch(setAuthError("Network error. Please try again."));
    }
}

export const logout = (): AuthThunk => async (dispatch: Dispatch<any>) => {
    try {
        const response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    } catch (error) {
        console.error("Logout error:", error);
    }
}

export default authReducer;
