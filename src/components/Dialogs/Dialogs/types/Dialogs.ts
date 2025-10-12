import {DialogStateType} from "../../../../redux/dialogs/types/dialogs";

export type DialogsPropsType = {
    dialogsPage: DialogStateType;
    selectedDialogId: number | null;
    sendMessage: (newMessageBody: string, dialogId: number) => void;
    selectDialog: (dialogId: number) => void;
}
