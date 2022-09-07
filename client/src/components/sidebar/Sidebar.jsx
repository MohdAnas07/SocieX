import React from 'react'
import './sidebar.css'
import FeedIcon from '@mui/icons-material/Feed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import GroupIcon from '@mui/icons-material/Group';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData';
import { Link } from 'react-router-dom';

export const Sidebar = () => {


    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <Link style={{ 'color': 'black' }} to='/'>
                        <li className="sidebarListItem">
                            <FeedIcon className='sidebarIcon' />
                            <span className='sidebarListItemText'>Feed</span>
                        </li>
                    </Link>
                    <li className="sidebarListItem">
                        <ChatIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <GroupIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <BookmarkIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <ContactSupportIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <EventIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <SchoolIcon className='sidebarIcon' />
                        <span className='sidebarListItemText'>Courses</span>
                    </li>
                </ul>

                <button className="sidebarButton">Show More</button>
                <hr className='sidebarHr' />
                <ul className="sidebarFriendList">
                    {Users.map(user => (
                        <CloseFriend key={user.id} user={user} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
