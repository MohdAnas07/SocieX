import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import './conversation.css';


function Conversation({ conversation, currentUser }) {
    const [user, setUser] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        const friendId = conversation.members.find(m => m !== currentUser._id)
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users?userId=${friendId}`);
                setUser(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [currentUser, conversation])

    return (
        <>
            {user &&

                <div div className="conversation" >
                    <img src={user.userProfile ? user.userProfile : PF + '/noAvatar.webp'} alt="Img" className="conversationImg" />
                    <span className="conversationName">{user.username}</span>
                </div>
            }
        </>

    )
}

export default Conversation