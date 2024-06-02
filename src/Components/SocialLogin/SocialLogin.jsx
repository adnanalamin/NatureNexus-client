
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";


const SocialLogin = () => {
    return (
        <div className="flex justify-between">
            <button className="-2 mt-8 flex font-roboto items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-[#2C3892] hover:text-white">
              {" "}
              <FcGoogle className="mr-2 h-5 rounded-lg"></FcGoogle> Log in with
              Google
            </button>
            <button className="-2 mt-8 flex font-roboto items-center justify-center rounded-md border px-4 py-1 outline-none ring-gray-400 ring-offset-2 transition focus:ring-2 hover:border-transparent hover:bg-[#2C3892] hover:text-white">
              {" "}
              <FaGithub className="mr-2 h-5 rounded-lg"></FaGithub> Log in with
              Github
            </button>
        </div>
    );
};

export default SocialLogin;