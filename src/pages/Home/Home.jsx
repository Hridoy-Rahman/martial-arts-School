import React from 'react';
import Banner from './Banner';
import Reviews from './Reviews';
import { PopularInstructor } from './PopularInstructor';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularInstructor></PopularInstructor>
            <Reviews></Reviews>
            
            
        </div>
    );
};

export default Home;