import React, { useEffect, useState } from 'react'
import './profile.css'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {

            const res = await axios.get(`http://localhost:5000/api/users?username=anas`)
            setUser(res.data)
            console.log(res.data);
        }
        fetchUser()

    }, [])

    return (
        <>
            <Topbar />
            <div className='profile'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={`${PF}/post/3.jpeg`} alt="" className="profileCoverImg" />
                            <img src={`${PF}/person/1.jpeg`} alt="" className="profileUserImg" />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={user.username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile