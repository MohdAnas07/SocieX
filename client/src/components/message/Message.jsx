import React from 'react';
import './message.css';
function Message({ own }) {
    return (
        <div className={own ? "message own" : "message"} >
            <div className="messageTop">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg" alt="" className="messageImg" />
                <p className="messageText">hello this is anas</p>
            </div>
            <div className="messageBottom">1 hour ago</div>
        </div >
    )
}

export default Message