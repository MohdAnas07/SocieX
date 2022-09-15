import React, { useEffect, useState } from 'react'
import './profile.css'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import { Sidebar } from '../../components/sidebar/Sidebar'
import Topbar from '../../components/topbar/Topbar'
import axios from 'axios'
import { useParams } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FilterIcon from '@mui/icons-material/Filter';

import EditInfoForm from './EditInfoForm'

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useRef } from 'react'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const { user: currentUser } = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false)
    const coverRef = useRef(null)
    const profileRef = useRef(null)
    const [coverImg, setCoverImg] = useState(null)
    const [profileImg, setProfileImg] = useState(null)

    // const fileRef = useRef();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()

    }, [username])

    const uploadFileHandle = () => {
        console.log(profileImg, coverImg)
        try {
            axios.put(`http://localhost:5000/api/users/${currentUser._id}`,
                {
                    userProfile: JSON.stringify(profileImg) || user.userProfile,
                    coverProfile: JSON.stringify(coverImg) || user.coverProfile
                }
            )
            window.location.reload()
        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <>
            <Topbar />
            <div className='profile'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverProfile ? URL.createObjectURL(user.coverProfile) : PF + '/noCover2.jpg'} alt="" className="profileCoverImg" draggable='false' />
                            <FilterIcon title='edit cover picture' className='coverImgEdit' onClick={() => coverRef.current.click()} />
                            <input ref={coverRef} type="file" hidden onChange={(e) => setCoverImg(e.target.files[0])} />

                            {coverImg && <div className="previewImg">
                                <div className="previewContainer">
                                    <img src={URL.createObjectURL(coverImg)} className='previewProfileImg' alt="" />
                                    <div className="buttons">
                                        <button className='uploadButton' onClick={uploadFileHandle} >Upload</button>
                                        <button className='deleteButton' onClick={() => setCoverImg(null)} > Cancel </button>
                                    </div>
                                </div>
                            </div>}

                            <img src={user.userProfile ? URL.createObjectURL(user.userProfile) : PF + '/noAvatar.jpg'} alt="" className="profileUserImg" draggable='false' />

                            <FilterIcon name='file' className='profileImgEdit' onClick={() => {
                                profileRef.current.click()
                            }} />


                            <input ref={profileRef} type="file" hidden onChange={(e) => setProfileImg(e.target.files[0])} />

                            {profileImg && <div className="previewImg">
                                <div className="previewContainer">
                                    <img src={URL.createObjectURL(profileImg)} className='previewProfileImg' alt="" />
                                    <div className="buttons">
                                        <button className='uploadButton' onClick={uploadFileHandle} >Upload</button>
                                        <button className='deleteButton' onClick={() => setProfileImg(null)} > Cancel </button>
                                    </div>
                                </div>
                            </div>}

                        </div>

                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                            {user.username === currentUser.username && <button className="editButton" onClick={() => setIsEdit(true)}><BorderColorIcon style={{ 'fontSize': '15px', 'marginRight': '2px' }} />Edit Profile</button>}
                        </div>
                    </div>

                    {/* edit info form page */}
                    {
                        isEdit && <EditInfoForm user={user} setIsEdit={setIsEdit} />
                    }

                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Profile

//how to use useState hook in radio button input box?


//  <input hidden ref={fileRef} type="file" id='file' accept=".png, .jpeg, .jpg, .webp" onChange={(e) => uploadFileHandler(e)} />
//  <Button className='editSubmitButton' variant="contained" onClick={() => { fileRef.current.click() }}>upload profile picture</Button>