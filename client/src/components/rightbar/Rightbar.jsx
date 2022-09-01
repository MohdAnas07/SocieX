import React from 'react'
import Online from '../online/Online'
import './rightbar.css'

import { Users } from '../../dummyData'

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
                    <span className="rightbarInfoValue">India</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From: </span>
                    <span className="rightbarInfoValue">Bazpur</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">School: </span>
                    <span className="rightbarInfoValue">BTKIT, Dwarahat</span>
                </div>

                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship: </span>
                    <span className="rightbarInfoValue">Single</span>
                </div>

                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Birthday: </span>
                    <span className="rightbarInfoValue">12 sep 2000</span>
                </div>
            </div>
            <h4 className="rightbarProfileTitle"> User Friends</h4>

            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img src='/assets/person/2.jpeg' alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">john doe</span>
                </div>
                <div className="rightbarFollowing">
                    <img src='/assets/person/3.jpeg' alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">john doe</span>
                </div>

                <div className="rightbarFollowing">
                    <img src='/assets/person/4.jpeg' alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">john doe</span>
                </div>

                <div className="rightbarFollowing">
                    <img src='/assets/person/5.jpeg' alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">john doe</span>
                </div>

                <div className="rightbarFollowing">
                    <img src='/assets/person/6.jpeg' alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">john doe</span>
                </div>

                <div className="rightbarFollowing">
                    <img src='/assets/person/7.jpeg' alt="" className="rightbarFollowingImg" />
                    <span className="rightbarFollowingName">john doe</span>
                </div>
            </div>

        </>
    )
}

export default function Rightbar({ profile }) {
    return (
        <div className='rightbar'>
            <div className="rightbarWrapper">
                {profile ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    )
}
