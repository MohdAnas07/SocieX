import React, { useContext, useRef } from 'react'
import './share.css'
import { Link } from 'react-router-dom';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';


const Share = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null)

    const shareFormHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }

        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName)
            data.append("file", file);
            newPost.img = fileName
            console.log(data);

            try {
                await axios.post("http://localhost:5000/api/upload", data)
                window.location.reload()
                setFile(null)

            } catch (error) {
                console.warn(error)
            }
        }

        try {
            await axios.post("http://localhost:5000/api/posts", newPost);
            window.location.reload()
            desc.current.value = ''

        } catch (error) {
            console.warn(error);
        }
        // console.log(desc.current.value);
        // console.log(file)
    }

    return (
        <div onSubmit={shareFormHandler} className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.userProfile ? PF + user.userProfile : PF + '/noAvatar.webp'} alt="" className="shareProfileImg" />
                    </Link>
                    <input ref={desc} placeholder={`what's in your mind ${user.username}?`} className="shareInput" />
                </div>

                <hr className="shareHr" />
                {
                    file && (
                        <div className="shareImgContainer">
                            <img src={URL.createObjectURL(file)} className='shareImg' alt="" />
                            <HighlightOffIcon style={{ "fontSize": "50px" }} className='cancelButton' onClick={() => setFile(null)} />
                        </div>
                    )
                }

                <form className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMediaIcon htmlColor='tomato' className='shareIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                            <input type="file" id='file' accept=".png, .jpeg, .jpg, .webp" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                        <div className="shareOption">
                            <LabelIcon htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <RoomIcon htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotionsIcon htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type='submit' className="shareButton">share</button>
                </form>
            </div>
        </div>
    )
}

export default Share