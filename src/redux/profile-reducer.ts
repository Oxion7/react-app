import {profileAPI, usersAPI} from "../api/api";
import {Dispatch} from "react";

const ADD_POST = 'ADD-POST' as const;
const SET_USER_PROFILE = 'SET_USER_PROFILE' as const;
const SET_STATUS = 'SET_STATUS' as const;
const DELETE_POST = 'DELETE_POST' as const;

export type PostType = {
    id?: number;
    message: string;
    likesCount: number;
};
export type ContactsType = {
    github: string;
    vk: string;
    facebook: string;
    twitter: string;
    instagram: string;
    website: string;
    youtube: string;
    mainLink: string;
}
export type ProfileType = {
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: ContactsType;
    photos?: {
        small: string | null;
        large: string | null;
    };
}

export type InitialStateType = {
    posts: PostType[];
    profile: ProfileType | null;
    status: string;
    newPostText?: string;
}


const initialState: InitialStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    profile: null,
    status: ""
};
type AddPostActionType = {
    type: typeof ADD_POST;
    newPostText: string;
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile: ProfileType;
}

type SetStatusActionType = {
    type: typeof SET_STATUS;
    status: string;
}

type DeletePostActionType = {
    type: typeof DELETE_POST;
    postId: number;
}
type ActionsType = AddPostActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType;

const profileReducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case ADD_POST: {
            const newPost: PostType = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText: string): AddPostActionType => ({type: ADD_POST, newPostText})
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})

export const getUserProfile = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId: number) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status: string) => async (dispatch: Dispatch<ActionsType>) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export default profileReducer;
