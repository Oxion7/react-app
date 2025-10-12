import {UserType} from "../../../../redux/users/types/users";

export type UsersPropsType = {
    currentPage: number;
    totalUsersCount: number;
    pageSize: number;
    onPageChanged: (pageNumber: number) => void;
    users: UserType[];
    followingInProgress: number[];
    unfollow: (id: number) => void;
    follow: (id: number) => void;
}

