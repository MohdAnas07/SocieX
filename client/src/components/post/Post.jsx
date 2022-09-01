import React, { useState } from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Users } from '../../dummyData';

const Post = ({ post }) => {
    let { profilePicture, username } = Users.filter(user => user.id === post.userId)[0]

    const [like, setLike] = useState(post.like)
    const [isLiked, setIsLiked] = useState(false)

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(p => !p)

    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={profilePicture} alt="profile" className="postProfileImg" />
                        <span className="postUsername">{username}</span>
                        <span className="postData">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc} </span>
                    <img className="postImg" src={post.photo} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src="/assets/like.png" alt="icon" onClick={likeHandler} />
                        <img className="likeIcon" src="/assets/heart.png" onClick={likeHandler} alt="icon" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post?.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post