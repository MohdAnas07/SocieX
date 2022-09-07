import React, { useContext, useEffect, useState } from 'react'
import './topbar.css'
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person'
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useRef } from 'react';


export default function Topbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [allUsers, setAllUsers] = useState([])
    const [allSearchUser, setAllSearchUser] = useState([])
    const [searchUsername, setSearchUsername] = useState('')
    const searchUser = useRef()

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/all');
                setAllUsers(res.data)
            } catch (error) {
                console.warn(error)
            }
        }
        getAllUsers()
    }, [])


    const logoutHandler = () => {
        localStorage.setItem("user", null);
        window.location.reload();
    }

    const searchUserHandler = () => {
        setSearchUsername(searchUser.current.value)
        const all = allUsers.filter(u => {

            return u.username.toLowerCase().includes(searchUsername.toLowerCase());
        })
        setAllSearchUser(all)
    }

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to='/'> <span className="logo">SocieX </span></Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className='searchIcon' />
                    <input ref={searchUser} placeholder='search for friend, post or video' className="searchInput" onChange={searchUserHandler} />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <ChatIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}><img src={user.userProfile ? PF + user.userProfile : PF + '/noAvatar.webp'} alt="" className="topbarImg" /></Link>
                {user && <LogoutIcon className='logoutButton' titleAccess='Logout' onClick={logoutHandler} />}
            </div>
            {
                searchUsername && <div className="searchUserContainer">
                    <div className="searchUserWrapper">
                        {
                            allSearchUser.length > 0 ? allSearchUser.map(u => (
                                <div key={u._id} className="searchUserBox">
                                    <div className="userInfo">
                                        <img src={u.userProfile ? PF + u.userProfile : PF + '/noAvatar.webp'} alt="" className="searchUserImg" />
                                        <span className="searchUserName">{u.username}</span>
                                    </div>
                                    {
                                        <Link to={`/profile/${u.username}`}>
                                            <button className="searchUserFollowButton" >
                                                See Profile
                                            </button>
                                        </Link>
                                    }
                                </div>
                            ))
                                : <span style={{ 'textAlign': 'center', 'fontSize': '20px' }}>No User Found</span>
                        }
                    </div>
                </div>
            }
        </div >
    )
}
