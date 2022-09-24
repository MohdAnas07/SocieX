import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './chatOnline.css';

function ChatOnline({ onlineUsers, currentId, setCurrentChat, conversations, setConversations }) {

    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("http://localhost:5000/api/users/friends/" + currentId);
            setFriends(res.data);
        }
        getFriends();
    }, [currentId])

    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
    }, [friends, onlineUsers])

    console.log(onlineFriends);

    const handleClick = async (user) => {

        if (conversations.filter(c => c.members.includes(user._id)).length > 0) {
            try {
                const res = await axios.get(`http://localhost:5000/api/conversations/find/${currentId}/${user._id}`)
                setCurrentChat(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const res = await axios.post(`http://localhost:5000/api/conversations/`,
                    {
                        "senderId": currentId,
                        "receiverId": user._id
                    }
                )
                setConversations(prev => [...prev, res.data])
                setCurrentChat(res.data)
            } catch (error) {
                console.log(error)
            }
        }
    }


    useEffect(() => {

    }, [conversations])

    return (
        <div className="chatOnline">
            {
                onlineFriends &&
                onlineFriends.map((o) => (
                    <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
                        <div className="chatOnlineImgContainer">
                            <img src={o?.userProfile ? o.userProfile : PF + '/noAvatar.webp'}
                                alt="" className="chatOnlineFriendImg" />
                            <span className="chatOnlineBadge"></span>
                        </div>
                        <span className="chatOnlineFriendName"><onlineFriend className="username"></onlineFriend>{o.username} </span>
                    </div>
                ))
            }
        </div>
    )
}

export default ChatOnline