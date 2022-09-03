import React, { useState, useEffect } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import './feed.css'
import { Posts } from '../../dummyData';
import axios from 'axios';

export default function Feed() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            await axios.get("http://localhost:5000/api/posts/timeline/630f07f742230b5b011bb25a")
                .then((res) => {
                    setPosts(res.data)
                    console.log(res.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        fetchPosts()

    }, [])

    return (
        <div className='feed'>
            <div className="feedWrapper">
                <Share />
                {posts.map(post => (
                    <Post key={post._id} post={post} />
                ))}
            </div>
        </div>
    )
}
