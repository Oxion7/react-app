import React from 'react';
import s from './../Dialogs.module.css';

type DialogItemPropsType = {
    name: string;
    id: number;
    lastMessage?: string;
    lastMessageTime?: string;
    isActive: boolean;
    isOnline?: boolean;
    unreadCount?: number;
    onSelect: (id: number) => void;
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const handleClick = () => {
        props.onSelect(props.id);
    };

    return (
        <div
            className={`${s.dialogItem} ${props.isActive ? s.active : ''}`}
            onClick={handleClick}
        >
            <div className={s.dialogAvatar}>
                {getInitials(props.name)}
                <div className={props.isOnline ? s.onlineStatus : s.offlineStatus}></div>
            </div>
            <div className={s.dialogInfo}>
                <div className={s.dialogName}>{props.name}</div>
                {props.lastMessage && (
                    <div className={s.dialogLastMessage}>{props.lastMessage}</div>
                )}
                {props.lastMessageTime && (
                    <div className={s.dialogTime}>{props.lastMessageTime}</div>
                )}
            </div>
            {props.unreadCount && props.unreadCount > 0 && (
                <div className={s.unreadBadge}>{props.unreadCount}</div>
            )}
        </div>
    );
}

export default DialogItem;
