import React from 'react';
import { useContext } from 'react';
import { FaFacebookF, FaGoogle, FaGithub } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { authContext } from '../../Provider/AuthProvider';
import { useState } from 'react';

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
            <button className='flex items-center justify-center hover:scale-110 transition duration-400 ease-in-out mx-3 rounded-full h-[30px] w-[30px] border-t-red-700 border-b-red-700 border border-black'><FaFacebookF /></button>
            <button onClick={logInWithGoogle} className='flex items-center justify-center hover:scale-110 transition duration-400 ease-in-out mx-3 rounded-full h-[30px] w-[30px] border-t-red-700 border-b-red-700 border border-black'><FaGoogle /></button>
            <button className='flex items-center justify-center hover:scale-110 transition duration-400 ease-in-out mx-3 rounded-full h-[30px] w-[30px] border-t-red-700 border-b-red-700 border border-black'><FaGithub /></button>
        </div>
    );
};

export default SocialLogIn;