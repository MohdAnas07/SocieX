import React from 'react';
import './chatOnline.css';

function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="" className="chatOnlineFriendImg" />
                    <span className="chatOnlineBadge"></span>
                </div>
                <span className="chatOnlineFriendName">John Doe</span>
            </div>
        </div>
    )
}

export default ChatOnline