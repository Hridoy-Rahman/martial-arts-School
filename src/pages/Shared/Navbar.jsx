import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aos from 'aos';
import { AuthContext } from '../../Provider/AuthProvider';

const Navbar = () => {
    const { user, logOut, signedUser } = useContext(AuthContext);
    const [hovered, setHovered] = useState(false);

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
                <Link to="/alltoy">All Toys</Link>
            </li>
            <li>
                <Link to="/blogs"></Link>
            </li>
            {user?.email ? (
                <>
                    <li>
                        <Link to="/addatoy">Add a Toy</Link>
                    </li>
                    <li>
                        <Link to={`/mytoys/${user.user_email}`}>My Toys</Link>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </>
            ) : (
                <li>
                    <Link to="/login">Login</Link>
                </li>
            )}
        </>
    );

    useEffect(() => {
        Aos.init();
    }, []);

    return (
        <div className="navbar fixed z-10 opacity-30 text-white bg-black max-w-screen-xl">
            <div className="navbar-start text-white">
                <div className="dropdown text-white">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
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
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;