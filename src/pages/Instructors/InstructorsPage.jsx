import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { Helmet } from 'react-helmet';

const InstructorsPage = () => {
    const [instructors, setInstructors] = useState([]);
    const { user, createUser } = useContext(AuthContext)

    useEffect(() => {
        fetch('http://localhost:5000/instructors')
            .then(res => res.json())
            .then(data => {
                setInstructors(data);
                // console.log(data);
            });
    }, []);

    return (
        <div className="px-4 py-8 mx-auto max-w-screen-lg">
            <Helmet>
                <title>Martial Arts | Instructors</title>
            </Helmet>
            <h1 className="text-4xl text-orange-500 font-bold text-center mt-16 mb-8">Instructors</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {instructors.map(instructor => (
                    <div
                        key={instructor._id}
                        className="card lg:card-side  bg-base-100 shadow-xl"
                    >
                        <div className="card-body">
                            <img className='h-64 w-64 rounded-lg' src={instructor.image} alt="Class" />
                            <p>Name : {instructor.name}</p>
                            <p>Specialty : {instructor.specialty}</p>
                            <p>Class taken: {instructor.classesTaken}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                >
                                    View classes
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstructorsPage;
