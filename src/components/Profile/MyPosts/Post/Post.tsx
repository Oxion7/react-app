import React from 'react';
import s from './Post.module.css';
import {PostType} from "../../../../redux/profile/types/profile";

const Post: React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;
