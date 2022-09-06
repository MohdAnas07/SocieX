import React, { useContext, useEffect } from 'react'
import './topbar.css'
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person'
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import { AuthContext } from '../../context/AuthContext';


export default function Topbar() {

    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const logoutHandler = () => {
        localStorage.setItem("user", null);
        window.location.reload();
    }


    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to='/'> <span className="logo">SocieX </span></Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className='searchIcon' />
                    <input placeholder='search for friend, post or video' className="searchInput" />
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
        </div>
    )
}
