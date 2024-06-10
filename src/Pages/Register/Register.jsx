import { Link,  useLocation, useNavigate } from "react-router-dom";
import registerImg from "../../assets/image/Login.jpg";
import registerbg from "../../assets/image/register.png";
import { FiUserPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { Helmet } from "react-helmet";

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const { createUser, updateUserProfile, user, setUser } =
    useContext(AuthContext);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    const { name, photo, email, password } = data;
    await createUser(email, password)
      .then(async () => {
        await updateUserProfile(name, photo).then(() => {
          setUser({ ...user?.user, photoURL: photo, displayName: name });
          const userInfo = {
            name: name,
            email: email,
            photo: photo,
            role: 'Tourist'
          };
          axiosPublic.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              reset();
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });

              navigate(location?.state || "/");
            } else {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        });
      })
      .catch((error) => {
        const title = error.message.split(/[\]():)]+/);
        Swal.fire({
          position: "center",
          icon: "success",
          title: title,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  };
  return (
    <div>
      <Helmet>
      <title>Nature Nexus | Register</title>
      </Helmet>
      <div
        className="hero"
        style={{
          backgroundImage: `url(${registerImg})`,
        }}
      >
        <div className="hero-overlay bg-gradient-to-r from-[#51ADE5] via-transparent to-[rgba(171, 185, 183, 0.13)]"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-roboto font-bold">Register</h1>
          </div>
        </div>
      </div>
      <div className=" mt-24 rounded-lg items-center flex justify-center px-5 lg:px-0">
        <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-blue-900 text-center hidden md:flex rounded-l-lg">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${registerbg})`,
              }}
            ></div>
          </div>
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className=" flex flex-col items-center">
              <div className="text-center">
                <h1 className="text-2xl xl:text-4xl font-roboto font-extrabold text-blue-900">
                  Register
                </h1>
                <p className="text-sm font-poppins mt-2 text-gray-500">
                  Hey enter your details to create your account
                </p>
              </div>
              <SocialLogin></SocialLogin>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex-1 mt-8"
              >
                <div className="">
                  <div className="mx-auto max-w-xs flex flex-col gap-4">
                    <input
                      {...register("name", { required: true })}
                      aria-invalid={errors.name ? "true" : "false"}
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your name"
                    />
                    {errors.name?.type === "required" && (
                      <p className="font-poppins text-red-700" role="alert">
                        Name is required
                      </p>
                    )}

                    <input
                      {...register("photo", { required: true })}
                      aria-invalid={errors.photo ? "true" : "false"}
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Enter your Photo URL"
                    />
                    {errors.photo?.type === "required" && (
                      <p className="font-poppins text-red-700" role="alert">
                        PhotoURL is required
                      </p>
                    )}
                    <input
                      {...register("email", {
                        required: "Email Address is required",
                        pattern:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                      })}
                      aria-invalid={errors.email ? "true" : "false"}
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="email"
                      placeholder="Enter your email"
                    />
                    {errors.email && <p role="alert">{errors.mail.message}</p>}
                    <input
                      {...register("password", {
                        required: "Password is required",
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8}$/,
                          message:
                            "Password must be 8 characters long and include at least one lowercase letter, one uppercase letter, one special character, and one number.",
                        },
                      })}
                      className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="password"
                      placeholder="Password"
                    />
                    {errors.password?.type === "required" && (
                      <p className="font-poppins text-red-700" role="alert">
                        Password is required
                      </p>
                    )}
                    {errors.password?.type === "pattern" && (
                      <p className="font-poppins text-red-700" role="alert">
                        {errors.password.message}
                      </p>
                    )}
                    <button className="mt-5 tracking-wide font-semibold bg-blue-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <FiUserPlus className="w-6 h-6 -ml-2"></FiUserPlus>
                      <span className="ml-3">Register</span>
                    </button>
                    <p className="mt-6 text-base font-roboto text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link to="/login">
                        {" "}
                        <span className="text-blue-900 font-semibold">
                          Log in
                        </span>
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
