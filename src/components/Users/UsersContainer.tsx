import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow,
    UserType
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selectors";
import {RootState} from "../../redux/redux-store";

type MapStateToPropsType = {
    users: UserType[];
    pageSize: number;
    totalUsersCount: number;
    currentPage: number;
    isFetching: boolean;
    followingInProgress: number[];
}
type MapDispatchToPropsType = {
    follow: (userId: number) => void;
    unfollow: (userId: number) => void;
    setCurrentPage: (pageNumber: number) => void;
    toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
    getUsers: (currentPage: number, pageSize: number) => void;
}
type UsersContainerPropsType = MapStateToPropsType & MapDispatchToPropsType;

const UsersContainer: React.FC<UsersContainerPropsType> = ({
                                                               users,
                                                               pageSize,
                                                               totalUsersCount,
                                                               currentPage,
                                                               isFetching,
                                                               followingInProgress,
                                                               follow,
                                                               unfollow,
                                                               getUsers
                                                           }) => {
    useEffect(() => {
        getUsers(currentPage, pageSize);
    }, [currentPage, pageSize, getUsers]);

    const onPageChanged = (pageNumber: number) => {
        getUsers(pageNumber, pageSize);
    }

    return (
        <>
            {isFetching ? <Preloader/> : null}
            <Users
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                users={users}
                follow={follow}
                unfollow={unfollow}
                followingInProgress={followingInProgress}
            />
        </>
    );
}

const mapStateToProps = (state: RootState): MapStateToPropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, RootState>(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers: requestUsers
    })
)(UsersContainer)
