import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Link } from 'react-router-dom/dist';
import { useQuery } from '@tanstack/react-query';

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch(`http://localhost:5000/users`)
        return res.json()
    });
    
    const handleMakeAdmin = (id) => {
        fetch(`http://localhost:5000/users/admin/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch()
                }
            })
    }
    const handleMakeinstructor = (id) => {
        fetch(`http://localhost:5000/users/instructor/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch()
                }
            })
    }


    return (
        <div className='text-center'>
            <h2 className='text-2xl mt-12 font-bold'> Users ({users.length})</h2>
            {users.length > 0 ? (
                <div className="overflow-x-auto w-full">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => <tr
                                    key={user._id}
                                >
                                    <td>
                                        {index + 1}
                                    </td>

                                    <td>
                                        {user.name}
                                    </td>
                                    <td>
                                        {user.email}
                                    </td>
                                    <td>
                                        <td>{user.role === 'instructor' ? 'Instructor' :
                                            <button onClick={() => handleMakeinstructor(user._id)} className="btn btn-primary text-white">Instructor</button>}
                                        </td>

                                        <td>{user.role === 'admin' ? 'Admin' :
                                            <button onClick={() => handleMakeAdmin(user._id)} className="btn btn-secondary bg-orange-600  text-white">Admin</button>
                                        }</td>
                                    </td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No user found.</p>
            )}
        </div>
    );
};

export default AllUsers;
