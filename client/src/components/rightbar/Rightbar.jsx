import React from 'react'
import Online from '../online/Online'
import './rightbar.css'

import { Users } from '../../dummyData'


export default function Rightbar({ user }) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const relation = { "1": "Single", "2": "Married", "3": "Complex" }


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
                    <div className="rightbarFollowing">
                        <img src={`${PF}/person/2.jpeg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">john doe</span>
                    </div>
                    <div className="rightbarFollowing">
                        <img src={`${PF}/person/3.jpeg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">john doe</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img src={`${PF}/person/4.jpeg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">john doe</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img src={`${PF}/person/5.jpeg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">john doe</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img src={`${PF}/person/6.jpeg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">john doe</span>
                    </div>

                    <div className="rightbarFollowing">
                        <img src={`${PF}/person/7.jpeg`} alt="" className="rightbarFollowingImg" />
                        <span className="rightbarFollowingName">john doe</span>
                    </div>
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
