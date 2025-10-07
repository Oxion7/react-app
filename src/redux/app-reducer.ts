import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {RootState} from "./redux-store";
import {Dispatch} from "react";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type InitialStateType = {
    initialized: boolean;
}
let initialState: InitialStateType = {
    initialized: false
};
type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
type ActionsType = InitializedSuccessActionType;
type ThunkType = ThunkAction<void, RootState, unknown, ActionsType>;

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
