import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";



// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

const PopularClasses = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('classes.json')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
                console.log(data);
            });
    }, []);

    // Sort the Classes based on the number of students in their class
    const sortedClasses = classes.sort((a, b) => b.numberOfStudents - a.numberOfStudents);

    // Get the top 6 Classes
    const topClasses = sortedClasses.slice(0, 6);

    return (
        <div className="px-4 py-8 mx-auto max-w-screen-lg">
            <h1 className="text-4xl text-orange-500 font-bold text-center mb-8">Popular Classes</h1>
            <div>

                <Swiper
                    cssMode={true}
                    navigation={true}
                    pagination={true}
                    mousewheel={true}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                    className="mySwiper"
                >
                    {topClasses.map(popularClass => (
                        <SwiperSlide
                            key={popularClass.class_name}
                        >
                            <div className='flex border-2 p-4 rounded-2xl items-center bg-blue-300  gap-4'>
                                <div>
                                    <img className='w-full h-96 rounded-xl' src={popularClass.class_image} alt="" />

                                </div>
                                <div className='text-center'>
                                    <h1 className='text-2xl font-bold text-blue-800'>Course Name : {popularClass.class_name}</h1>
                                    <h1 className='text-2xl font-semibold text-blue-800'>Course Instructor : {popularClass.instructor_name}</h1>
                                    <h1 className='text-2xl text-blue-600'>Price : ${popularClass.price}</h1>
                                    <h1 className='text-2xl  text-blue-800'>Available Seat : {popularClass.available_seats}</h1>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </div>
    );
};

export default PopularClasses;
