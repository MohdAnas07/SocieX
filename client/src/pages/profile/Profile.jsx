import React, { useEffect, useState } from 'react'
import './profile.css'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios'
import { useParams } from 'react-router'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [user, setUser] = useState({});
    const username = useParams().username

    useEffect(() => {
        const fetchUser = async () => {

            const res = await axios.get(`http://localhost:5000/api/users?username=${username}`)
            setUser(res.data)
            console.log(res.data);
        }
        fetchUser()

    }, [username])

    return (
        <>
            <Topbar />
            <div className='profile'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture || PF + '/noCover2.jpg'} alt="" className="profileCoverImg" draggable='false' />

                            <img src={user.profilePicture || PF + '/noAvatar.jpg'} alt="" className="profileUserImg" draggable='false' />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile