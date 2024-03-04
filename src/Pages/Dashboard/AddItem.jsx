import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SectionTitle from '../../Components/SectionTitle';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const image_upload_Key = import.meta.env.VITE_image_upload_token;

const AddItem = () => {
    const { register, handleSubmit, reset } = useForm();
    const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_upload_Key}`;
    const axiosSecure = useAxiosSecure()

    const onSubmit = (data) => {
        console.log(data);
        const formData = new FormData();
        formData.append('image', data.photo[0])

        fetch(image_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                const imgURL = imgResponse.data.display_url;
                const { name, price, category, recipe: details } = data;
                const newItem = { name, price: parseFloat(price), category, recipe: details, image: imgURL }
                console.log(newItem);
                axiosSecure.post('/menu', newItem)
                    .then(data => {
                        if (data.data.insertedId) {
                            reset()
                            Swal.fire({
                                icon: "success",
                                title: "New item added successful",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        };
                    })
            })
    }

    return (
        <div>
            <Helmet>
                <title>BistroBoss || add item</title>
            </Helmet>
            <SectionTitle
                subTitle='Whats new?'
                title='add an item'
            ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-slate-100 p-5'>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Recipe name*</span>
                    </div>
                    <input type="text" placeholder="Recipe name" className="input input-bordered w-full" {...register("name", { required: true })} />
                </label>
                <div className='flex my-4'>
                    <label className="form-control w-full me-3">
                        <div className="label">
                            <span className="label-text">Category*</span>
                        </div>
                        {/* <input type="text" placeholder="Type here" className="input input-bordered w-full" /> */}
                        <select defaultValue='Select one' {...register("category", { required: true })} className="select select-primary w-full">
                            <option disabled>Select one</option>
                            <option>Salad</option>
                            <option>Pizza</option>
                            <option>Soup Bad</option>
                            <option>Dessert</option>
                            <option>Drinks</option>
                        </select>
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Price*</span>
                        </div>
                        <input type="text" placeholder="Price" className="input input-bordered w-full" {...register("price", { required: true })} />
                    </label>
                </div>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Recipe details*</span>
                    </div>
                    <textarea className="textarea textarea-primary h-40" placeholder="Recipe Details" {...register("recipe", { required: true })}></textarea>
                </label>
                <div className='my-4'>
                    <input type="file" className="file-input w-full max-w-xs" {...register("photo", { required: true })} />
                </div>
                {/* <input  type="submit" value="Add Item" /> */}
                <input className='bg-[#D1A054] rounded-sm px-6 py-1 btn' type="submit" value="Add Item" />
            </form>
        </div>
    );
};

export default AddItem;