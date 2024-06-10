import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const UserProfileGuide = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: userProfileData = [] } = useQuery({
    queryKey: ["userProfileData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/guidProfile/${_id}`);
      return res.data;
    },
  });
  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <Helmet>
      <title>Nature Nexus | User Profile</title>
      </Helmet>
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          <h1 className="text-3xl font-bold font-roboto text-black pt-8 lg:pt-0">
            {userProfileData.name}
          </h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
          <p className="pt-4 text-base font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Email : {userProfileData.email}
          </p>
          <p className="pt-2  text-xs font-roboto text-black font-bold lg:text-sm flex items-center justify-center lg:justify-start">
            User Role :{" "}
            <span className="badge badge-accent font-roboto font-semibold text-black ml-3">
              {userProfileData.role || "User"}{" "}
            </span>
          </p>

          <p className="text-base pt-2 font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Address :{" "}
            {userProfileData.address || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>
          <p className="text-base pt-2 font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            City :{" "}
            {userProfileData.city || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>
          <p className="text-base pt-2 font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Age :{" "}
            {userProfileData.age || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>
          <p className="text-base pt-2 font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Education :{" "}
            {userProfileData.education || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>
          <p className="text-base pt-2 font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Gender :{" "}
            {userProfileData.gender || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>
          <p className="text-base pt-2 font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Skills :{" "}
            {userProfileData.skills || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>
          <p className="text-base pt-2 font-roboto text-black font-bold flex items-center justify-center lg:justify-start">
            Work Experience :{" "}
            {userProfileData.workExperience || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>

          <p className="pt-4 text-black font-semibold font-roboto">
            {userProfileData.aboutUser || (
              <p className="font-roboto text-red-600">
                The tour guide did not update the profile
              </p>
            )}
          </p>
        </div>
      </div>
      <div className="w-full lg:w-2/5 ">
        <img
          src={userProfileData.photo}
          className="rounded-none lg:rounded-lg w-full shadow-2xl hidden lg:block"
        />
      </div>
    </div>
  );
};

export default UserProfileGuide;
