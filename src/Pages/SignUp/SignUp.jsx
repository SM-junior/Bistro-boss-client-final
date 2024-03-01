import React from 'react';
import img1 from '../../assets/others/authentication2.png';
import img2 from '../../assets/others/authentication.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { useContext } from 'react';
import { authContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogIn from '../SocialLogIn/SocialLogIn';

const SignUp = () => {
    const { createUser, updateUserProfile, logOut } = useContext(authContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const user = { email: data.email, name: data.name }
                        fetch('http://localhost:3000/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(user)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "SignUp successful",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                }
                            })
                        logOut()
                            .then(() => {
                                navigate(from, { replace: true })
                            })
                            .catch(error => {
                                console.log(error.message);
                            })
                    })
                    .catch(error => {
                        console.log(error.message);
                    })
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200 bg" style={{ backgroundImage: `url(${img2})` }}>
            <div className="hero-content flex lg:flex-row-reverse items-center justify-between md:flex-col">
                <div className="text-center lg:text-left">
                    <img className='w-[600px] h-[400px] ' src={img1} alt="" />
                </div>
                <div className="card w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" className="input input-bordered" {...register("name", { required: true })} />
                            {errors.name && <span className='text-red-500'>name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                            {errors.email && <span className='text-red-500'>email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered"
                                {...register("password", {
                                    required: true,
                                    maxLength: 12,
                                    minLength: 6,
                                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
                                })} />
                            {errors.password?.type === "required" && (<p className='text-red-600'>password must be at least 6 characters</p>)}
                            {errors.password?.type === "minLength" && (<p className='text-red-600'>password must be at least 6 characters</p>)}
                            {errors.password?.type === "maxLength" && (<p className='text-red-600'>password must not be more than 12 characters</p>)}
                            {errors.password?.type === "pattern" && (<p className='text-red-600'>password must contain at least 1 uppercase, 1 lowercase, 1 special character, 1 number</p>)}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" placeholder="photo URL" className="input input-bordered" {...register("photoURL", { required: true })} />
                            {errors.photoURL && <span className='text-red-500'>Photo URL is required</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                        </div>
                    </form>
                    <div className='text-center'>
                        <Link to='/login'><p>Already registered? <span className='underline text-green-600 font-semibold hover:scale-125'>Go to log in</span></p></Link>
                        <p>Or sign up with</p>
                    </div>
                    <SocialLogIn></SocialLogIn>
                </div>
            </div>
        </div>
    );
};

export default SignUp;