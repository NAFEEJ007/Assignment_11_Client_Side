import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: 'Logged Out!',
                    text: 'You have been logged out successfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                })
            })
            .catch(error => console.log(error))
    }

    const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/services">Services</NavLink></li>
        {user?.email ? <>
            <li><NavLink to="/add-service">Add Service</NavLink></li>
            <li><NavLink to="/my-services">My Services</NavLink></li>
            <li><NavLink to="/my-reviews">My Reviews</NavLink></li>
            <li><button onClick={handleLogOut}>Log out</button></li>
        </>
            : <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
            </>
        }
    </>

    return (
        <div className="navbar bg-base-100 h-20 mb-4 shadow-sm sticky top-0 z-50 px-4 lg:px-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-lato">
                        {navItems}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-2xl font-bold text-primary gap-2 font-playfair">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                    ServiceScope
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 font-medium font-lato">
                    {navItems}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL || "https://i.ibb.co/tYw50P9/user.png"} alt={user.displayName} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><a className="justify-between">Profile <span className="badge">New</span></a></li>
                            <li><Link to="/my-services">My Services</Link></li>
                            <li><Link to="/my-reviews">My Reviews</Link></li>
                            <li><button onClick={handleLogOut}>Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <div className="hidden lg:flex gap-2">
                        <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
                        <Link to="/register" className="btn btn-outline btn-primary btn-sm">Register</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;