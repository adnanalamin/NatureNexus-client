
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { FaUserCheck } from "react-icons/fa";
import { LuPackagePlus } from "react-icons/lu";
import { RiArrowGoBackFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import useAdmin from "./../Hooks/useAdmin";
import useGuide from "../Hooks/useGuide";
import { useContext } from "react";
import { BsUiChecks } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { FaAnglesRight } from "react-icons/fa6";




const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isGuide] = useGuide();

  return (
    <div>
      <div className="md:flex md:h-screen bg-gray-100">
        <div className="md:flex flex-col md:w-64 w-full bg-gray-800">
          <div className="flex items-center  h-16 bg-[#135D66]">
            <div className="mr-10">
              <Link to="/">
                <RiArrowGoBackFill className="bg-white rounded-full h-10 text-black w-10 p-2"></RiArrowGoBackFill>
              </Link>
            </div>
            <span className="text-white font-bold font-roboto uppercase">
              Dashboard
            </span>
          </div>
          <div className="flex flex-col flex-1 ">
            <nav className="flex-1 px-2 py-4 bg-[#003C43]">
              <ul className="ml-10">
                <li className="text-white mb-2 font-roboto font-bold hover:text-blue-400">
                  <NavLink to="/dashbord/profile">
                    <span className="flex items-center gap-2">
                      <FaUserCheck />
                      Profile
                    </span>
                  </NavLink>
                </li>
                {isAdmin ? (
                  <>
                    <li className="text-white mb-2 font-roboto font-bold hover:text-blue-400">
                      <NavLink to="/dashbord/addedPackage">
                        <span className="flex items-center gap-2">
                          <LuPackagePlus />
                          Add Package
                        </span>
                      </NavLink>
                    </li>
                    <li className="text-white mb-2 font-roboto font-bold hover:text-blue-400">
                      <NavLink to="/dashbord/users">
                        <span className="flex items-center gap-2">
                          <HiUserGroup />
                          User
                        </span>
                      </NavLink>
                    </li>
                  </>
                ) : isGuide ? (
                  <li className="text-white mb-2 font-roboto font-bold hover:text-blue-400">
                    <NavLink to="/dashbord/MyTour">
                      <span className="flex items-center gap-2">
                        <FaAnglesRight />
                        My Assigned Tours
                      </span>
                    </NavLink>
                  </li>
                ) : (
                  <>
                  <li className="text-white mb-2 font-roboto font-bold hover:text-blue-400">
                    <NavLink to="/dashbord/myBooking">
                      <span className="flex items-center gap-2">
                        <FaTasks />
                        My Bookings
                      </span>
                    </NavLink>
                  </li>
                  <li className="text-white mb-2 font-roboto font-bold hover:text-blue-400">
                    <NavLink to="/dashbord/wishlist">
                      <span className="flex items-center gap-2">
                        <BsUiChecks />
                        My Wishlist
                      </span>
                    </NavLink>
                  </li>
                  <li className="text-white mb-2 font-roboto font-bold hover:text-blue-400">
                    <NavLink to="">
                      <span className="flex items-center gap-2">
                        <FaAnglesRight />
                        Request to Admin
                      </span>
                    </NavLink>
                  </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>

        <div className="md:flex md:flex-col  md:flex-1 ">
          <div className="navbar bg-base-300 md:px-9">
            <div className="flex-1">
              <h2 className="text-xl font-roboto font-bold">daisyUI</h2>
            </div>
            <div className="flex-none">
              <div className="dropdown dropdown-end"></div>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:px-5 px-2 w-full mt-10 overflow-y-auto overflow-x-hidden">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
