import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import {  useParams } from "react-router-dom";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import BannerPhoto from "../../Components/BannerPhoto/BannerPhoto";
import { Helmet } from "react-helmet";

const StoryView = () => {
  const { _id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: storyData = []} = useQuery({
    queryKey: ["storyData", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/findStory/${_id}`);
      return res.data;
    },
  });

  

  return (
    <div className="font-roboto">
      <Helmet>
      <title>Nature Nexus | Story view</title>
      </Helmet>
      <BannerPhoto name={"Story view"}></BannerPhoto>
      <div className="p-6 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 bg-gray-100 rounded-sm w-full lg:sticky top-0 text-center p-4">
            <img
              src={storyData.image}
              alt="Product"
              className="w-full rounded object-cover mx-auto"
            />
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold text-gray-800">
              {storyData.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">
                Tour Type : {storyData.tourType}
              </p>
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">
                Price : {storyData.price}
              </p>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-800">Tour Details</h3>
              <p className="space-y-3 list-disc mt-4 pl-4 text-base text-gray-800">
                {storyData.tourDetails}
              </p>
            </div>
            <hr className="border-b-2 mt-6" />
            <div className="flex space-x-2 mt-6">
              <h3 className="text-lg font-bold text-gray-800">Rating : </h3>
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 ${
                    storyData.rating >= index + 1
                      ? "fill-[#f3d302]"
                      : "fill-[#CED5D8]"
                  }`}
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
              ))}
            </div>
            <hr className="border-b-2 mt-6" />
            <div className="mt-4 flex gap-2">
              <FacebookShareButton url={'https://naturenexus-232f7.web.app'}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Share on Facebook
                </button>
              </FacebookShareButton>
              <TwitterShareButton url={'https://naturenexus-232f7.web.app'}>
                <button className="bg-[#1DA1F2] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Share on Twitter
                </button>
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryView;
