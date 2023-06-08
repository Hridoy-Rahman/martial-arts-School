import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FaStar,FaStarHalf } from 'react-icons/fa';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            });
    }, []);

    return (
        <div className="mb-12">
            <div>
                <h1 className="text-center text-4xl text-orange-400 font-bold mb-8">Students Reviews</h1>
            </div>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {reviews.map(review => (
                    <SwiperSlide key={review.id}>
                        <div className='flex flex-col items-center justify-center h-full p-12'>
                            <h1 className='text-2xl font-bold text-orange-400'>{review.name}</h1>
                            <h1 className='text-xl font-bold text-orange-400 flex text-center items-center'><Rating style={{ maxWidth: 250 }} value={review.rating} readOnly /></h1>
                            <h1 className='text-2xl font-bold text-orange-500 text-center'>{review.comment}</h1>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;
