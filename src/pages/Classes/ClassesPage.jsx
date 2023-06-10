import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';

const ClassesPage = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetch('https://martial-arts-server-one.vercel.app/classes')
            .then(res => res.json())
            .then(data => {
                setClasses(data);
            });
    }, []);

    const handleSelectClass = (cls) => {
        const { _id, class_name, class_image, instructor_name, price } = cls;
        if (user && user.email) {
            const orderClass = {
                class_name: class_name,
                class_image: class_image,
                price: price,
                instructor_name: instructor_name,
                user_email: user.email,
                isSelected: true
            };

            const isClassSelected = selectedClasses.some((selectedCls) => selectedCls.insertedId === cls._id);

            if (isClassSelected) {
                // Remove the selected class from the selectedClasses array
                const updatedSelectedClasses = selectedClasses.filter((selectedCls) => selectedCls.insertedId !== cls._id);
                setSelectedClasses(updatedSelectedClasses);
                return;
            }

            fetch('https://martial-arts-server-one.vercel.app/selectedClasses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderClass)
            })
                .then(res => res.json())
                .then(data => {
                    setSelectedClasses(prevSelectedClasses => [...prevSelectedClasses, data]);
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Class Selected',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            Swal.fire({
                title: 'Please Login first!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    const isClassSelected = (cls) => {
        return selectedClasses.some((selectedCls) => {
            // console.log(selectedCls.insertedId)
            return selectedCls.insertedId === cls._id
        });
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
                        className={`card lg:card-side ${cls.available_seats === 0 ? 'bg-red-800' : 'bg-base-100'} shadow-xl`}
                    >
                        <div className="card-body">
                            <img className='rounded-lg' src={cls.class_image} alt="Class" />
                            <h2 className="card-title">{cls.class_name}</h2>
                            <p>Instructor: {cls.instructor_name}</p>
                            <p>Available Seats: {cls.available_seats}</p>
                            <p>Price: ${cls.price}</p>
                            <div className="card-actions justify-end">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleSelectClass(cls)}
                                    disabled={
                                        cls.available_seats === 0 || isClassSelected(cls)
                                    }
                                >
                                    {isClassSelected(cls) ? 'Selected' : cls.available_seats === 0 ? 'Sold Out' : 'Select'}
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
