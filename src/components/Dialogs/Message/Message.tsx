import React from 'react';
import s from './css/Message.module.css';
import {MessagePropsType} from "./types/Message";

const Message: React.FC<MessagePropsType> = (props) => {
    const isOutgoing = props.isOutgoing || false;

    return (
        <div className={`${s.message} ${isOutgoing ? s.messageOutgoing : s.messageIncoming}`}>
            <p className={s.messageText}>{props.message}</p>
            <div className={s.messageTime}>
                {new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
            </div>
        </div>
    )
}

export default Message;
