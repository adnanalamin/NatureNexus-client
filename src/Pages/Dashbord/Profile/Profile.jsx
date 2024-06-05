// import { useParams } from "react-router-dom";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  // const {id} = useParams()
  // const axiosPublic = useAxiosPublic()
  // const { data: userDeatils = [], isLoading } = useQuery({
  //   queryKey: ["userDeatils"],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get(`/guidProfile/${id}`);
  //     return res.data;
  //   },
  // });

  // if (isLoading)
  //   return (
  //     <div className=" flex h-screen items-center">
  //       <span className="loading loading-bars loading-lg mx-auto "></span>
  //     </div>
  //   );
  return (
    <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
      <div
        id="profile"
        className="w-full lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div className="p-4 md:p-12 text-center lg:text-left">
          
          <h1 className="text-3xl font-bold font-roboto text-black pt-8 lg:pt-0">iiii</h1>
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
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
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
          src='gggggggggg'
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
        />
      </div>
    </div>
  );
};

export default Profile;
