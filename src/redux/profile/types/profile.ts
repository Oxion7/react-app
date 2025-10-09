import {ADD_POST, DELETE_POST, SET_STATUS, SET_USER_PROFILE} from "../const/profile";

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
export type AddPostActionType = {
    type: typeof ADD_POST;
    newPostText: string;
}
export type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE;
    profile: ProfileType;
}

export type SetStatusActionType = {
    type: typeof SET_STATUS;
    status: string;
}

export type DeletePostActionType = {
    type: typeof DELETE_POST;
    postId: number;
}
export type ActionsType = AddPostActionType | SetUserProfileActionType | SetStatusActionType | DeletePostActionType;