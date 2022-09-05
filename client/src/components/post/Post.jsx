import React, { useEffect, useState, useContext } from 'react'
import './post.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'


const Post = ({ post }) => {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])


    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()

    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put(`http://localhost:5000/api/posts/${post._id}/like`,
                { userId: currentUser._id })

        } catch (error) {
            console.warn(error)
        }

        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(p => !p)
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PF + user.profilePicture : PF + 'noAvatar.webp'} alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username} </span>
                        <span className="postData">{format(post.createdAt)}</span>
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