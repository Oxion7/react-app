import {ProfileType} from "../../../../redux/profile/types/profile";

export type ProfilePropsType = {
    profile: ProfileType;
    status: string;
    updateStatus: (status: string) => void;
}
