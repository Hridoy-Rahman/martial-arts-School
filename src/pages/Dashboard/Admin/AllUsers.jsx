import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom/dist';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const { user } = useContext(AuthContext);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user && user.email) {
            fetch(`http://localhost:5000/users`)
                .then(res => res.json())
                .then(data => {
                    setUsers(data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [user]);


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
                                        <button onClick={() => handleDeleteClass(user)} className="btn btn-secondary text-white">Instructor</button>
                                        <Link><button className='btn btn-primary'>Admin</button></Link>
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
