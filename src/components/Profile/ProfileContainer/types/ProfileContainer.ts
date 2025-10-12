import {ProfileType} from "../../../../redux/profile/types/profile";

export type ProfileContainerPropsType = {
    profile: ProfileType
    status: string;
    authorizedUserId: string | null;
    isAuth: boolean;
    getUserProfile: (userId: string) => void;
    getStatus: (userId: string) => void;
    updateStatus: (status: string) => void;
}