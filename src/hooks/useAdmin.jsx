import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user } = useContext(authContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading]
};

export default useAdmin;


// import React, { useContext } from 'react';
// import { authContext } from '../Provider/AuthProvider';
// import useAxiosSecure from './useAxiosSecure';
// import { useQuery } from '@tanstack/react-query';

// const useAdmin = () => {
//     const { user } = useContext(authContext);
//     const [axiosSecure] = useAxiosSecure()

//     const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
//         queryKey: ['isAdmin', user?.email],
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/admin/${user?.email}`)
//             console.log('is admin response', res);
//             return res.data.admin
//         }
//     })
//     return [isAdmin, isAdminLoading]
// };

// export default useAdmin;