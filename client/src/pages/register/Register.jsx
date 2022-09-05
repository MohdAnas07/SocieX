import React, { useRef, useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const Register = () => {
    const [isVisible, setIsVisible] = useState(false);
    const username = useRef()
    const email = useRef()
    const password = useRef()
    const passwordAgain = useRef()
    const navigate = useNavigate()
    // const PREFIX_URL = process.env.PREFIX_URL


    const passwordVisibleHandler = () => {
        setIsVisible(p => !p)
    }

    const formHandler = async (e) => {
        e.preventDefault()
        if (passwordAgain.current.value !== password.current.value) {
            passwordAgain.current.setCustomValidity("Password don't match")
        }
        else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("http://localhost:5000/api/auth/register", user);
                navigate('/login')
            } catch (error) {
                console.warn(error)
            }
        }
        // console.log(username.current.value, email.current.value, password.current.value);
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="registerLeftWrapper">
                        <h4 className="loginLogo">SocieX</h4>
                        <form onSubmit={formHandler} className="loginBox">
                            <input type='text' required ref={username} placeholder="Username" className='loginInput inputText' />
                            <input type='email' required ref={email} placeholder="Email Address" className='loginInput inputText' />

                            <div className="loginPasswordVisibility">
                                <input type={!isVisible ? "password" : "text"} placeholder="Password" required ref={password}
                                    minLength="6" className='loginInput passwordInput inputText' />
                                {isVisible ? <VisibilityIcon className='visibilityIcon visibleOn' onClick={passwordVisibleHandler} /> : <VisibilityOffIcon className='visibilityIcon' onClick={passwordVisibleHandler} />}

                            </div>
                            <input type={!isVisible ? "password" : "text"}
                                placeholder="Enter Password Again" className='loginInput inputText' required ref={passwordAgain} />

                            <button type="submit" className="loginButton">Sign Up</button>

                            <div className="registerExtraButtons">
                                <Link to="/login">
                                    <button className="loginRegisterButton">Login into account</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="loginRight">

                    <img src='assets/login.svg' alt="" className="loginRightImg" />
                    <span className="loginDesc"> connect with friends and world around you on SocieX.</span>
                </div>


            </div>
        </div>
    )
}

export default Register