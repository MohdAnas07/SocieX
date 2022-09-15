import React from 'react'
import './conversation.css';


function Conversation() {
    return (
        <div className="conversation">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="Img" className="conversationImg" />
            <span className="conversationName">John Doe</span>
        </div>
    )
}

export default Conversation