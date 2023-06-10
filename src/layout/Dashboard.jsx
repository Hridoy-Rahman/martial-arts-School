import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom/dist';
import { AuthContext } from '../Provider/AuthProvider';

const Dashboard = () => {
    const { user } = useContext(AuthContext)
    const [isAdmin, setIsAdmin] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setIsAdmin(data.admin);
            });
    }, []);
    // console.log(isAdmin)


    return (
        <div>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">Dashboard</div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                <li><Link to="/">Home</Link></li>
                                {
                                    isAdmin ?

                                        <>
                                            <li><Link to="/dashboard/users">All Users</Link></li>
                                            <li><Link to="/dashboard/manageClass">Manage Class</Link></li>
                                        </>

                                        :
                                        <>
                                            <li><Link to="/dashboard/selectedClasses">Selected Class</Link></li>
                                            <li><Link to="/dashboard/enrolledClasses">Enrolled Class</Link></li>
                                            <li><Link to="/dashboard/paymentHistory">Payment History</Link></li>
                                        </>


                                }
                            </ul>
                        </div>
                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/classes">Classes</Link></li>
                        <li><Link to="/instructors">Instructors</Link></li>
                        <li><Link to="/dashboard/selectedClasses">Selected Class</Link></li>
                        <li><Link to="/dashboard/enrolledClasses">Enrolled Class</Link></li>
                        <li><Link to="/dashboard/paymentHistory">Payment History</Link></li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;