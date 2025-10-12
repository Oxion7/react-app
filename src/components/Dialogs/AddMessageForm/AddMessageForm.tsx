import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import s from "./css/AddMessageForm.module.css"
import {FormDataType} from "./types/AddMessageForm";

const maxLength100 = maxLengthCreator(100);

const AddMessageForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.messageForm}>
            <Field
                name="newMessageBody"
                component={Textarea}
                placeholder="Type a message..."
                className={s.messageInput}
                validate={[required, maxLength100]}
                rows="1"
            />
            <button className={s.sendButton}>Send</button>
        </form>
    );
}

export default reduxForm<FormDataType>({form: "dialogAddMessageForm"})(AddMessageForm);
