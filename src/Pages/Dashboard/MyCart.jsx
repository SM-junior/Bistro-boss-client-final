import React from 'react';
import SectionTitle from '../../Components/SectionTitle';
import useCart from '../../hooks/useCart';
import { FaRegTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';

const MyCart = () => {
    const [cart, refetch] = useCart();
    const total = cart.reduce((acc, item) => acc + item.price, 0)
    console.log(total);

    const handleCartDelete = (item) => {
        console.log(item._id);
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
                fetch(`http://localhost:3000/carts/${item._id}`, {
                    method: 'DELETE'
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
        <div className=''>
            <SectionTitle
                subTitle={'My Cart'}
                title={'Wonna add more!'}
            ></SectionTitle>
            <div className='bg-white p-10 mb-10'>
                <div className='uppercase flex items-center justify-between font-semibold mb-6'>
                    <h2>Total Order:{cart.length}</h2>
                    <h2>Total Price: ${total}</h2>
                    <button className='btn btn-sm bg-[#D1A054] text-white'>Pay</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className='uppercase bg-[#D1A054] text-white'>
                            <tr>
                                <th>#</th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) =>
                                    <tr key={item._id}>
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                {/* <div>
                                                   
                                                </div> */}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="font-bold">{item.name}</div>
                                        </td>
                                        <td>${item.price}</td>
                                        <th>
                                            <button onClick={() => handleCartDelete(item)} className="bg-rose-700 hover:bg-red-500 text-white text-lg p-2 rounded-md hover:scale-125"><FaRegTrashAlt></FaRegTrashAlt></button>
                                        </th>
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

export default MyCart;