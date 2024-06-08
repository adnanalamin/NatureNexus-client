import { useQuery } from "@tanstack/react-query";
import AllPackageCard from "../../Components/AllPackageCard/AllPackageCard";
import BannerPhoto from "../../Components/BannerPhoto/BannerPhoto";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllPackage = () => {
  const axiosPublic = useAxiosPublic();
  const { data: packageData = [] } = useQuery({
    queryKey: ["packageData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packege");
      return res.data;
    },
  });
  return (
    <div>
      <BannerPhoto name={"All Package"}></BannerPhoto>
      <div className="lg:max-w-7xl md:max-w-full mx-auto">
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-3 mt-12">
          {packageData.map((data) => (
            <AllPackageCard key={data._id} data={data}></AllPackageCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPackage;
