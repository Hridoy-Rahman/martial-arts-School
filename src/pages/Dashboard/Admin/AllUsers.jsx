import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import { useQuery } from 'react-query';

const AllUsers = () => {
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await fetch(`https://martial-arts-server-one.vercel.app/users`)
        return res.json()
    });
    
    const handleMakeAdmin = (id) => {
        fetch(`https://martial-arts-server-one.vercel.app/users/admin/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount) {
                    refetch()
                }
            })
    }
    const handleMakeinstructor = (id) => {
        fetch(`https://martial-arts-server-one.vercel.app/users/instructor/${id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.modifiedCount) {
                    refetch()
                }
            })
    }


    return (
        <div className='text-center'>
             <Helmet>
                <title>Martial Arts | All Users</title>
            </Helmet>
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
