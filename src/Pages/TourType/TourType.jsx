import { useParams } from "react-router-dom";
import BannerPhoto from "../../Components/BannerPhoto/BannerPhoto";
import AllTourTypeCard from "../../Components/AllTourTypeCard/AllTourTypeCard";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const TourType = () => {
  const { tourType } = useParams();
  const axiosPublic = useAxiosPublic();
  const { data: tourTypeData = [], isLoading } = useQuery({
    queryKey: ["tourTypeData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/tourCategory/${tourType}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Helmet>
      <title>Nature Nexus | Tour Type</title>
      </Helmet>
      <BannerPhoto name={tourType}></BannerPhoto>
      <div className="lg:max-w-7xl mx-auto">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-3 mt-12">
          {tourTypeData.map((data, index) => (
            <AllTourTypeCard key={index} data={data}></AllTourTypeCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourType;
