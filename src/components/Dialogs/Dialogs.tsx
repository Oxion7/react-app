import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {DialogStateType} from "../../redux/dialogs/types/dialogs";

type DialogsPropsType = {
    dialogsPage: DialogStateType;
    selectedDialogId: number | null;
    sendMessage: (newMessageBody: string, dialogId: number) => void;
    selectDialog: (dialogId: number) => void;
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {
    const state = props.dialogsPage;

    const dialogsElements = state.dialogs.map(d => (
        <DialogItem
            name={d.name}
            key={d.id}
            id={d.id}
            lastMessage={d.lastMessage}
            isActive={props.selectedDialogId === d.id}
            onSelect={() => props.selectDialog(d.id)}
        />
    ));

    const messagesElements = state.messages
        .filter(m => m.dialogId === props.selectedDialogId)
        .map(m => (
            <Message
                message={m.message}
                key={m.id}
                isOutgoing={m.isOutgoing}
            />
        ));

    const addNewMessage = (values: any) => {
        if (props.selectedDialogId) {
            props.sendMessage(values.newMessageBody, props.selectedDialogId);
        }
    }

    const selectedUser = state.dialogs.find(d => d.id === props.selectedDialogId);
    const recipientName = selectedUser ? selectedUser.name : "Select a conversation";

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialogsHeader}>
                    <h2 className={s.dialogsTitle}>Messages</h2>
                </div>
                {dialogsElements}
            </div>

            <div className={s.messagesContainer}>
                <div className={s.messagesHeader}>
                    <h3 className={s.messagesRecipient}>{recipientName}</h3>
                    {!props.selectedDialogId && (
                        <div className={s.selectConversationHint}>
                            Select a conversation to start messaging
                        </div>
                    )}
                </div>

                <div className={s.messages}>
                    {messagesElements}
                    {!props.selectedDialogId && (
                        <div className={s.noConversationSelected}>
                            <div className={s.noConversationIcon}></div>
                            <p>Select a conversation from the list to start messaging</p>
                        </div>
                    )}
                    {props.selectedDialogId && messagesElements.length === 0 && (
                        <div className={s.noMessages}>
                            <div className={s.noMessagesIcon}></div>
                            <p>No messages yet. Start the conversation!</p>
                        </div>
                    )}
                </div>

                <div className={s.messageFormContainer}>
                    {props.selectedDialogId ? (
                        <AddMessageForm onSubmit={addNewMessage}/>
                    ) : (
                        <div className={s.disabledForm}>
                            <div className={s.disabledInput}>Select a conversation to message</div>
                            <button className={s.disabledButton} disabled>Send</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
