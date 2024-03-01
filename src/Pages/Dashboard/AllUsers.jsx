import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaUsers } from "react-icons/fa";
import Swal from 'sweetalert2';

import SectionTitle from '../../Components/SectionTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllUsers = () => {
    const axiosSecure=useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    // const { refetch, data: users = [] } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(`http://localhost:3000/users`)
    //         return res.json();
    //     },
    // })

    const handleUserDelete = (user) => {
        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: 'User successfully deleted!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleAdmin = (user) => {
        fetch(`http://localhost:3000/users/admin/${user._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        icon: "success",
                        title: `${user.name} is an admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <SectionTitle
                title={'manage all items'}
                subTitle={'hurry up!'}
            ></SectionTitle>
            <div className='bg-white p-10 mb-10'>
                <h2 className='text-xl font-semibold uppercase'>Total users: {users.length}</h2>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='bg-[#D1A054] text-white'>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) =>
                                    <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.role === 'admin' ? 'admin' :
                                                <button onClick={() => handleAdmin(user)} className="btn btn-sm bg-[#D1A054] text-black text-lg rounded-md hover:scale-125"><FaUsers></FaUsers></button>
                                            }
                                        </td>
                                        <td><button onClick={() => handleUserDelete(user)} className="bg-rose-700 hover:bg-red-500 text-white text-lg p-2 rounded-md hover:scale-125"><FaRegTrashAlt></FaRegTrashAlt></button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;