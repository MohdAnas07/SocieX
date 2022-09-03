import React, { useEffect, useState } from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

const Post = ({ post }) => {

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`http://localhost:5000/api/users/${post.userId}`)
                .then((res) => {
                    setUser(res.data)
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchUser()

    }, [])

    const likeHandler = () => {
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(p => !p)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={user.profilePicture || PF + 'noAvatar.webp'} alt="" className="postProfileImg" />
                        <span className="postUsername">{user.username} </span>
                        <span className="postData">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc} </span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}/like.png`} alt="icon" onClick={likeHandler} />
                        <img className="likeIcon" src={`${PF}/heart.png`} onClick={likeHandler} alt="icon" />
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