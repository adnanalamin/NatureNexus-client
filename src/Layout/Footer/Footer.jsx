import logo from "../../assets/Logo.png";
import { FaTwitter, FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mt-32">
      <footer className="w-full py-14  bg-[#2C3892]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center items-center">
              <img src={logo} className="w-32" alt="Logo" />
              <h3 className="font-bold font-roboto text-white text-3xl">
                Nature Nexus
              </h3>
            </div>
            <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-16 mb-10 border-b border-gray-200">
              <li>
                <a
                  href="#"
                  className="text-white font-poppins hover:text-gray-900"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" text-white font-poppins hover:text-gray-900"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" text-white font-poppins hover:text-gray-900"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className=" text-white font-poppins hover:text-gray-900"
                >
                   About Us
                </a>
              </li>
              <li>
                <h3
                  className=" text-white font-poppins hover:text-gray-900"
                >
                  <Link to='/contactUs'>Contact Us</Link>
                </h3>
              </li>
            </ul>
            <div className="flex space-x-10 justify-center items-center mb-14">
              <FaTwitter className="block  text-white text-3xl transition-all duration-500 hover:text-indigo-600 "></FaTwitter>
              <FaSquareInstagram className="block  text-white text-3xl transition-all duration-500 hover:text-indigo-600 "></FaSquareInstagram>
              <FaFacebookSquare className="block  text-white text-3xl transition-all duration-500 hover:text-indigo-600 "></FaFacebookSquare>
              <FaYoutube className="block  text-white text-3xl transition-all duration-500 hover:text-indigo-600 "></FaYoutube>
            </div>
            <span className="text-lg font-roboto text-white text-center block">
              Nature Nexus © 2024.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
