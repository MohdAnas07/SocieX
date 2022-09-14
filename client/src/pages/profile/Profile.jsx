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

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import {
    TextField,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    Input
} from '@mui/material';
import { useRef } from 'react'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const { user: currentUser } = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false)

    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [DOB, setDOB] = useState()
    const [gender, setGender] = useState()
    const [relationship, setRelationship] = useState()
    const [description, setDescription] = useState()
    const [file, setFile] = useState(null)

    const fileRef = useRef();

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:5000/api/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()

    }, [username])

    const editHandler = (e) => {
        e.preventDefault()
        console.log(country, city, DOB)
        try {
            axios.put(`http://localhost:5000/api/users/${currentUser._id}`,
                {
                    "userId": currentUser._id,
                    "desc": description || user.desc,
                    "city": country || user.city,
                    "from": city || user.from,
                    'birthday': DOB || user.birthday,
                    'relationship': relationship || user.relationship || '-',
                }
            )
            // window.location.reload()
        } catch (error) {
            console.warn(error)
        }
    }
    const uploadFileHandler = (e) => {
        setFile(e.target.files[0])
        console.log(file);
    }

    return (
        <>
            <Topbar />
            <div className='profile'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? PF + user.coverPicture : PF + '/noCover2.jpg'} alt="" className="profileCoverImg" draggable='false' />
                            <img src={user.userProfile ? PF + user.userProfile : PF + '/noAvatar.jpg'} alt="" className="profileUserImg" draggable='false' />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                            {user.username === currentUser.username && <button className="editButton" onClick={() => setIsEdit(true)}><BorderColorIcon style={{ 'fontSize': '15px', 'marginRight': '2px' }} />Edit Profile</button>}
                        </div>
                    </div>
                    {isEdit &&
                        <form className="editInfo" onSubmit={(e) => editHandler(e)}>
                            <div className="editInfoWrapper  ui form">
                                <h4 className='editInfoHeadline'>Edit Personal Info</h4>
                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                    style={{ 'marginBottom': '10px' }}
                                >
                                    <TextField value={country} onChange={(e) => setCountry(e.target.value)} id="outlined-basic" label="Country Name" variant="outlined" style={{ 'marginRight': '10px' }} />

                                    <TextField value={city} onChange={(e) => setCity(e.target.value)} id="outlined-basic" label="City Name" variant="outlined" style={{ 'marginRight': '10px' }} />

                                    <TextField value={DOB} onChange={(e) => setDOB(e.target.value)} id="outlined-basic" label="DOB: DD-MM-YYYY " variant="outlined" />
                                </Box>

                                <FormControl style={{ 'display': 'block' }}>
                                    <FormLabel
                                        id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="female" onClick={(e) => setGender(e.target.value)} control={<Radio />} label="Female" />
                                        <FormControlLabel value="male" onClick={(e) => setGender(e.target.value)} control={<Radio />} label="Male" />
                                        <FormControlLabel value="other" onClick={(e) => setGender(e.target.value)} control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>

                                <FormControl style={{ 'display': 'block' }}>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Relationship Status</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="1" onClick={(e) => setRelationship(e.target.value)} control={<Radio />} label="Single" />
                                        <FormControlLabel value="2" onClick={(e) => setRelationship(e.target.value)} control={<Radio />} label="Married" />
                                        <FormControlLabel value="3" onClick={(e) => setRelationship(e.target.value)} control={<Radio />} label="Complex" />
                                    </RadioGroup>
                                </FormControl>

                                <TextField value={description} onChange={(e) => setDescription(e.target.value)} style={{ 'margin': '10px 0', 'display': 'block' }} fullWidth label="Bio Description" id="fullWidth" />

                                <Button type='submit' className='editSubmitButton' variant="contained">Submit</Button>

                                <HighlightOffIcon style={{ "fontSize": "50px" }} className='cancelButton' onClick={() => setIsEdit(false)} />
                            </div>


                        </form>}

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