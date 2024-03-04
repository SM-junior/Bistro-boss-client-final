import React from 'react';
import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../Components/SectionTitle';
import useMenu from '../../hooks/useMenu';
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Swal from 'sweetalert2';

const ManageItem = () => {
    const [menu, refetch] = useMenu();

    const handleItemDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/menu/${item._id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | manage item</title>
            </Helmet>
            <SectionTitle
                subTitle="hurry up!"
                title="manage all item"
            ></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table">
                    <thead className='bg-[#D1A054]'>
                        <tr className='uppercase'>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu.map((item, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td><button className='text-[24px] bg-[#D1A054] text-white p-2 rounded-md'><BiSolidEdit /></button></td>
                                    <td onClick={() => handleItemDelete(item)} className='text-center'><button className='text-[24px] bg-red-500 p-2 rounded-md text-white'><RiDeleteBin6Line /></button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageItem;