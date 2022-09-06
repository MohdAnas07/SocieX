import React, { useEffect } from 'react'
import Online from '../online/Online'
import './rightbar.css'

import { Users } from '../../dummyData'
import axios from 'axios';
import { useState } from 'react';


export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const relation = { "1": "Single", "2": "Married", "3": "Complex" }
    const [friends, setFriends] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`http://localhost:5000/api/users/friends/${user._id}`);
            console.log(res.data);
            setFriends(res.data)
        }
        getFriends()
    }, [user._id])

    console.log(friends)


    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="./assets/gift.png" alt="" className="birthdayImg" />
                    <span className="birthdayText">
                        <b>Mohd Anas</b> and <b>3 other friends</b> have a birthday today
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
                        <span className="rightbarInfoKey">School: </span>
                        <span className="rightbarInfoValue">BTKIT, Dwarahat</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship: </span>
                        <span className="rightbarInfoValue">{relation[user.relationship]}</span>
                    </div>

                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Birthday: </span>
                        <span className="rightbarInfoValue">12 sep 2000</span>
                    </div>
                </div>
                <h4 className="rightbarProfileTitle"> User Friends</h4>
                <div className="rightbarFollowings">
                    {
                        friends && friends.map((friend) => {
                            return (
                                <div key={friend._id} className="rightbarFollowing">
                                    <img src={friend.userProfile ? PF + friend.userProfile : PF + '/noAvatar.webp'} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            )
                        })
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
