import {ProfileType} from "../../../../redux/profile/types/profile";

export type ProfileInfoPropsType = {
    profile: ProfileType | null;
    status: string;
    updateStatus: (status: string) => void;
}
export type ProfileStatusPropsType = {
    status: string;
    updateStatus: (status: string) => void;
}
