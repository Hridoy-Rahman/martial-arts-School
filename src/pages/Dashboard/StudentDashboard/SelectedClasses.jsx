import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

const SelectedClasses = () => {
    const { user } = useContext(AuthContext);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`https://martial-arts-server-one.vercel.app/selectedClasses?user_email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setClasses(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user]);

    const handleDeleteClass = (cls) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://martial-arts-server-one.vercel.app/selectedClasses/${cls._id}`, {
                    method: 'DELETE',
                })
                    .then(res => {
                        if (res.ok) {
                            const updatedClasses = classes.filter(item => item._id !== cls._id);
                            setClasses(updatedClasses);
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            );
                        } else {
                            Swal.fire(
                                'Error',
                                'Failed to delete the selected class.',
                                'error'
                            );
                        }
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire(
                            'Error',
                            'Failed to delete the selected class.',
                            'error'
                        );
                    });
            }
        });
    };

    return (
        <div className='text-center'>
            <Helmet>
                <title>Martial Arts | Selected Class</title>
            </Helmet>
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
                                        <Link to={`/dashboard/payment/${cls._id}`}><button className='btn btn-primary'>Payment</button></Link>
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
