import React from 'react';
import Banner from './Banner';
import Reviews from './Reviews';
import { PopularInstructor } from './PopularInstructor';
import PopularClasses from './PopularClasses';
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Martial Arts | Home</title>
            </Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <Reviews></Reviews>


        </div>
    );
};

export default Home;