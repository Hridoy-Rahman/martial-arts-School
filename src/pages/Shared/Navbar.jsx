import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [hovered, setHovered] = useState(false);
    // console.log(user)

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((error) => console.log(error));
    };

    const options = (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/classes">Classes</Link>
            </li>
            <li>
                <Link to="/instructors">Instructors</Link>
            </li>
            {user?.email ? (
                <div className='flex justify-between items-center'>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                    <div className="navbar-end">
                        <Link><button className='rounded-full'><img className='rounded-full h-8 w-8' src={user.photoURL} alt="" /></button></Link>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col lg:flex-row'>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                </div>
            )}
        </>
    );

    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div className="navbar flex justify-between fixed z-10 opacity-70 text-4xl font-bold text-white bg-blue-800 max-w-screen-xl">
            <div className="navbar-start text-white">
                <div className="dropdown text-white bg-blue-800 opacity-70">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-blue-800 rounded-box w-52">
                        {options}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Martial Arts</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {options}
                </ul>
            </div>

        </div>
    );
};

export default Navbar;