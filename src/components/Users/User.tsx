import React from 'react';
import styles from "./users.module.css";
import userPhoto from "../../assets/images/user.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../redux/users/types/users";


export type UserPropsType = {
    user: UserType;
    followingInProgress: number[];
    unfollow: (id: number) => void;
    follow: (id: number) => void;
}

const User: React.FC<UserPropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return (
        <div className={styles.userContainer}>
            <div className={styles.userActions}>
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto}
                         className={styles.userPhoto}
                         alt={user.name}/>
                </NavLink>
                <button
                    className={`${styles.followButton} ${user.followed ? styles.unfollowButton : ''}`}
                    disabled={followingInProgress.some(id => id === user.id)}
                    onClick={() => {
                        user.followed ? unfollow(user.id) : follow(user.id)
                    }}
                >
                    {user.followed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
            <div className={styles.userInfoSection}>
                <div className={styles.userMainInfo}>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userStatus}>{user.status || "No status available"}</div>
                </div>
                <div className={styles.userLocation}>
                    <div className={styles.locationCountry}>{"Country"}</div>
                    <div className={styles.locationCity}>{"City"}</div>
                </div>
            </div>
        </div>
    )
}

export default User;
