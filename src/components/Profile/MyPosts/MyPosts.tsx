import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {PostType} from "../../../redux/profile/types/profile";

const maxLength10 = maxLengthCreator(10);


type MyPostsPropsType = {
    posts: PostType[];
    addPost: (newPostText: string) => void;
}

type FormDataType = {
    newPostText: string;
}

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={s.postForm}>
            <div>
                <Field
                    name="newPostText"
                    component={Textarea}
                    placeholder="What's on your mind?"
                    className={s.postTextarea}
                    validate={[required, maxLength10]}
                />
            </div>
            <div>
                <button className={s.postButton}>Add Post</button>
            </div>
        </form>
    );
}

const AddNewPostFormRedux = reduxForm<FormDataType>({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts: React.FC<MyPostsPropsType> = React.memo(props => {
    const postsElements =
        [...props.posts]
            .reverse()
            .map((p, index) => <Post key={p.id || index} message={p.message} likesCount={p.likesCount}/>);

    const onAddPost = (values: FormDataType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3 className={s.postsTitle}>My Posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;
