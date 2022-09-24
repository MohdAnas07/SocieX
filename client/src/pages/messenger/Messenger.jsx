import React, { useContext, useEffect } from 'react'
import ChatOnline from '../../components/chatOnline/ChatOnline'
import Conversation from '../../components/coversation/Conversation'
import Message from '../../components/message/Message'
import Topbar from '../../components/topbar/Topbar'
import './messenger.css'

import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { AuthContext } from '../../context/AuthContext'
import { useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'

function Messenger() {

    const { user } = useContext(AuthContext);
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scrollRef = useRef();
    const [currentChatFriend, setCurrentChatFriend] = useState(null)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const getConversation = async () => {
            const res = await axios.get(`http://localhost:5000/api/conversations/${user._id}`)
            setConversations(res.data)
        };
        getConversation();

    }, [user._id,])


    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/messages/${currentChat?._id}`);
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessages();
    }, [currentChat])


    useEffect(() => {
        const friendId = currentChat?.members.find(m => m !== user._id)
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/users?userId=${friendId}`);
                setCurrentChatFriend(res.data)
                console.log(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }, [currentChat, user])


    const messageHandler = async (e) => {
        e.preventDefault()
        if (newMessage.length > 0) {
            const message = {
                sender: user._id,
                text: newMessage,
                conversationId: currentChat._id
            }

            try {
                const res = await axios.post("http://localhost:5000/api/messages/", message);
                setMessages([...messages, res.data])
                setNewMessage("")
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input type="text" className="chatMenuInput" placeholder='search for friends' />
                        {
                            conversations.map(c => (
                                <div key={c._id} onClick={() => setCurrentChat(c)}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div className="chatBox">

                    <div className="chatBoxWrapper">
                        {
                            currentChat ? <>
                                <div className="chatBoxInfoBar">
                                    <div className="chatBoxInfoBarLeft">
                                        <img src={currentChatFriend?.profilePicture ? currentChatFriend.profilePicture : PF + '/noAvatar.webp'} alt="" className="chatBoxInfoBarImg" />
                                        <span className="chatBoxInfoBarName">{currentChatFriend?.username}</span>
                                    </div>

                                    <div className="chatBoxInfoBarRight">
                                        <VideocamIcon className='chatBoxIcons' />
                                        <CallIcon className='chatBoxIcons' />
                                        <MoreVertIcon className='chatBoxIcons' />
                                    </div>
                                </div>

                                <div className="chatBoxTop">
                                    {
                                        messages.map(m => (
                                            <div key={m._id} ref={scrollRef}>
                                                <Message message={m} own={m.sender === user._id} />
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className="chatBoxBottom">
                                    <input type="text"
                                        className="chatMessageInput"
                                        placeholder='Type something...'
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                    <button
                                        onClick={messageHandler}
                                        className="chatSubmitButton">
                                        Send
                                    </button>
                                </div>
                            </> :
                                <span className="noConversation">
                                    Open a Conversation to start a Chat
                                </span>
                        }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <h3>Online Friends</h3>
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger