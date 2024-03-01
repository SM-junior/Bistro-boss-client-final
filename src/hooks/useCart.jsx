// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { authContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useCart = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(authContext)
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        }
    })

    return [cart, refetch]
};

export default useCart;


// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { authContext } from "../Provider/AuthProvider";
// import useAxiosSecure from './useAxiosSecure';

// const useCart = () => {
//     const { user, loading } = useContext(authContext);
//     const token=localStorage.getItem('access-token');
//     const [axiosSecure]=useAxiosSecure();

//     const { refetch, data: cart = [] } = useQuery({
//         queryKey: ['carts', user?.email],
//         // queryFn: async () => {
//         //     const res = await axiosSecure(`/carts?email=${user?.email}`)
//         //     // console.log('res from axios', res);
//         //     return res.json();
//         // },
//         queryFn: async () => {
//             const res = await fetch(`http://localhost:3000/carts?email=${user?.email}`,{
//                 headers:{
//                     authorization: `bearer ${token}`
//                 }
//             })
//             return res.json();
//         },
//     })
//     return [cart, refetch]
// }
// export default useCart;