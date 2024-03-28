import React from 'react';
import { useContext } from 'react';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../Provider/AuthProvider';
import { useState } from 'react';
// import { FaFacebookF } from "react-icons/fa";

const SocialLogIn = () => {
    const { googleLogin } = useContext(authContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const logInWithGoogle = () => {
        googleLogin()
            .then(result => {
                const user = { email: result.user.email, name: result.user.displayName }
                fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    return (
        <div className='flex items-center justify-center py-5'>
            <Link className='rounded-full bg-blue-500 text-white p-2 m-3 hover:scale-110 transition duration-400 ease-in-out'><FaFacebookF /></Link>
            <Link className='rounded-full bg-blue-500 text-white p-2 m-3 hover:scale-110 transition duration-400 ease-in-out' onClick={logInWithGoogle}><FaGoogle /></Link>
            <Link className='rounded-full bg-blue-500 text-white p-2 m-3 hover:scale-110 transition duration-400 ease-in-out'><FaGithub /></Link>
        </div>
    );
};

export default SocialLogIn;