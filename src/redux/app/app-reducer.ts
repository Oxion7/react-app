import {getAuthUserData} from "../auth/auth-reducer";
import {Dispatch} from "react";
import {ActionsType, InitialStateType, ThunkType} from "./types/app";
import {INITIALIZED_SUCCESS} from "./const/app";

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = (): ThunkType => (dispatch: Dispatch<any>) => {
    const promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;