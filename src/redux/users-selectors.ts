import {createSelector} from "reselect";
import {UserType} from "./users/types/users";

const getUsersSelector = (state: any): UserType[] => {
    return state.usersPage.users;
}

export const getUsers = createSelector(
    getUsersSelector,
    (users: UserType[]) => {
        return users;
    })

export const getPageSize = (state: any): number => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: any): number => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: any): number => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: any): boolean => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: any): number[] => {
    return state.usersPage.followingInProgress;
}
