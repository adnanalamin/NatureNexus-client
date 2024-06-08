import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const MeetTourGuides = () => {
  const navivate = useNavigate()
  const axiosPublic = useAxiosPublic()
  const { data: guidData = [] } = useQuery({
    queryKey: ["guidData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/findGuide");
      return res.data;
    },
  });

  const openDetails = (_id) => {
    // Handle navigation to details page
    navivate(`/userGuidProfile/${_id}`)
  };
    
    return (
        <div className="lg:max-w-7xl lg:mx-auto font-roboto">
            <div className="md:grid  md:grid-cols-2 lg:grid-cols-3 justify-center mt-8">
        {guidData.map(tourGuide => (
          <div key={tourGuide.id} className="w-full p-4">
            <div className="border border-gray-300 rounded p-4 flex gap-4">
             <div className="h-full">
             <img src={tourGuide.photo} alt={tourGuide.name} className="w-28 h-32 object-cover" />
             </div>
              <div>
              <h2 className="text-xl font-bold mb-1">{tourGuide.name}</h2>
              <p className="mb-1">Gender : {tourGuide.gender}</p>
              <p className="mb-1">Role : {tourGuide.role}</p>
              <button
                onClick={() => openDetails(tourGuide._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                Details
              </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        </div>
    );
};

export default MeetTourGuides;