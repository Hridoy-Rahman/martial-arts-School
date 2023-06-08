import React from 'react';
import Banner from './Banner';
import PopularClasses from './PopularClasses';
import PopularInstructor from './PopularInstructor';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularInstructor></PopularInstructor>
            <PopularClasses></PopularClasses>
        </div>
    );
};

export default Home;