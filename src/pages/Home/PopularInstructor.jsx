import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-awesome-reveal';

export const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('https://martial-arts-server-one.vercel.app/instructors')
            .then(res => res.json())
            .then(data => {
                setInstructors(data);
            });
    }, []);


    const sortedInstructors = instructors.sort((a, b) => b.numberOfStudents - a.numberOfStudents);


    const topInstructors = sortedInstructors.slice(0, 6);

    return (
        <div className="px-4 py-8 mx-auto max-w-screen-lg">
            <h1 className="text-4xl text-orange-500 font-bold text-center mb-8">Popular Instructors</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {topInstructors.map(instructor => (
                    <Bounce>
                        <div key={instructor._id} className="card bg-base-100 shadow-xl p-4">
                            <figure>
                                <img src={instructor.image} alt="Instructor" className="rounded-lg w-full h-64" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{instructor.name}</h2>
                                <p className="text-gray-600 text-xl font-bold">Spaciality: {instructor.specialty}</p>
                                <p className="text-gray-600 text-xl font-bold">Class taken : {instructor.classesTaken}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button className="btn btn-primary">View Profile</button>
                                </div>
                            </div>
                        </div>
                    </Bounce>
                ))}
            </div>
        </div>
    );
};
