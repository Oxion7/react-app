import React, {useEffect, useState} from 'react';
import s from './ProfileInfo.module.css';

type ProfileStatusPropsType = {
    status: string;
    updateStatus: (status: string) => void;
}

const ProfileStatus: React.FC<ProfileStatusPropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            {!editMode &&
                <div>
                <span
                    className={s.statusDisplay}
                    onDoubleClick={activateEditMode}
                >
                    {props.status || "No status"}
                </span>
                </div>
            }
            {editMode &&
                <div>
                    <input
                        className={s.statusInput}
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}
                    />
                </div>
            }
        </div>
    )
}

export default ProfileStatus;
