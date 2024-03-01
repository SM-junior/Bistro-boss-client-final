import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../../Provider/AuthProvider';

const PrivateRouter = ({children}) => {
    const {user, loading}=useContext(authContext);
    const location=useLocation();
    
    if(loading){
        return <span className="loading loading-bars loading-lg"></span>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRouter;