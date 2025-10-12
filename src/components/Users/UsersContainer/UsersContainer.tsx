import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleFollowingProgress,
    unfollow,
} from '../../../redux/users/users-reducer';
import Users from '../Users/Users';
import Preloader from "../../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../../redux/users-selectors";
import {RootState} from "../../../redux/store/redux-store";
import {MapDispatchToPropsType, MapStateToPropsType, UsersContainerPropsType} from "./types/UsersContainer";

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