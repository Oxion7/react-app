import {UserType} from "../../../../redux/users/types/users";

export type MapStateToPropsType = {
    users: UserType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: number[];
}
export type MapDispatchToPropsType = {
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setCurrentPage: (pageNumber: number) => void;
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
    getUsers: (currentPage: number, pageSize: number) => void;
}
export type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;