const SEND_MESSAGE = 'SEND_MESSAGE' as const;
const SELECT_DIALOG = 'dialogs/SELECT_DIALOG' as const;

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
type DialogsActionType = SendMessageActionType | SelectDialogActionType;

const initialState: DialogStateType = {
    dialogs: [
        {id: 1, name: 'Dimych', lastMessage: 'Hello there!', unreadCount: 2, isOnline: true},
        {id: 2, name: 'Andrew', lastMessage: 'How are you?', unreadCount: 0, isOnline: false},
        {id: 3, name: 'Sveta', lastMessage: 'See you tomorrow', unreadCount: 1, isOnline: true},
        {id: 4, name: 'Sasha', lastMessage: 'What\'s up?', unreadCount: 0, isOnline: true},
        {id: 5, name: 'Viktor', lastMessage: 'Let\'s meet soon', unreadCount: 3, isOnline: false},
        {id: 6, name: 'Valera', lastMessage: 'Thanks for your help', unreadCount: 0, isOnline: true}
    ],
    messages: [
        {id: 1, dialogId: 1, message: 'Hi', isOutgoing: false},
        {id: 2, dialogId: 1, message: 'Hello! How are you?', isOutgoing: true},
        {id: 3, dialogId: 2, message: 'Good morning!', isOutgoing: false},
        {id: 4, dialogId: 2, message: 'Hi there!', isOutgoing: true},
        {id: 5, dialogId: 3, message: 'See you later', isOutgoing: false},
        {id: 6, dialogId: 4, message: 'What\'s up?', isOutgoing: false},
        {id: 7, dialogId: 5, message: 'Let\'s meet soon', isOutgoing: false},
        {id: 8, dialogId: 6, message: 'Thanks for your help', isOutgoing: false}
    ],
    selectedDialogId: null
};

const dialogsReducer = (
    state: DialogStateType = initialState,
    action: DialogsActionType) => {
    switch (action.type) {
        case SEND_MESSAGE:
            const body: string = action.newMessageBody;
            const dialogId: number | null = action.dialogId || state.selectedDialogId;

            if (!dialogId) {
                return state; // Don't send message if dialog isnt selected
            }

            const newMessage: messageType = {
                id: state.messages.length + 1,
                dialogId: dialogId,
                message: body,
                isOutgoing: true
            };

            // Update the last message
            const updatedDialogs = state.dialogs.map(dialog => {
                if (dialog.id === dialogId) {
                    return {
                        ...dialog,
                        lastMessage: body,
                        unreadCount: 0 // Reset
                    };
                }
                return dialog;
            });

            return {
                ...state,
                messages: [...state.messages, newMessage],
                dialogs: updatedDialogs
            };

        case SELECT_DIALOG:
            // When selecting a dialog, mark messages as read
            const dialogsWithResetUnread = state.dialogs.map(dialog => {
                if (dialog.id === action.dialogId) {
                    return {
                        ...dialog,
                        unreadCount: 0
                    };
                }
                return dialog;
            });

            return {
                ...state,
                selectedDialogId: action.dialogId,
                dialogs: dialogsWithResetUnread
            };

        default:
            return state;
    }
}

export const sendMessageCreator = (newMessageBody: string, dialogId: number) => ({
    type: SEND_MESSAGE,
    newMessageBody,
    dialogId
});

export const selectDialog = (dialogId: number) => ({
    type: SELECT_DIALOG,
    dialogId
});

export default dialogsReducer;
