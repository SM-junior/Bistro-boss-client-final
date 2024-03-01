import React from 'react';
import { useContext } from 'react';
import {useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useCart from '../../hooks/useCart';
import { authContext } from '../../Provider/AuthProvider';

const ShopCard = ({ singleItem }) => {
    const { name, image, recipe, price, _id } = singleItem;
    const { user } = useContext(authContext);
    const Navigate = useNavigate();
    const location=useLocation();
    const [cart,refetch]=useCart()

    const handleAddToCart = (singleItem) => {
        if (user && user?.email) {
            const cartItem = { menuItemId: _id, name, image, price, email: user?.email }
            fetch('http://localhost:3000/carts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch()
                        Swal.fire({
                            icon: "success",
                            title: "Item successfully added to cart",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
        }
        else {
            Swal.fire({
                title: "You must login first to shop",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    Navigate('/login',{state :{ from: location }})
                }
            });
        }
    }

    return (
        <div className="card w-72 h-[450px] bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-center">
                    <button onClick={() => handleAddToCart(singleItem)} className="btn btn-primary uppercase">Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;