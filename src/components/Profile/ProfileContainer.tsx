import React, {useEffect} from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, updateStatus} from "../../redux/profile/profile-reducer";
import {useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../redux/profile/types/profile";

type ProfileContainerPropsType = {
    profile: ProfileType
    status: string;
    authorizedUserId: string | null;
    isAuth: boolean;
    getUserProfile: (userId: string) => void;
    getStatus: (userId: string) => void;
    updateStatus: (status: string) => void;
}

const ProfileContainer: React.FC<ProfileContainerPropsType> = (props) => {
    const {userId} = useParams<{ userId: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserId = userId || props.authorizedUserId;

        if (!currentUserId) {
            navigate("/login");
            return;
        }

        props.getUserProfile(currentUserId);
        props.getStatus(currentUserId);
    }, [userId, props.authorizedUserId, navigate, props.getUserProfile, props.getStatus]);

    return (
        <Profile {...props}
                 profile={props.profile}
                 status={props.status}
                 updateStatus={props.updateStatus}/>
    )
}

const mapStateToProps = (state: any) => {
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus})
)(ProfileContainer) as React.ComponentType;



