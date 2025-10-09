import React from 'react';
import {selectDialog, sendMessageCreator} from "../../redux/dialogs/dialogs-reducer";
import Dialogs from "./Dialogs";
import {useDispatch, useSelector} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {RootState} from "../../redux/store/redux-store";

const DialogsContainer: React.FC = () => {
    const dispatch = useDispatch();
    const {dialogsPage, selectedDialogId} = useSelector((state: RootState) => ({
        dialogsPage: state.dialogsPage,
        selectedDialogId: state.dialogsPage.selectedDialogId
    }));

    const sendMessage = (newMessageBody: string, dialogId: number) => {
        dispatch(sendMessageCreator(newMessageBody, dialogId));
    };

    const selectDialogHandler = (dialogId: number) => {
        dispatch(selectDialog(dialogId));
    };

    return (
        <Dialogs
            dialogsPage={dialogsPage}
            selectedDialogId={selectedDialogId}
            sendMessage={sendMessage}
            selectDialog={selectDialogHandler}
        />
    );
};

export default withAuthRedirect(DialogsContainer);
