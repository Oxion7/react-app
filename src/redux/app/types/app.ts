import {ThunkAction} from "redux-thunk";
import {RootState} from "../../store/redux-store";
import {INITIALIZED_SUCCESS} from "../const/app";

export type InitialStateType = {
    initialized: boolean;
}
export type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}
export type ActionsType = InitializedSuccessActionType;
export type ThunkType = ThunkAction<void, RootState, unknown, ActionsType>;
