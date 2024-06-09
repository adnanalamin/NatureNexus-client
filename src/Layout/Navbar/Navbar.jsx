import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
  const {user, userLogout} = useContext(AuthContext)

  const handelLogout = () => {
    userLogout()
    .then(() => {
      toast.success('Logout Successfull', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    })
  }


  const navitems = (
    <>
      <NavLink to='/'>
        <li className="font-poppins font-semibold text-base mr-4">Home</li>
      </NavLink>
      <NavLink to='/community'>
        <li className="font-poppins font-semibold text-base mr-4">Community</li>
      </NavLink>
      <NavLink to='/blog'>
        <li className="font-poppins font-semibold text-base mr-4">Blogs</li>
      </NavLink>
      <NavLink to='/aboutus'>
        <li className="font-poppins font-semibold text-base mr-4">About Us</li>
      </NavLink>
      <NavLink to='/contactUs'>
        <li className="font-poppins font-semibold text-base mr-4">
          Contact Us
        </li>
      </NavLink>
    </>
  );
  return (
    <div className="lg:max-w-7xl lg:mx-auto">
      <div className="navbar  bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navitems}
            </ul>
          </div>
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} className="w-20" alt="Logo" />
            </Link>
            <Link to="/">
              <p className="text-xl font-roboto font-bold">Nature Nexus</p>
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navitems}</ul>
        </div>
        <div className="navbar-end">
        {user ? <>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL || 'https://i.ibb.co/Wt7npLT/user-picture.png'} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#2C3892] rounded-box w-52">
            <li className="text-white pl-2 font-roboto font-semibold text-sm">{user.displayName}</li>
            <li className="text-white pl-2 font-roboto font-semibold text-sm">{user.email}</li>
              <li className="text-white font-roboto font-semibold text-base"><Link to='/dashbord/profile'> Dashboard</Link></li>
              
              <li className="text-white font-roboto font-semibold text-base"><a onClick={handelLogout}>Logout</a></li>
            </ul>
          </div>
          </> : <>
          <Link to="/login">
          <button className="btn bg-[#51ADE5] hover:bg-[#4c9aca] lg:mr-2 font-poppins text-white rounded-xl">
            Login
          </button>
          </Link>
          <Link to="/register">
          <button className="btn lg:flex hidden bg-[#51ADE5] font-poppins text-white rounded-xl hover:bg-[#4c9aca]">
            Register
          </button>
          </Link>
          </>
}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Navbar;
