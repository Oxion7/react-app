import {SELECT_DIALOG, SEND_MESSAGE} from "../const/dialogs";

export type DialogType = {
    id: number;
    name: string;
    lastMessage: string;
    unreadCount: number;
    isOnline: boolean;
};
export type messageType = {
    id: number;
    dialogId: number;
    message: string;
    isOutgoing: boolean;
};
export type DialogStateType = {
    dialogs: DialogType[];
    messages: messageType[];
    selectedDialogId: number | null;
};
type SendMessageActionType = {
    type: typeof SEND_MESSAGE;
    newMessageBody: string;
    dialogId: number;
};
type SelectDialogActionType = {
    type: typeof SELECT_DIALOG;
    dialogId: number;
};
export type DialogsActionType = SendMessageActionType | SelectDialogActionType;
