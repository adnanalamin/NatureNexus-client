import { Link } from "react-router-dom";
import LoginImg from "../../assets/image/Login.jpg";
import LoginPage from "../../assets/image/LoginP.jpg";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";

const Login = () => {
  const {userSignIn} = useContext(AuthContext);
  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    userSignIn(email, password)
    .then(() => {
      toast.success('Login Successfull')
      form.reset()
    })
      
      
      
  }
  return (
    <div>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${LoginImg})`,
        }}
      >
        <div className="hero-overlay bg-gradient-to-r from-[#51ADE5] via-transparent to-[rgba(171, 185, 183, 0.13)]"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-roboto font-bold">Login</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:max-w-7xl lg:mx-auto mt-24 rounded-l-lg border shadow">
        <div className="flex w-full flex-col md:w-1/2">
          <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12 "></div>
          <div className="lg:w-[28rem] rounded-l-lg mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
            <p className="text-left text-3xl text-blue-900 font-bold capitalize font-roboto">
              Welcome back
            </p>
            <p className="mt-2 text-left font-roboto text-gray-500">
              Welcome back, please enter your details.
            </p>
            <SocialLogin></SocialLogin>
            <div className="relative mt-8 flex h-px place-items-center bg-gray-200">
              <div className="absolute left-1/2 h-6 w-14 -translate-x-1/2 bg-white text-center text-sm text-gray-500">
                or
              </div>
            </div>
            <form onSubmit={handleLogin} className="flex flex-col pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="focus-within:border-b-[#51ADE5] relative  flex overflow-hidden border-b-2 transition">
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    className="w-full font-roboto flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="mb-12 flex flex-col pt-4">
                <div className="focus-within:border-b-[#51ADE5] relative flex overflow-hidden border-b-2 transition">
                  <input
                    type="password"
                    name="password"
                    id="login-password"
                    className="w-full font-roboto flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-[#2C3892] font-poppins text-lg px-4 py-2 text-center  font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
              >
                Log in
              </button>
            </form>
            <div className="py-12 text-center">
              <p className="whitespace-nowrap text-gray-600 font-poppins text-lg">
                Don not have an account?
                <Link to="/register">
                  <span className="underline-offset-4 font-semibold text-[#2C3892]  ml-2">
                    {" "}
                    Register
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="pointer-events-none rounded-lg relative hidden h-screen select-none bg-black md:block md:w-1/2">
          <div className="absolute bottom-0 z-10 px-8 text-white opacity-100">
            <p className="mb-8 text-xl font-semibold font-poppins leading-10">
              Unlock the full potential of your travel experience by logging in
              to your account. With your account, you can access personalized
              recommendations, save your favorite destinations, and manage your
              bookings with ease.
            </p>
          </div>
          <img
            className="-z-1 rounded-r-lg absolute top-0 h-full w-full object-cover opacity-90"
            src={LoginPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
