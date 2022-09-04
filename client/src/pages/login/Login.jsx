import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext.js'


const Login = () => {
    const [isVisible, setIsVisible] = useState(false);
    const email = useRef()
    const password = useRef()
    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const passwordVisibleHandler = () => {
        setIsVisible(p => !p)
    }

    // From submit handler function 
    const formHandler = async (e) => {
        e.preventDefault()
        loginCall({
            email: email.current.value,
            password: password.current.value
        }, dispatch);
    }

    console.log(user);

    return (
        <div className='login'>
            <div className="loginWrapper">

                <div className="loginLeft">
                    <div className="loginLeftWrapper">
                        <h4 className="loginLogo">SocieX</h4>
                        <form className="loginBox" onSubmit={formHandler}>

                            <input type='email' required placeholder='Email Address' ref={email} className='loginInput inputText' />


                            <div className="loginPasswordVisibility">
                                <input type={!isVisible ? "password" : "text"} required placeholder='Password'
                                    ref={password} minLength="6" className='loginInput passwordInput inputText' />
                                {isVisible ? <VisibilityIcon className='visibilityIcon visibleOn' onClick={passwordVisibleHandler} /> : <VisibilityOffIcon className='visibilityIcon' onClick={passwordVisibleHandler} />}

                            </div>
                            <button className="loginButton">{isFetching ? "Loading" : " Log In"}</button>
                            <div className="loginExtraButtons">
                                <span className="loginForgot">forgot password?</span>
                                <Link to="/register"><button className="loginRegisterButton">create an account</button></Link>
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

export default Login