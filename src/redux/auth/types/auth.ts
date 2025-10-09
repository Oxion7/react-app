import {ThunkAction} from "redux-thunk";
import {RootState} from "../../store/redux-store";
import {CLEAR_AUTH_ERROR, SET_AUTH_ERROR, SET_USER_DATA} from "../const/auth";

export type InitialStateType = {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    error: string | null;
}
export type SetUserDataAction = {
    type: typeof SET_USER_DATA;
    payload: {
        userId: number | null, email: string | null, login: string | null, isAuth: boolean
    };
}

export type SetAuthErrorAction = {
    type: typeof SET_AUTH_ERROR;
    payload: string;
}

export type ClearAuthErrorAction = {
    type: typeof CLEAR_AUTH_ERROR;
}

export type AuthActions = SetUserDataAction | SetAuthErrorAction | ClearAuthErrorAction;
export type AuthThunk = ThunkAction<void, RootState, unknown, AuthActions>