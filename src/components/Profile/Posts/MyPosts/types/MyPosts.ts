import {PostType} from "../../../../../redux/profile/types/profile";

export type MyPostsPropsType = {
    posts: PostType[];
    addPost: (newPostText: string) => void;
}

export type FormDataType = {
    newPostText: string;
}