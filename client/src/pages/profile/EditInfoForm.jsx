import React, { useState } from 'react'

import {
    TextField,
    Box,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
} from '@mui/material';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


function EditInfoForm({ user, setIsEdit }) {

    const { user: currentUser } = useContext(AuthContext);
    const [country, setCountry] = useState()
    const [city, setCity] = useState()
    const [DOB, setDOB] = useState()
    const [gender, setGender] = useState()
    const [relationship, setRelationship] = useState()
    const [description, setDescription] = useState()
    // const [file, setFile] = useState(null)

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
                    "gender": gender || user.gender,
                    'birthday': DOB || user.birthday,
                    'relationship': relationship || user.relationship || '-',
                }
            )
            window.location.reload()
        } catch (error) {
            console.warn(error)
        }
    }

    return (

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
        </form>
    )
}

export default EditInfoForm