import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {

    const [isVisible, setIsVisible] = useState(false);

    const passwordVisibleHandler = () => {
        setIsVisible(p => !p)
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <div className="registerLeftWrapper">
                        <h4 className="loginLogo">SocieX</h4>
                        <div className="loginBox">
                            <input type='email' required placeholder="Username" className='loginInput inputText' />
                            <input type='email' required placeholder="Email Address" className='loginInput inputText' />

                            <div className="loginPasswordVisibility">
                                <input type={!isVisible ? "password" : "text"} placeholder="Password" required
                                    minLength="6" className='loginInput passwordInput inputText' />
                                {isVisible ? <VisibilityIcon className='visibilityIcon visibleOn' onClick={passwordVisibleHandler} /> : <VisibilityOffIcon className='visibilityIcon' onClick={passwordVisibleHandler} />}

                            </div>
                            <input type={!isVisible ? "password" : "text"}
                                placeholder="Enter Password Again" className='loginInput inputText' required />

                            <button className="loginButton">Sign Up</button>

                            <div className="registerExtraButtons">
                                <Link to="/login"> <button className="loginRegisterButton">Login into account</button></Link>
                            </div>
                        </div>
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