import { useContext, useState } from "react";
import useAxiosPublic from "./../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const axiosPublic = useAxiosPublic();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [profileData, setProfileData] = useState({
    phone: "",
    address: "",
    city: "",
    age: "",
    skills: "",
    workExperience: "",
    education: "",
    gender: "",
    aboutUser: "",
  });
  const handleUpdateProfile = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.patch(
        `/users/profile/${email}`,
        profileData
      );
      if (response.data.insertedId) {
        toast.success("Profile Update successfully");
        setShowModal(false);
      }
      setUserData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          <h1 className="text-3xl font-bold font-roboto text-black pt-8 lg:pt-0">
            {userData.name}
          </h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
          <p className="pt-4 text-base font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Email : kk
          </p>
          <p className="pt-2  text-xs font-roboto text-black lg:text-sm flex items-center justify-center lg:justify-start">
            aaa
          </p>
          <p className="pt-8 text-sm">
            Totally optional short description about yourself, what you do and
            so on.
          </p>
          <div className="pt-12 pb-8">
            <button
              onClick={handleUpdateProfile}
              className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full"
            >
              Update profile
            </button>
          </div>
          <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
            <a
              className="link"
              href="#"
              data-tippy-content="@facebook_handle"
            ></a>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-2/5">
        <img
          src={userData.image}
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="mb-6 text-teal-900 text-center font-roboto text-3xl font-semibold underline decoration-teal-200/80">
                  Update Your Profile
                </h3>

                <div className="bg-white  px-8 py-6 mx-auto my-8 max-w-2xl">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 font-roboto w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="address"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 font-roboto w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="city"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={profileData.city}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 font-roboto w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="age"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={profileData.age}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full font-roboto rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="skills"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        Skills
                      </label>
                      <input
                        type="text"
                        id="age"
                        name="skills"
                        value={profileData.skills}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full font-roboto rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="workExperience"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        workExperience experience
                      </label>
                      <input
                        type="number"
                        id="workExperience"
                        name="workExperience"
                        value={profileData.workExperience}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 w-full font-roboto rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="education"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        Educations
                      </label>
                      <input
                        type="text"
                        id="education"
                        name="education"
                        value={profileData.education}
                        onChange={handleChange}
                        className="border border-gray-400 p-2 font-roboto w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="gender"
                        className="block text-gray-700 font-roboto font-medium mb-2"
                      >
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleChange}
                        className="border border-gray-400 font-roboto p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="aboutUser"
                        className="block font-roboto text-gray-700 font-medium mb-2"
                      >
                        About You
                      </label>
                      <textarea
                        id="aboutUser"
                        name="aboutUser"
                        value={profileData.aboutUser}
                        onChange={handleChange}
                        className="border border-gray-400 font-roboto p-2 w-full rounded-lg focus:outline-none focus:border-blue-400"
                        rows="5"
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="bg-teal-600/80 font-roboto text-white px-4 py-2 rounded-lg hover:bg-teal-700 w-full"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600/80 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
