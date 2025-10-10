import {UserType} from "../../../../redux/users/types/users";

export type UserPropsType = {
    user: UserType;
    followingInProgress: number[];
    unfollow: (id: number) => void;
    follow: (id: number) => void;
}