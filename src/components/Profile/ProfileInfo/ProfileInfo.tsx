import React from 'react';
import s from './css/ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import {ProfileInfoPropsType} from "./types/ProfileInfo";

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({profile, status, updateStatus}) => {

    if (!profile) {
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos?.large ?? '/../../../assets/images/user.png'}
                     alt="Profile"
                />
                <div className={s.profileStatus}>
                    <ProfileStatus status={status} updateStatus={updateStatus}/>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;
