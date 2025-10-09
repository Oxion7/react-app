import {Dispatch} from 'react';
import {addPostActionCreator} from "../../../redux/profile/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {RootState} from "../../../redux/store/redux-store";

const mapStateToProps = (state: RootState) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        addPost: (newPostText: string) => {
            dispatch(addPostActionCreator(newPostText));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;
