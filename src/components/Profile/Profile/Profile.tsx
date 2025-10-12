import React from 'react';
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import MyPostsContainer from "../Posts/MyPostsContainer/MyPostsContainer";
import s from './css/Profile.module.css';
import {ProfilePropsType} from "./types/Profile";

const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={s.profile}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}/>
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;
