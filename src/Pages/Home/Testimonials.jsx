import React from 'react';
import SectionTitle from '../../Components/SectionTitle';
import { useState } from 'react';
import { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        fetch('http://localhost:3000/review')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])
    return (
        <section>
            <SectionTitle
                title='testimonials'
                subTitle='what our client say'
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review =>
                        <SwiperSlide key={review._id}>
                            <div className='flex md:flex-col items-center justify-center mx-14 mb-16'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p className='text-[50px] my-4'><FaQuoteLeft /></p>
                                <p>{review.details}</p>
                                <p className='text-2xl text-orange-500 py-3'>{review.name}</p>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </section >
    );
};

export default Testimonials;