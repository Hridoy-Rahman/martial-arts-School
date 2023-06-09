import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
                    <SwiperSlide 
                    className='p-4 lg:p-16'
                        key={review._id}
                    >
                        <div className='flex flex-col items-center  border-2  rounded-2xl  bg-blue-300  gap-4 justify-center h-full p-12'>
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
