import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/Logo.png";
const Navbar = () => {
  const navitems = (
    <>
      <NavLink>
        <li className="font-poppins font-semibold text-base mr-4">Home</li>
      </NavLink>
      <NavLink>
        <li className="font-poppins font-semibold text-base mr-4">Community</li>
      </NavLink>
      <NavLink>
        <li className="font-poppins font-semibold text-base mr-4">Blogs</li>
      </NavLink>
      <NavLink>
        <li className="font-poppins font-semibold text-base mr-4">About Us</li>
      </NavLink>
      <NavLink>
        <li className="font-poppins font-semibold text-base mr-4">
          Contact Us
        </li>
      </NavLink>
    </>
  );
  return (
    <div className="lg:max-w-7xl lg:mx-auto">
      <div className="navbar bg-base-100">
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
          <button className="btn bg-[#51ADE5] hover:bg-[#4c9aca] lg:mr-2 font-poppins text-white rounded-xl">
            Login
          </button>
          <button className="btn lg:flex hidden bg-[#51ADE5] font-poppins text-white rounded-xl hover:bg-[#4c9aca]">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
