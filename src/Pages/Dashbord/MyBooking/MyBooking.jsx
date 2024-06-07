import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const email = user.email;
  const axiosPublic = useAxiosPublic();
  const { data: bookingtData = [], refetch } = useQuery({
    queryKey: ["bookingtData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getbooking/${email}`);
      return res.data;
    },
  });
  const handelCancelBooking = (newData) => {
    axiosPublic.delete(`/deletebooking/${newData._id}`).then((res) => {
      refetch();
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Canceled!",
          text: "Booking has been Cancel.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Package Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Guide Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tour Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tour Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {bookingtData.map((newData) => (
            <tr key={newData._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {newData.packageName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {newData.tourGuide}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {newData.tourDate}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{newData.price}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                  {newData.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {(newData.status === "In Review" ||
                  newData.status === "Rejected") && (
                  <button
                    onClick={() => handelCancelBooking(newData)}
                    className="px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Cancel
                  </button>
                )}
                {newData.status === "Accepted" && (
                  <button className="px-4 py-2 font-medium text-white bg-[#135D66] rounded-md hover:bg-[#135c66d0] focus:outline-none focus:shadow-outline-blue  transition duration-150 ease-in-out">
                    Pay
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBooking;
