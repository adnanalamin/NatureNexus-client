import { useQuery } from "@tanstack/react-query";
import AllStoryCard from "../../Components/AllStoryCard/AllStoryCard";
import BannerPhoto from "../../Components/BannerPhoto/BannerPhoto";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Helmet } from "react-helmet";

const AllStory = () => {
  const axiosPublic = useAxiosPublic();
  const { data: packeges = [] } = useQuery({
    queryKey: ["packeges"],
    queryFn: async () => {
      const res = await axiosPublic.get("/getStorys");
      return res.data;
    },
  });
  return (
    <div>
      <Helmet>
      <title>Nature Nexus | All Story</title>
      </Helmet>
      <BannerPhoto name={"All Story"}></BannerPhoto>
      <div className="lg:max-w-7xl mx-auto mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {packeges.map((data) => (
            <AllStoryCard key={data._id} data={data}></AllStoryCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllStory;
