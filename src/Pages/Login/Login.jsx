import React from 'react';
import img1 from '../../assets/others/authentication2.png';
import img2 from '../../assets/others/authentication.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2'
import SocialLogIn from '../SocialLogIn/SocialLogIn';

const Login = () => {
    const [error, setError] = useState('')
    const [disabled, setDisabled] = useState(true);
    const { loginUser } = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const pass = form.password.value;
        loginUser(email, pass)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true })
            })
            .catch(error => {
                setError(error.message);
            })
    }

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <div className="hero min-h-screen bg-base-200 bg" style={{ backgroundImage: `url(${img2})` }}>
            <div className="hero-content flex lg:flex-row items-center justify-between md:flex-col">
                <div className="text-center lg:text-left">
                    <img className='w-[600px] h-[400px] ' src={img1} alt="" />
                </div>
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" name='password' className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <LoadCanvasTemplate />
                        </div>
                        {/* <div className="form-control">
                            <input onBlur={handleValidateCaptcha} type="text" placeholder="type here" className="input input-bordered" required />
                        </div> */}
                        {/* TODO: make sign In button disabled */}
                        <div className="form-control mt-6">
                            <button disabled={false} className="btn btn-primary">Sign In</button>
                        </div>
                        <div>
                            <p className='text-red-500'>{error}</p>
                        </div>
                    </form>
                    <div className='text-center'>
                        <Link to='/signup'><p>New here? <span className='underline text-green-600 font-semibold hover:scale-125'>Create a New Account</span></p></Link>
                        <p>Or sign in with</p>
                    </div>
                    <SocialLogIn></SocialLogIn>
                </div>
            </div>
        </div>
    );
};

export default Login;