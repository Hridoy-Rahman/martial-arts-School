import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom/dist';

const SelectedClasses = () => {
    const { user } = useContext(AuthContext);

    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/selectedClasses?user_email=${encodeURIComponent(user.email)}`)
                .then(res => res.json())
                .then(data => {
                    setClasses(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user]);

    const handleDeleteClass = (classId) => {
        fetch(`http://localhost:5000/selectedClasses/${classId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Remove the deleted class from the state
                    setClasses(classes.filter(cls => cls._id !== classId));
                }
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handlePayClass = (classId) => {
        // Implement your payment logic here
        console.log(`Payment for class ${classId}`);
    };

    return (
        <div className='text-center'>
            <h2>Selected Classes ({classes.length})</h2>
            {classes.length > 0 ? (
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Course</th>
                                <th>Instructor Name</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                classes.map((cls, index) => <tr
                                    key={cls._id}
                                >
                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={cls.class_image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {cls.class_name}
                                    </td>
                                    <td>
                                        {cls.instructor_name}
                                    </td>
                                    <td className="">${cls.price}</td>
                                    <td>
                                        <button onClick={() => handleDeleteClass(cls)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                        <Link to="/paymanet"><button className='btn btn-primary'>Paymanet</button></Link>
                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No selected classes found.</p>
            )}
        </div>
    );
};

export default SelectedClasses;
