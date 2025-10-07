import React from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserType} from "../../redux/users-reducer";

type UsersPropsType = {
    currentPage: number;
    totalUsersCount: number;
    pageSize: number;
    onPageChanged: (pageNumber: number) => void;
    users: UserType[];
    followingInProgress: number[];
    unfollow: (id: number) => void;
    follow: (id: number) => void;
}


const Users: React.FC<UsersPropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
    </div>
}

export default Users;
