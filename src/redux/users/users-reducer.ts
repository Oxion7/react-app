import {usersAPI} from "../../api/api";
import {updateObjectInArray} from "../../utils/object-helpers";
import {Dispatch} from "react";
import {
    FollowAction,
    SetCurrentPageAction,
    SetTotalUsersCountAction,
    SetUsersAction,
    ToggleFollowingProgressAction,
    ToggleIsFetchingAction,
    UnfollowAction,
    UsersActions,
    UsersStateType,
    UserType
} from "./types/users";
import {
    FOLLOW,
    SET_CURRENT_PAGE,
    SET_TOTAL_USERS_COUNT,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    TOGGLE_IS_FOLLOWING_PROGRESS,
    UNFOLLOW
} from "./const/users";

const initialState: UsersStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
    fake: 10
};

const usersReducer = (state = initialState, action: UsersActions) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const followSuccess = (userId: number): FollowAction => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId: number): UnfollowAction => ({type: UNFOLLOW, userId})
export const setUsers = (users: UserType[]): SetUsersAction => ({type: SET_USERS, users})
export const setCurrentPage = (currentPage: number): SetCurrentPageAction => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountAction => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingAction => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})

export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressAction => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const requestUsers = (page: number, pageSize: number) => {
    return async (dispatch: Dispatch<any>) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        const data = await usersAPI.getUsers(page, pageSize);
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch: Dispatch<any>,
                                  userId: number,
                                  apiMethod: (userId: number) => Promise<any>,
                                  actionCreator: (userId: number) => FollowAction | UnfollowAction
) => {
    dispatch(toggleFollowingProgress(true, userId));
    const response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
}

export const follow = (userId: number) => {
    return async (dispatch: Dispatch<any>) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
    }
}
export const unfollow = (userId: number) => {
    return async (dispatch: Dispatch<any>) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
    }
}

export default usersReducer;
