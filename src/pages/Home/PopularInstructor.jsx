import React, { useEffect, useState } from 'react';

export const PopularInstructor = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        fetch('instructors.json')
            .then(res => res.json())
            .then(data => {
                setInstructors(data);
                console.log(data);
            });
    }, []);

    // Sort the instructors based on the number of students in their class
    const sortedInstructors = instructors.sort((a, b) => b.numberOfStudents - a.numberOfStudents);

    // Get the top 6 instructors
    const topInstructors = sortedInstructors.slice(0, 6);

    return (
        <div className="px-4 py-8 mx-auto max-w-screen-lg">
            <h1 className="text-4xl text-orange-500 font-bold text-center mb-8">Popular Instructors</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {topInstructors.map(instructor => (
                    <div key={instructor.name} className="card bg-base-100 shadow-xl p-4">
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
                ))}
            </div>
        </div>
    );
};
