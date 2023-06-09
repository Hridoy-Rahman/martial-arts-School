import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const { user, createUser } = useContext(AuthContext)

    useEffect(() => {
        fetch('classes.json')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
                console.log(data);
            });
    }, []);

    const handleSelectClass = (classId) => {
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to login first!'
              })
            return;
        }

        const selectedClass = classes.find(cls => cls.id === classId);
        if (selectedClass.availables_seats === 0) {
            alert('No available seats for this course.');
            return;
        }

        // TODO: Implement the logic for selecting the class
        console.log('Class selected:', selectedClass);
    };

    return (
        <div className="px-4 py-8 mx-auto max-w-screen-lg">
            <Helmet>
                <title>Martial Arts | Classes</title>
            </Helmet>
            <h1 className="text-4xl text-orange-500 font-bold text-center mt-16 mb-8">Classes</h1>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {classes.map(cls => (
                    <div
                        key={cls.id}
                        className={`card lg:card-side bg-${cls.available_seats === 0 ? 'red-800' : 'base-100'} shadow-xl`}
                    >
                        <div className="card-body">
                            <img src={cls.class_image} alt="Class" />
                            <h2 className="card-title">{cls.class_name}</h2>
                            <p>Instructor: {cls.instructor_name}</p>
                            <p>Available Seats: {cls.available_seats}</p>
                            <p>Price: {cls.price}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleSelectClass(cls.id)}
                                    disabled={cls.available_seats === 0}
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassesPage;
