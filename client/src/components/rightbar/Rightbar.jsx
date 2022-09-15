import React, { useContext, useEffect } from 'react'
import Online from '../online/Online'
import './rightbar.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import { Users } from '../../dummyData'
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const relation = { "1": "Single", "2": "Married", "3": "Complex" }
    const [friends, setFriends] = useState([])
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id))
    }, [currentUser, user?._id])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`http://localhost:5000/api/users/friends/${user?._id}`);
            console.log(res.data);
            setFriends(res.data)
        }
        getFriends()
    }, [user])


    const followHandler = async () => {
        try {
            if (followed) {
                await axios.put(`http://localhost:5000/api/users/${user?._id}/unfollow`, { userId: currentUser._id });
                dispatch({ type: "UNFOLLOW", payload: user._id })

            } else {
                await axios.put(`http://localhost:5000/api/users/${user?._id}/follow`, { userId: currentUser._id });
                dispatch({ type: "FOLLOW", payload: user._id })

            }
        } catch (error) {
            console.log(error)
        }
        setFollowed(p => !p)
    }



    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="./assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>{currentUser.username}</b> and <b>3 other friends</b> have a birthday today
                    </span>
                </div>
                <img src="/assets/ad.png" alt="ad img" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friends</h4>

                <ul className="rightbarFriendList">
                    {
                        Users.map(user => (
                            <Online key={user.id} user={user} />
                        ))
                    }
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={followHandler}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <RemoveIcon /> : <AddIcon />}
                    </button>
                )}
                <h4 className="rightbarProfileTitle"> User Information</h4>

                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City: </span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From: </span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">gender: </span>
                        <span className="rightbarInfoValue">{user.gender}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship: </span>
                        <span className="rightbarInfoValue">{relation[user.relationship]}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Birthday: </span>
                        <span className="rightbarInfoValue">{user.birthday} </span>
                    </div>
                </div>
                <h4 className="rightbarProfileTitle"> User Friends</h4>


                <div className="rightbarFollowings">
                    {
                        friends && friends.map((friend) => (
                            <Link key={friend._id} to={`/profile/${friend.username}`}>
                                <div key={friend._id} className="rightbarFollowing">
                                    <img src={friend.userProfile ? PF + friend.userProfile : PF + '/noAvatar.webp'} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        )
                        )
                    }
                </div>

            </>
        )
    }

    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
