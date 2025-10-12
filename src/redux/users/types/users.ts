import {
    FOLLOW,
    SET_CURRENT_PAGE,
    SET_TOTAL_USERS_COUNT,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    TOGGLE_IS_FOLLOWING_PROGRESS,
    UNFOLLOW
} from "../const/users";

export type UserType = {
    id: number;
    name: string;
    status: string | null;
    photos: {
        small: string | null;
        large: string | null;
    };
    followed: boolean;
}
export type UsersStateType = {
    users: UserType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: number[];
    fake: number;
}

export type FollowAction = {
    type: typeof FOLLOW;
    userId: number;
}

export type UnfollowAction = {
    type: typeof UNFOLLOW;
    userId: number;
}

export type SetUsersAction = {
    type: typeof SET_USERS;
    users: UserType[];
}

export type SetCurrentPageAction = {
    type: typeof SET_CURRENT_PAGE;
    currentPage: number;
}

export type SetTotalUsersCountAction = {
    type: typeof SET_TOTAL_USERS_COUNT;
    count: number;
}

export type ToggleIsFetchingAction = {
    type: typeof TOGGLE_IS_FETCHING;
    isFetching: boolean;
}

export type ToggleFollowingProgressAction = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS;
    isFetching: boolean;
    userId: number;
}
export type UsersActions = FollowAction | UnfollowAction | SetUsersAction | SetCurrentPageAction
    | SetTotalUsersCountAction | ToggleIsFetchingAction | ToggleFollowingProgressAction;
